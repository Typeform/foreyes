require("dotenv").config({ path: "katt.config" })
const file = require("fs");
const path = require("path");

module.exports = () => {
    const basePath = process.env.PATH_TO_COMPONENTS;
    const blacklist = process.env.COMPONENT_FOLDER_BLACKLIST.split(",");
    const isntBlacklisted = name => !blacklist.includes(path.basename(name));
    const isFolder = name => file.lstatSync(`${basePath}${name}`).isDirectory()

    return file.readdirSync(basePath)
        .filter(isFolder)
        .filter(isntBlacklisted);
};
