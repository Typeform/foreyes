const getAllExamplePages = require("./getAllExamplePages");

jest.mock("fs")
describe("getAllExamplePages", () => {
    describe("given a path to the components' folder", () => {
        it("returns a js-readable list of component paths and combination paths", () => {
            const input = require("./__fixtures__/exampleList");
            require("fs").__fileExists = true;
            const output = getAllExamplePages(input);
            const expected = `const examples = {
button: { component: require('../././button').default, combinations: require('.././../test/button.exampleCombinations.js').default },
input: { component: require('../././input').default, combinations: require('.././../test/input.exampleCombinations.js').default },
headline: { component: require('../././headline').default, combinations: require('.././../test/headline.exampleCombinations.js').default },
label: { component: require('../././label').default, combinations: require('.././../test/label.exampleCombinations.js').default }
};
export default examples;`;
            expect(output.replace(/ |\t/g,"")).toMatch(expected.replace(/ |\t/g,""));
        })
    })
})