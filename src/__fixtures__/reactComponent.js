module.exports = `const nonParsedVar = "This should not be parsed"

let propTypes = {
    maxChars: propTypes.bool,
    colorScheme: propTypes.oneOf([1, 2, 3]),
    width: propTypes.number,
    enabled: propTypes.bool
};

exports.default = "No javascript should be activated."`
