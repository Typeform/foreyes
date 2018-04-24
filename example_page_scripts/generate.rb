test_type, component_name = ARGV[0], ARGV[1]

if ARGV.size < 2 || ['help','-help','--help'].include?(ARGV[0]) || !['visual','toggle'].include?(test_type)
    puts "Usage: node generate.js <test_type> <component_name>\n\ttest_type: can be visual or layout.\n\tcomponent_name: lowercase name of the component."
end

script = './example_page_scripts/generateVisual.js'
if test_type.eql?('layout')
    script = `./example_page_scripts/generateLayout.js`
end

puts `node #{script} #{component_name}`