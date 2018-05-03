Given('some basic data') do
    File.open('../katt.config', 'w') do |f|
        f << "PATH_TO_COMPONENTS=tests/components/\nPORT=8080\nCOMPONENT_FOLDER_BLACKLIST=ignore"
    end
end

When('I run the setup script') do
    `cd .. && ./create_configuration_files.sh && cd tests`
end

Then("the suite should be ready to run") do
    expect(FileUtils.identical?('../pages_server/componentsWithExamplePages.js', 'features/samples/componentsWithExamplePages.js')).to be true
    expect(FileUtils.identical?('../test_scripts/componentsWithLayoutTest.js', 'features/samples/componentsWithLayoutTest.js')).to be true
    expect(FileUtils.identical?('../test_scripts/componentsWithVisualTest.js', 'features/samples/componentsWithVisualTest.js')).to be true
    expect(FileUtils.identical?('../test_scripts/config.js', 'features/samples/config.js')).to be true
end