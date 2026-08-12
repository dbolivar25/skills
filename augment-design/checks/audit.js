(function installAugmentAudit(global) {
  "use strict";

  const VALID_BRANCHES = new Set(["document", "product", "marketing"]);
  const VALID_ROLES = new Set(["identity", "signal", "atmosphere", "artwork"]);
  const BODY_SELECTOR = "p, li, td, th, blockquote, [data-aug-body]";

  function visible(element) {
    const style = global.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0;
  }

  function rgb(color) {
    const match = color.match(/^rgba?\((\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)[ ,]+(\d+(?:\.\d+)?)(?:[ /,]+(\d*(?:\.\d+)?))?\)$/);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] === undefined || match[4] === "" ? 1 : Number(match[4]),
    };
  }

  function chromatic(color) {
    const value = rgb(color);
    if (!value || value.a < 0.1) return false;
    const max = Math.max(value.r, value.g, value.b);
    const min = Math.min(value.r, value.g, value.b);
    return max > 0 && (max - min) / max >= 0.18;
  }

  function hasChromaticPaint(element, style) {
    if (chromatic(style.backgroundColor)) return true;
    return ["Top", "Right", "Bottom", "Left"].some((side) => {
      const width = Number.parseFloat(style[`border${side}Width`]);
      return width > 0 && chromatic(style[`border${side}Color`]);
    });
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
      if (hasChromaticPaint(element, style) && !role) {
        add("chromatic-role", element, "Chromatic fill or stroke has no data-aug-role.");
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

    if (document.fonts?.check && !document.fonts.check('16px "Matter SQ"')) {
      add("typeface", root, "Matter SQ is not loaded in the rendered page.");
    }

    const label = findings.length === 0 ? "Augment audit: clean" : `Augment audit: ${findings.length} finding(s)`;
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
