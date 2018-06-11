const file = require("fs");
const componentList = require("../src/examples/getComponentList");
const allExamplePages = require("../src/examples/getAllExamplePages");
const customExamplePages = require("../src/examples/getCustomExamplePages");

const componentPaths = componentList();
file.writeFileSync(".storybook/componentsWithExamplePages.js", allExamplePages(componentPaths), {flag: "w"});
file.writeFileSync(".storybook/componentsWithCustomExamplePages.js", customExamplePages(componentPaths), {flag: "w"});