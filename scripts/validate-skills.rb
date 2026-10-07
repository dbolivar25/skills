#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"
require "json"
require "digest"
require "uri"

ROOT = Pathname.new(ARGV.fetch(0, Pathname.new(__dir__).parent.to_s)).expand_path
CASE_FILE = ROOT.join("tests/invocation-cases.yml")
ALLOWED_KEYS = %w[
  name
  description
  license
  allowed-tools
  metadata
  argument-hint
  disable-model-invocation
  title
  version
  author
  platforms
].freeze
NAME_PATTERN = /\A[a-z0-9]+(?:-[a-z0-9]+)*\z/
LINK_PATTERN = /\[[^\]]*\]\(([^)]+)\)/
CASE_KINDS = %w[positive negative collision].freeze
CASE_KEYS = %w[id kind prompt expect why].freeze
EXPECTATION_KEYS = %w[primary also_load do_not_load read do_not_read].freeze

# Fenced examples describe target projects, not links owned by this package.
def prose(text)
  fence = nil
  text.lines.filter_map do |line|
    if fence
      fence = nil if line.match?(/\A {0,3}#{Regexp.escape(fence[0])}{#{fence.length},}\s*$/)
      next
    end
    opening = line.match(/\A {0,3}(`{3,}|~{3,})/)
    if opening
      fence = opening[1]
      next
    end
    line
  end.join
end

# The library uses ordinary ATX Markdown headings and explicit HTML anchors.
# This checks their local reachability, not a full Markdown renderer.
def anchors(text)
  body = prose(text)
  used = body.scan(/\b(?:id|name)=["']([^"']+)["']/).flatten
  body.lines.each do |line|
    heading = line.match(/\A {0,3}\#{1,6}\s+(.+?)\s*\#*\s*$/)
    next unless heading

    base = heading[1].downcase.gsub(/[^\p{Word}\- ]/, "").tr(" ", "-")
    slug = base
    suffix = 0
    while used.include?(slug)
      suffix += 1
      slug = "#{base}-#{suffix}"
    end
    used << slug
  end
  used
end

def check_link(document, target, errors)
  target = target.strip.delete_prefix("<").delete_suffix(">")
  return if target.empty? || target.match?(/\A[a-z][a-z0-9+.-]*:/i)

  relative, fragment = target.split("#", 2).map { |part| URI::DEFAULT_PARSER.unescape(part) }
  path = relative.empty? ? document : document.dirname.join(relative).cleanpath
  unless path.exist?
    errors << "#{document.relative_path_from(ROOT)}: missing linked file #{target}"
    return
  end
  return unless fragment && !fragment.empty? && path.file? && path.extname.downcase == ".md"

  unless anchors(path.read).include?(fragment)
    errors << "#{document.relative_path_from(ROOT)}: missing linked heading #{target}"
  end
end

errors = []
skill_files = ROOT.glob("*/SKILL.md").sort
skill_names = []

skill_files.each do |skill_file|
  text = skill_file.read
  match = text.match(/\A---\n(.*?)\n---\n/m)
  unless match
    errors << "#{skill_file.relative_path_from(ROOT)}: missing YAML frontmatter"
    next
  end

  begin
    frontmatter = YAML.safe_load(match[1], permitted_classes: [], aliases: false)
  rescue Psych::SyntaxError => e
    errors << "#{skill_file.relative_path_from(ROOT)}: invalid YAML: #{e.message.lines.first.strip}"
    next
  end

  unless frontmatter.is_a?(Hash)
    errors << "#{skill_file.relative_path_from(ROOT)}: frontmatter must be a mapping"
    next
  end

  unexpected = frontmatter.keys.map(&:to_s) - ALLOWED_KEYS
  errors << "#{skill_file.relative_path_from(ROOT)}: unsupported keys: #{unexpected.join(', ')}" unless unexpected.empty?

  name = frontmatter["name"]
  description = frontmatter["description"]
  directory = skill_file.dirname.basename.to_s

  if name.is_a?(String)
    skill_names << name
  end

  errors << "#{directory}: name must match its directory" unless name == directory
  errors << "#{directory}: name must use lowercase hyphen-case" unless name.is_a?(String) && NAME_PATTERN.match?(name)
  errors << "#{directory}: name exceeds 64 characters" if name.is_a?(String) && name.length > 64

  unless description.is_a?(String) && !description.strip.empty?
    errors << "#{directory}: description must be a non-empty string"
  else
    normalized = description.gsub(/\s+/, " ").strip
    errors << "#{directory}: description exceeds 1024 characters" if normalized.length > 1024
    errors << "#{directory}: description cannot contain angle brackets" if normalized.include?("<") || normalized.include?(">")

    # Discovery wording is a design judgment. Validate metadata, not a house phrase.
  end

  disabled = frontmatter["disable-model-invocation"]
  if !disabled.nil? && disabled != true && disabled != false
    errors << "#{directory}: disable-model-invocation must be true or false"
  end

  metadata_file = skill_file.dirname.join("agents/openai.yaml")
  if metadata_file.exist?
    begin
      metadata = YAML.safe_load(metadata_file.read, permitted_classes: [], aliases: false)
      policy = metadata.is_a?(Hash) ? metadata["policy"] : nil
      implicit = policy.is_a?(Hash) ? policy["allow_implicit_invocation"] : nil
      errors << "#{directory}: agents/openai.yaml must be a mapping" unless metadata.is_a?(Hash)
      errors << "#{directory}: policy must be a mapping" if !policy.nil? && !policy.is_a?(Hash)
      if !implicit.nil? && implicit != true && implicit != false
        errors << "#{directory}: allow_implicit_invocation must be true or false"
      end
      if disabled == true && implicit != false
        errors << "#{directory}: explicit-only skill needs Codex allow_implicit_invocation: false"
      end
    rescue Psych::SyntaxError => e
      errors << "#{directory}: invalid agents/openai.yaml: #{e.message.lines.first.strip}"
    end
  elsif disabled == true
    errors << "#{directory}: explicit-only skill needs agents/openai.yaml"
  end

  skill_file.dirname.glob("**/*.md").each do |document|
    prose(document.read).scan(LINK_PATTERN).flatten.each do |target|
      check_link(document, target, errors)
    end
  end

  # Entry points also use inline-code pointers. Check package-owned paths while
  # leaving illustrative project paths and fenced examples alone.
  prose(text).scan(/`((?:references|methods|templates|vendors|scripts|checks|assets|agents)\/[^`\s]+)`/).flatten.each do |target|
    relative = target.split("#", 2).first
    matches = skill_file.dirname.glob(relative)
    errors << "#{directory}: missing instruction pointer #{target}" if matches.empty?
  end
end

# Retired entry points must live outside discovery roots, not under references.
ROOT.glob("**/SKILL.md").each do |file|
  errors << "#{file.relative_path_from(ROOT)}: nested skill entry point" unless skill_files.include?(file)
end

manifest_file = ROOT.join("docs/skills-redesign.json")
if manifest_file.exist?
  begin
    manifest = JSON.parse(manifest_file.read)
    planned = manifest.fetch("catalog").map { |entry| entry.fetch("name") }.sort
    errors << "Active catalog differs from the approved redesign" unless skill_names.sort == planned
    manifest.fetch("planned_resource_bindings").each do |binding|
      target = binding.fetch("target")
      next if target == "AGENTS working agreement additions" # Verified against the host file during installation.
      path = ROOT.join(target)
      valid = skill_names.include?(target.split("/").first) && path.exist?
      valid &&= !path.glob("**/*").select(&:file?).empty? if path.directory?
      errors << "Missing approved resource binding #{target}" unless valid
    end
  rescue JSON::ParserError, KeyError, TypeError => e
    errors << "Invalid redesign manifest: #{e.message}"
  end
end

protected_file = ROOT.join("tests/protected-steward.json")
if protected_file.exist?
  begin
    JSON.parse(protected_file.read).each do |target, expected|
      file = ROOT.join(target)
      errors << "Protected Steward file differs: #{target}" unless file.file? && Digest::SHA256.file(file).hexdigest == expected
    end
  rescue JSON::ParserError, TypeError => e
    errors << "Invalid protected-file manifest: #{e.message}"
  end
end

case_count = 0
case_mentions = []

unless CASE_FILE.exist?
  errors << "#{CASE_FILE.relative_path_from(ROOT)}: missing invocation case corpus"
else
  case_document_loaded = false
  begin
    case_document = YAML.safe_load(CASE_FILE.read, permitted_classes: [], aliases: false)
    case_document_loaded = true
  rescue Psych::SyntaxError => e
    errors << "#{CASE_FILE.relative_path_from(ROOT)}: invalid YAML: #{e.message.lines.first.strip}"
  end

  if case_document_loaded
    unless case_document.is_a?(Hash)
      errors << "#{CASE_FILE.relative_path_from(ROOT)}: document must be a mapping"
      case_document = {}
    end

    unexpected = case_document.keys.map(&:to_s) - %w[version cases]
    errors << "#{CASE_FILE.relative_path_from(ROOT)}: unsupported keys: #{unexpected.join(', ')}" unless unexpected.empty?
    errors << "#{CASE_FILE.relative_path_from(ROOT)}: version must be 1" unless case_document["version"] == 1

    cases = case_document["cases"]
    unless cases.is_a?(Array)
      errors << "#{CASE_FILE.relative_path_from(ROOT)}: cases must be an array"
      cases = []
    end

    case_count = cases.length
    seen_ids = []

    cases.each_with_index do |invocation_case, index|
      location = "#{CASE_FILE.relative_path_from(ROOT)}: case #{index + 1}"
      unless invocation_case.is_a?(Hash)
        errors << "#{location} must be a mapping"
        next
      end

      unexpected = invocation_case.keys.map(&:to_s) - CASE_KEYS
      errors << "#{location} has unsupported keys: #{unexpected.join(', ')}" unless unexpected.empty?

      id = invocation_case["id"]
      kind = invocation_case["kind"]
      prompt = invocation_case["prompt"]
      why = invocation_case["why"]
      expectation = invocation_case["expect"]

      errors << "#{location} id must use lowercase hyphen-case" unless id.is_a?(String) && NAME_PATTERN.match?(id)
      errors << "#{location} duplicates id #{id}" if id.is_a?(String) && seen_ids.include?(id)
      seen_ids << id if id.is_a?(String)
      errors << "#{location} kind must be positive, negative, or collision" unless CASE_KINDS.include?(kind)
      errors << "#{location} prompt must be a non-empty string" unless prompt.is_a?(String) && !prompt.strip.empty?
      errors << "#{location} why must be a non-empty string" unless why.is_a?(String) && !why.strip.empty?

      unless expectation.is_a?(Hash)
        errors << "#{location} expect must be a mapping"
        next
      end

      unexpected = expectation.keys.map(&:to_s) - EXPECTATION_KEYS
      errors << "#{location} expect has unsupported keys: #{unexpected.join(', ')}" unless unexpected.empty?

      required_paths = expectation.fetch("read", [])
      excluded_paths = expectation.fetch("do_not_read", [])
      if !required_paths.is_a?(Array) || !excluded_paths.is_a?(Array)
        errors << "#{location} read and do_not_read must be arrays"
        next
      end
      (required_paths + excluded_paths).each do |target|
        unless target.is_a?(String) && skill_names.include?(target.split("/").first) && ROOT.join(target).cleanpath.to_s.start_with?("#{ROOT}/") && ROOT.join(target).file?
          errors << "#{location} references missing or non-skill method #{target}"
        end
      end
      unless (required_paths & excluded_paths).empty?
        errors << "#{location} both requires and excludes the same method"
      end

      primary = expectation["primary"]
      also_load = expectation["also_load"]
      do_not_load = expectation["do_not_load"]

      errors << "#{location} primary must be a skill name or null" unless primary.nil? || primary.is_a?(String)
      errors << "#{location} also_load must be an array" unless also_load.is_a?(Array)
      errors << "#{location} do_not_load must be an array" unless do_not_load.is_a?(Array)
      next unless (primary.nil? || primary.is_a?(String)) && also_load.is_a?(Array) && do_not_load.is_a?(Array)

      references = [primary, *also_load, *do_not_load].compact
      references.each do |skill_name|
        errors << "#{location} references unknown skill #{skill_name}" unless skill_names.include?(skill_name)
      end
      errors << "#{location} repeats a skill across expectation fields" unless references.uniq.length == references.length
      selected_entries = [primary, *also_load].compact.map { |name| "#{name}/SKILL.md" }
      unless (selected_entries & excluded_paths).empty?
        errors << "#{location} excludes a selected skill entry point"
      end

      case kind
      when "positive"
        errors << "#{location} positive case needs one primary skill" unless primary.is_a?(String)
        errors << "#{location} positive case cannot require supporting skills" unless also_load.empty?
      when "negative"
        errors << "#{location} negative case cannot have a primary skill" unless primary.nil?
        errors << "#{location} negative case cannot require supporting skills" unless also_load.empty?
        errors << "#{location} negative case must name at least one excluded neighbor" if do_not_load.empty?
      when "collision"
        errors << "#{location} collision case needs one primary skill" unless primary.is_a?(String)
        errors << "#{location} collision case must distinguish at least one neighbor" if also_load.empty? && do_not_load.empty? && excluded_paths.empty?
      end

      case_mentions.concat(references)
    end

    missing_kinds = CASE_KINDS - cases.filter_map { |invocation_case| invocation_case["kind"] if invocation_case.is_a?(Hash) }.uniq
    errors << "#{CASE_FILE.relative_path_from(ROOT)}: missing case kinds: #{missing_kinds.join(', ')}" unless missing_kinds.empty?

    missing_skills = skill_names.uniq - case_mentions.uniq
    errors << "#{CASE_FILE.relative_path_from(ROOT)}: skills without an invocation case: #{missing_skills.join(', ')}" unless missing_skills.empty?

  end
end

if errors.empty?
  puts "Validated #{skill_files.length} skill packages and #{case_count} invocation-case specifications (structural checks, not model-routing results)."
  exit 0
end

warn errors.join("\n")
exit 1
