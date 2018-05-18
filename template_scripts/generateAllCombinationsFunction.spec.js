const generateAllCombinationsFunction = require("./generateAllCombinationsFunction");

jest.mock("fs");
jest.mock("dotenv");

describe("generateAllCombinationsFunction", () => {
    it("should generate the one file per component", () => {
        const filesCreated = generateAllCombinationsFunction()
            .reduce((acc, result) => {
                if (result.result === 0) acc++;
                return acc;
            }, 0);
        expect(filesCreated).toBe(4);
    })
    // rm */*.exampleCombinations.js
})