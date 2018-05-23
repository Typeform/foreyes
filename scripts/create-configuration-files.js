const file = require("fs");
const componentList = require("../src/getComponentList");
const allExamplePages = require("../src/getAllExamplePages");

const componentPaths = componentList();
file.writeFileSync(".storybook/componentsWithExamplePages.js", allExamplePages(componentPaths), {flag: "w"});