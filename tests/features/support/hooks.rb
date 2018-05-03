Before do
    FileUtils.mkdir_p('components/ignore')
    [
        'components/layout/layout.layoutTest.js',
        'components/visual/visual.visualTest.js',
        'components/no-test/example.layoutTest.wrongExtension',
        'components/no-test2/example.visualTest.wrongExtension',
    ].each do |file|
        FileUtils.mkdir_p(File.dirname(file))
        FileUtils.touch(file)
    end
end

After do
    FileUtils.rm_rf('components/') if File.directory?('components/')
    FileUtils.rm('../katt.config') if File.exists?('../katt.config')
end