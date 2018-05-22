const file = require("fs");
const componentList = require("../src/getComponentList");
const allExamplePages = require("../src/getAllExamplePages");
require("dotenv").config({path: "katt.config"})

const componentsPath = componentList().map(name => `${process.env.PATH_TO_COMPONENTS}${name}`);
file.writeFileSync("pages_server/componentsWithExamplePages.js", allExamplePages(componentsPath), {flag: "w"});