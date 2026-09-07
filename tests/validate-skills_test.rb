# frozen_string_literal: true

require "minitest/autorun"
require "tmpdir"
require "fileutils"
require "open3"
require "yaml"

class ValidateSkillsTest < Minitest::Test
  VALIDATOR = File.expand_path("../scripts/validate-skills.rb", __dir__)

  def setup
    @root = Dir.mktmpdir("skill-validator-")
    FileUtils.mkdir_p(File.join(@root, "sample/references"))
    FileUtils.mkdir_p(File.join(@root, "tests"))
    write("sample/SKILL.md", "---\nname: sample\ndescription: Use when testing a skill. Load it to validate contracts.\n---\n[Reference](references/guide.md)\n")
    write("sample/references/guide.md", "# Guide\n")
    cases = [
      {"id" => "positive", "kind" => "positive", "prompt" => "Use sample.", "expect" => {"primary" => "sample", "also_load" => [], "do_not_load" => []}, "why" => "Explicit selection."},
      {"id" => "negative", "kind" => "negative", "prompt" => "Do ordinary work.", "expect" => {"primary" => nil, "also_load" => [], "do_not_load" => ["sample"]}, "why" => "No trigger."},
      {"id" => "collision", "kind" => "collision", "prompt" => "Use sample with support.", "expect" => {"primary" => "sample", "also_load" => ["support"], "do_not_load" => []}, "why" => "Supporting method."}
    ]
    FileUtils.mkdir_p(File.join(@root, "support"))
    write("support/SKILL.md", "---\nname: support\ndescription: Use when support is needed. Load it to support sample.\n---\n")
    write("tests/invocation-cases.yml", {"version" => 1, "cases" => cases}.to_yaml)
  end

  def teardown
    FileUtils.remove_entry(@root)
  end

  def write(path, content)
    File.write(File.join(@root, path), content)
  end

  def run_validator
    output, status = Open3.capture2e("ruby", VALIDATOR, @root)
    [status.success?, output]
  end

  def test_nested_owned_link_is_checked_but_fenced_project_examples_are_not
    write("sample/references/guide.md", "```md\n[Example](absent-example.md)\n```\n[Owned](missing.md)\n")
    success, output = run_validator
    refute success
    assert_includes output, "sample/references/guide.md: missing linked file missing.md"
    refute_includes output, "absent-example.md"
    write("sample/references/missing.md", "# Present\n")
    assert run_validator.first
  end

  def test_explicit_host_policy_is_required_and_boolean
    path = File.join(@root, "sample/SKILL.md")
    File.write(path, File.read(path).sub("name: sample", "name: sample\ndisable-model-invocation: true"))
    refute run_validator.first
    FileUtils.mkdir_p(File.join(@root, "sample/agents"))
    write("sample/agents/openai.yaml", "policy:\n  allow_implicit_invocation: 'false'\n")
    refute run_validator.first
    write("sample/agents/openai.yaml", "interface:\n  display_name: Sample\npolicy:\n  allow_implicit_invocation: false\n")
    assert run_validator.first
  end

  def test_branch_collision_requires_distinct_existing_methods
    corpus = YAML.safe_load(File.read(File.join(@root, "tests/invocation-cases.yml")))
    corpus["cases"][1]["expect"]["do_not_load"] = %w[sample support]
    expectation = corpus["cases"][2]["expect"]
    expectation["also_load"] = []
    expectation["read"] = ["sample/references/guide.md"]
    expectation["do_not_read"] = ["sample/references/other.md"]
    write("tests/invocation-cases.yml", corpus.to_yaml)
    success, output = run_validator
    refute success
    assert_includes output, "references missing or non-skill method sample/references/other.md"

    write("sample/references/other.md", "# Other method\n")
    assert run_validator.first

    expectation["do_not_read"] = expectation["read"].dup
    write("tests/invocation-cases.yml", corpus.to_yaml)
    success, output = run_validator
    refute success
    assert_includes output, "both requires and excludes the same method"
  end

  def test_malformed_host_metadata_is_reported
    FileUtils.mkdir_p(File.join(@root, "sample/agents"))
    write("sample/agents/openai.yaml", "policy: [\n")
    success, output = run_validator
    refute success
    assert_includes output, "invalid agents/openai.yaml"
  end
end
