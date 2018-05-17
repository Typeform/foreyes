def configuration
  contents = File.read('katt.config').split("\n").map do |var|
    var.split('=')
  end
  Hash[contents].tap { |out| out['COMPONENT_FOLDER_BLACKLIST'] = out['COMPONENT_FOLDER_BLACKLIST'].split(',') }
end

def component_list
  config_vars = configuration
  Dir.glob("#{config_vars['PATH_TO_COMPONENTS']}**").reject do |component|
    name = File.basename(component)
    config_vars['COMPONENT_FOLDER_BLACKLIST'].include?(name)
  end
end

def specific_example_pages(components, variable_name, extension)
  pages = components.map do |component|
    name = File.basename(component)
    example_page = "#{component}/#{name}.#{extension}"
    "\t'#{name}',\n" if File.exist? example_page
  end

  "const #{variable_name} = [\n#{pages.join}];"
end

def all_example_pages(components)
  add_example = proc do |name, page|
    "\t#{name.tr('-','_')}: { component: require('../#{page}').default, combinations: require('../#{page}/#{name}.exampleCombinations.js').default },\n"
  end

  out = "const examples = {\n"

  components.each do |component|
    name = File.basename(component)
    visual_page = "#{component}/#{name}.exampleCombinations.js"
    if File.exist? visual_page
      out += add_example.call(name, component)
    else
      p "WARNING: No tests written for component #{name}"
    end
  end

  out += "};\nexport default examples;"
end

def visual_example_pages(components)
  specific_example_pages(components, 'visualTestableComponents', 'visualTest.js')
end

def layout_example_pages(components)
  specific_example_pages(components, 'layoutTestableComponents', 'layoutTest.js')
end

components = component_list

File.write('pages_server/componentsWithExamplePages.js', all_example_pages(components))
File.write('test_scripts/componentsWithLayoutTest.js', layout_example_pages(components))
File.write('test_scripts/componentsWithVisualTest.js', visual_example_pages(components))
