const file = require("fs");
const componentList = require("../src/getComponentList");
const allExamplePages = require("../src/getAllExamplePages");
require("dotenv").config({path: "katt.config"})

const componentPaths = componentList();
file.writeFileSync(".storybook/componentsWithExamplePages.js", allExamplePages(componentPaths), {flag: "w"});