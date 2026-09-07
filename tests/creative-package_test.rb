# frozen_string_literal: true

require "minitest/autorun"
require "pathname"

class CreativePackageTest < Minitest::Test
  ROOT = Pathname.new(__dir__).parent
  PACKAGE = ROOT.join("creative-ideation")

  def test_package_fits_the_selected_file_budget_and_existing_publisher_limit
    files = PACKAGE.glob("**/*", File::FNM_DOTMATCH).select(&:file?)
    assert_operator files.length, :<=, 20, "Owner-selected file budget, not a verified Amp cap"
    footprint = files.sum { |file| file.size + file.relative_path_from(ROOT).to_s.bytesize }
    assert_operator footprint, :<=, 128_000, "Publisher counts content bytes plus repository-relative paths"
    refute ROOT.join("creative-shaping").exist?, "One creative invocation owns the library"
  end

  def test_named_method_routes_resolve_to_the_preserved_method_sections
    routes = PACKAGE.join("references/routing.md").read.scan(/\]\((methods\/[^)]+)\)/).flatten
    assert_equal 22, routes.length, "Every original named method needs a route"
    routes.each do |route|
      path, anchor = route.split("#", 2)
      file = PACKAGE.join("references", path)
      assert file.file?, "Missing method file: #{path}"
      next unless anchor

      headings = file.read.lines.grep(/^# /).map do |line|
        line.delete_prefix("# ").strip.downcase.gsub(/[^\p{Word}\- ]/, "").tr(" ", "-")
      end
      assert_includes headings, anchor, "Missing named method: #{route}"
    end
  end
end
