module.exports = () => {
    const out = process.argv.slice(2)[0];
    if(!out) throw "No component name given as the first name";
    return out.toLowerCase();
};