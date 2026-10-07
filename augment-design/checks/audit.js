(function installAugmentAudit(global) {
  "use strict";

  const VALID_BRANCHES = new Set(["document", "product", "marketing"]);
  const VALID_ROLES = new Set(["identity", "signal", "atmosphere", "artwork"]);
  const BODY_SELECTOR = "p, li, td, th, blockquote, [data-aug-body]";

  function visible(element) {
    const style = global.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0;
  }

  // Fast path for computed sRGB; modern CSS colors use the browser's own
  // parser and sRGB rasterization rather than a second color implementation.
  let colorContext;
  function rgba(color) {
    if (!color || color === "none" || color === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
    const match = color.match(/^rgba?\((\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)(?:[ /,]+(\d*(?:\.\d+)?))?\)$/);
    if (match) return {
      r: Number(match[1]), g: Number(match[2]), b: Number(match[3]),
      a: match[4] === undefined || match[4] === "" ? 1 : Number(match[4]),
    };
    if (!global.CSS?.supports("color", color) || !document.createElement) return null;
    colorContext ??= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    if (!colorContext) return null;
    colorContext.clearRect(0, 0, 1, 1);
    colorContext.fillStyle = color;
    colorContext.fillRect(0, 0, 1, 1);
    const [r, g, b, alpha] = colorContext.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: alpha / 255 };
  }

  function chromatic(color) {
    const value = rgba(color);
    if (!value) return null; // Unsupported paint is a coverage finding, never neutral.
    if (value.a < 0.1) return false;
    const max = Math.max(value.r, value.g, value.b);
    const min = Math.min(value.r, value.g, value.b);
    return max > 0 && (max - min) / max >= 0.18;
  }

  function inspectPaint(element, style, add, context = "element") {
    const colors = [["background", style.backgroundColor]];
    for (const side of ["Top", "Right", "Bottom", "Left"]) {
      if (Number.parseFloat(style[`border${side}Width`]) > 0
          && !["none", "hidden"].includes(style[`border${side}Style`])) {
        colors.push([`border-${side.toLowerCase()}`, style[`border${side}Color`]]);
      }
    }
    if (context === "element" && element.namespaceURI === "http://www.w3.org/2000/svg") {
      // Computed values include presentation attributes and inherited CSS.
      if (Number.parseFloat(style.fillOpacity ?? "1") > 0) colors.push(["SVG fill", style.fill]);
      if (Number.parseFloat(style.strokeWidth) > 0 && Number.parseFloat(style.strokeOpacity ?? "1") > 0) {
        colors.push(["SVG stroke", style.stroke]);
      }
    }
    let hasChromatic = false;
    for (const [property, color] of colors) {
      if (!color) continue;
      const result = chromatic(color === "currentcolor" ? style.color : color);
      if (result === null) add("paint-coverage", element, `${context} ${property} cannot be classified: ${color}. Inspect the render.`);
      if (result === true) hasChromatic = true;
    }
    if (style.backgroundImage && style.backgroundImage !== "none") {
      add("paint-coverage", element, `${context} background-image (including gradient stops) is not classified. Inspect the render.`);
    }
    if (hasChromatic && !element.dataset.augRole) {
      add("chromatic-role", element, `${context} chromatic solid fill or stroke has no data-aug-role.`);
    }
  }

  function primaryFamily(style) {
    return (style.fontFamily || "").split(",")[0].trim().replace(/^["']|["']$/g, "").toLowerCase();
  }

  function inspectType(element, style, add) {
    const ownsText = [...(element.childNodes || [])].some((node) => node.nodeType === 3 && node.textContent.trim());
    if (!ownsText) return;
    const family = primaryFamily(style);
    const mono = new Set(["ui-monospace", "sf mono", "menlo", "monospace"]);
    if (family !== "matter sq" && !mono.has(family)) {
      add("typeface-applied", element, `Text's primary computed font is ${style.fontFamily || "unavailable"}; expected Matter SQ or the technical mono token.`);
    }
    if (family === "matter sq" && document.fonts?.check) {
      const spec = `${style.fontStyle || "normal"} ${style.fontWeight || "400"} ${style.fontSize || "16px"} "Matter SQ"`;
      if (!document.fonts.check(spec, element.textContent || "")) {
        add("typeface", element, `Matter SQ is not ready for ${spec}. Inspect after fonts finish loading.`);
      }
    }
  }

  function offScaleRadius(element, style) {
    const values = style.borderRadius.match(/\d+(?:\.\d+)?px/g) || [];
    if (values.length === 0) return false;
    const radii = values.map(Number.parseFloat);
    if (radii.every((radius) => [0, 4, 8, 16].some((token) => Math.abs(radius - token) < 0.25))) {
      return false;
    }
    const box = element.getBoundingClientRect();
    const pillOrCircle = Math.min(box.width, box.height) > 0
      && radii.every((radius) => radius >= Math.min(box.width, box.height) / 2 - 0.5);
    return !pillOrCircle;
  }

  function itemSignature(element) {
    const style = global.getComputedStyle(element);
    return [
      element.tagName,
      element.className,
      style.display,
      style.padding,
      style.borderRadius,
      style.borderWidth,
      style.backgroundColor,
      style.fontSize,
      style.fontWeight,
    ].join("|");
  }

  function augAudit() {
    const findings = [];
    const add = (rule, element, detail) => findings.push({
      rule,
      element: element ? element.outerHTML.slice(0, 180) : "document",
      detail,
    });

    const roots = [...document.querySelectorAll("[data-aug-branch]")];
    if (roots.length !== 1) {
      add("branch-root", null, `Expected one [data-aug-branch] root; found ${roots.length}.`);
    }
    const root = roots[0] || document.body;
    const branch = roots[0]?.dataset.augBranch;
    if (branch && !VALID_BRANCHES.has(branch)) {
      add("branch-root", root, `Unknown branch "${branch}".`);
    }

    const documentRoles = new Set();
    for (const element of [root, ...root.querySelectorAll("*")]) {
      if (!visible(element)) continue;
      const style = global.getComputedStyle(element);
      const role = element.dataset.augRole;
      if (role && !VALID_ROLES.has(role)) {
        add("chromatic-role", element, `Unknown data-aug-role "${role}".`);
      }
      inspectPaint(element, style, add);
      inspectType(element, style, add);
      for (const pseudo of ["::before", "::after"]) {
        const pseudoStyle = global.getComputedStyle(element, pseudo);
        if (!pseudoStyle || ["none", "normal", undefined].includes(pseudoStyle.content)
            || pseudoStyle.display === "none" || pseudoStyle.visibility === "hidden" || Number(pseudoStyle.opacity) === 0) continue;
        inspectPaint(element, pseudoStyle, add, pseudo);
      }
      if (branch === "document" && role && role !== "identity") {
        documentRoles.add(role);
      }
      if (offScaleRadius(element, style)) {
        add("radius", element, `Computed radius ${style.borderRadius} is outside 4px, 8px, 16px, pill, or circle.`);
      }
    }

    if (branch === "document") {
      if (documentRoles.has("artwork") || documentRoles.size > 1) {
        add("document-color", root, `Documents may use only one non-identity role: signal or atmosphere. Found ${[...documentRoles].join(", ") || "none"}.`);
      }
      for (const element of root.querySelectorAll(BODY_SELECTOR)) {
        if (!visible(element)) continue;
        const size = Number.parseFloat(global.getComputedStyle(element).fontSize);
        if (size < 16) add("document-type", element, `Body text is ${size}px; the screen floor is 16px.`);
      }
      if (!root.querySelector("[data-aug-source], cite, [role='doc-biblioref']")) {
        add("document-source", root, "Document has no marked source. Add data-aug-source to a source, date, or record.");
      }
    }

    for (const inner of root.querySelectorAll("[data-aug-surface] [data-aug-surface]")) {
      add("nested-surface", inner, "An addressable surface is nested inside another addressable surface.");
    }

    for (const set of root.querySelectorAll("[data-aug-set]")) {
      const items = [...set.querySelectorAll(":scope > [data-aug-item]")];
      const signatures = new Set(items.map(itemSignature));
      if (items.length > 1 && signatures.size > 1) {
        add("repetition", set, `${items.length} items produce ${signatures.size} computed compositions.`);
      }
    }

    if (document.fonts?.check) {
      const faces = typeof document.fonts[Symbol.iterator] === "function" ? [...document.fonts] : null;
      if (faces && !faces.some((face) => face.family.replace(/^["']|["']$/g, "").toLowerCase() === "matter sq" && face.status === "loaded")) {
        add("typeface", root, "No loaded Matter SQ font face was observed. fonts.check alone does not prove a face exists.");
      } else if (!document.fonts.check('16px "Matter SQ"')) {
        add("typeface", root, "Matter SQ is not loaded in the rendered page.");
      }
    } else {
      add("typeface-coverage", root, "Font loading API unavailable; inspect the rendered typography.");
    }

    const label = findings.length === 0 ? "Augment audit: no findings in covered checks" : `Augment audit: ${findings.length} finding(s)`;
    console.group(label);
    if (findings.length > 0) console.table(findings);
    console.groupEnd();
    return findings;
  }

  global.augAudit = augAudit;
  if (new URLSearchParams(global.location.search).has("augaudit")) {
    global.addEventListener("load", augAudit, { once: true });
  }
})(window);
