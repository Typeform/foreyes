const file = require("fs");
const componentList = require("../src/getComponentList");
const allExamplePages = require("../src/getAllExamplePages");
const customExamplePages = require("../src/getCustomExamplePages");

const componentPaths = componentList();
file.writeFileSync(".storybook/componentsWithExamplePages.js", allExamplePages(componentPaths), {flag: "w"});
file.writeFileSync(".storybook/componentsWithCustomExamplePages.js", customExamplePages(componentPaths), {flag: "w"});