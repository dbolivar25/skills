#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).parent.expand_path
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

errors = []
skill_files = ROOT.glob("*/SKILL.md").sort

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

if errors.empty?
  puts "Validated #{skill_files.length} skills and their invocation contracts."
  exit 0
end

warn errors.join("\n")
exit 1
