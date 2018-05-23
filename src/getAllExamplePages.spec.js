const getAllExamplePages = require("./getAllExamplePages");

jest.mock("fs")
describe("getAllExamplePages", () => {
    describe("given a path to the components' folder", () => {
        it("returns a js-readable list of component paths and combination paths", () => {
            const input = require("./__fixtures__/exampleList");
            require("fs").__fileExists = true;
            const output = getAllExamplePages(input);
            const expected = `const examples = ["button","input","headline","label"];
export default examples;`;
            expect(output.replace(/ |\t/g,"")).toMatch(expected.replace(/ |\t/g,""));
        })
    })
})