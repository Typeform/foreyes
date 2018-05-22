const file = require("fs");

module.exports = (componentName, componentPath) => {
    const rawComponentPath = `${componentPath}${componentName}.js`;
    const rawString = file.readFileSync(rawComponentPath).toString();
    const clean = cleanString(rawString);
    return stringToArray(clean);
}

const stringToArray = (cleanString) => {
    return cleanString
        .split(",\n")
        .filter((i) => (i !== ""))
        .reduce((acc,value) => {
            try {
                if (value.substring(-1) === ",") value = value.slice(0, -1)
                const pair = value.split(":");
                acc.push( { attribute: pair[0], propType: pair[1].split(".")[1] } );
            }catch(e){}
            return acc;
        },[])
}

const cleanString = (rawComponent) => { //return a string ready to be split into an array
    const beginning = "propTypes={";
    const ending = "}";
    try {
        return rawComponent
            .replace(/ /g, "")
            .split(beginning)[1]
            .split(ending)[0]
            .replace(/'/g, "")
            .replace(/^\n+|\n+$/g, '');
    } catch (error) {
        return "";
    }
}
