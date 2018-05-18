const generateCombinationsForFunction = require("./generateCombinationsForFunction");

jest.mock("fs");
jest.mock("dotenv");
const fs = require("fs");

describe("generateCombinationsForFunction", () => {
    describe("given a component name", () => {
        it("should create a combinations file", () => {
            const raw = require("./__fixtures__/reactComponentFullyAutomatable");
            fs.__setMockFile(raw);

            const expected = `exports.default = {
    "enabled": [
        true,
        false
    ],
    "colorScheme": [
        "1",
        "2",
        "3"
    ]
}`;

            const result = generateCombinationsForFunction("input");
            expect(result).toBe(0);            
            expect(fs.__writtenContent).toBe(expected);
        })

        it("shouldn't overwrite the combinations file", () => {
            fs.__fileExists = true;
            const result = generateCombinationsForFunction("button");
            expect(result).toBe(2);
            expect(fs.__writtenContent).toBeUndefined();
        })

        it("should notify if some combinations couldn't be generated automatically", () => {
            const raw = require("./__fixtures__/reactComponent");
            fs.__setMockFile(raw);
            const result = generateCombinationsForFunction("input");
            expect(result).toBe(1);
        })
    })
    
    afterEach(() => { 
        fs.__fileExists = false;        
        fs.__writtenContent = undefined; 
    })
})