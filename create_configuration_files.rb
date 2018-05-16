def read_config
    contents = File.read('katt.config').split("\n").map do |var|
        var.split('=')
    end
    out = Hash[contents].tap{ |out| out['COMPONENT_FOLDER_BLACKLIST'] = out['COMPONENT_FOLDER_BLACKLIST'].split(',') }
end

def add_example(name, page)
    "\t#{name.tr('-','_')}: { component: require('../#{page}').default, combinations: require('../#{page}/#{name}.exampleCombinations.js').default },\n"
end

basic_vars = read_config

examples_text = "const examples = {\n"
layouts_text = "const layoutTestableComponents = [\n"
visuals_text = "const visualTestableComponents = [\n"

components = Dir.glob("#{basic_vars['PATH_TO_COMPONENTS']}**").reject do |component| 
    basic_vars['COMPONENT_FOLDER_BLACKLIST'].include?(File.basename(component))
end

components.each do |component|
    name = File.basename(component)
    visual_page = "#{component}/#{name}.exampleCombinations.js"
    main_page =  "#{component}"
    if File.exists? visual_page
        examples_text += add_example(name, main_page)
        visuals_text += "\t'#{name}',\n"
    else
        p "WARNING: No visual tests written for component #{name}"
    end
end

examples_text += "};\nexport default examples;"
layouts_text += '];'
visuals_text += '];'

File.write('pages_server/componentsWithExamplePages.js', examples_text)
File.write('test_scripts/componentsWithLayoutTest.js', layouts_text)
File.write('test_scripts/componentsWithVisualTest.js', visuals_text)
File.write('./config.js', "var config = {\n\tcomponentsSrcURI: '#{basic_vars["PATH_TO_COMPONENTS"]}'\n};")
