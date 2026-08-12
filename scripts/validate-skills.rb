#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).parent.expand_path
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
EXPECTATION_KEYS = %w[primary also_load do_not_load].freeze

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

    unless frontmatter["disable-model-invocation"] == true
      errors << "#{directory}: model invocation contract must start with 'Use when' or 'Use only when'" unless normalized.match?(/\AUse (?:only )?when\b/)
      errors << "#{directory}: model invocation contract must state why with 'Load it to' or 'Load it as'" unless normalized.match?(/\bLoad it (?:to|as)\b/)
    end
  end

  disabled = frontmatter["disable-model-invocation"]
  if !disabled.nil? && disabled != true && disabled != false
    errors << "#{directory}: disable-model-invocation must be true or false"
  end

  text.scan(LINK_PATTERN).flatten.each do |target|
    target = target.strip
    next if target.empty? || target.start_with?("#") || target.match?(/\A[a-z][a-z0-9+.-]*:/i)

    relative = target.delete_prefix("<").delete_suffix(">").split("#", 2).first
    path = skill_file.dirname.join(relative).cleanpath
    errors << "#{directory}: missing linked file #{target}" unless path.exist?
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
        errors << "#{location} collision case must distinguish at least one neighbor" if also_load.empty? && do_not_load.empty?
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
  puts "Validated #{skill_files.length} skills, their invocation contracts, and #{case_count} invocation cases."
  exit 0
end

warn errors.join("\n")
exit 1
