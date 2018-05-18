const getAttributeCombinationsFromArray = require("./getAttributeCombinationsFromArray");

describe("getAttributeCombinationsFromArray", ()  => {
    it("should parse a boolean", () => {
        const combinations = getAttributeCombinationsFromArray("bool");
        expect(combinations).toEqual([true, false]);
    })

    it("should parse oneOf", () => {
        const sizes = ["large","medium","small"];
        const combinations = getAttributeCombinationsFromArray(`oneOf(${JSON.stringify(sizes)})`);
        expect(combinations).toEqual(sizes);
    })

    it("should ignore string quotes on oneOf", () => {
        const sizes = ['large','medium','small'];
        const combinations = getAttributeCombinationsFromArray(`oneOf(${JSON.stringify(sizes)})`);
        expect(combinations).toEqual(sizes);
    })

    it("should parse an unknown propType as []", () => {
        const combinations = getAttributeCombinationsFromArray(`func`);
        expect(combinations).toEqual([])
    })
})