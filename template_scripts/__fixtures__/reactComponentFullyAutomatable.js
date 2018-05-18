module.exports = `const nonParsedVar = "This should not be parsed"

let propTypes = {
    enabled: propTypes.bool,
    colorScheme: propTypes.oneOf([1, 2, 3])
};

exports.default = "No javascript should be activated."`;