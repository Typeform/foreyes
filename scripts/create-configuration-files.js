const file = require("fs");
const path = require('path')
const componentList = require(path.resolve(__dirname, "../src/examples/getComponentList"));
const allExamplePages = require(path.resolve(__dirname, "../src/examples/getAllExamplePages"));
const customExamplePages = require(path.resolve(__dirname, "../src/examples/getCustomExamplePages"));
const componentPaths = componentList();
file.writeFileSync(
    path.resolve(__dirname, "../.storybook/componentsWithExamplePages.js"), 
    allExamplePages(componentPaths), 
    {flag: "w"});
file.writeFileSync(
    path.resolve(__dirname, "../.storybook/componentsWithCustomExamplePages.js"), 
    customExamplePages(componentPaths), 
    {flag: "w"});