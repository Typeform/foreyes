const getComponentList = require("./getComponentList");

jest.mock("dotenv");
jest.mock("fs");

describe("getComponentList", () => {
    it("returns all non-blacklisted subfolders", () => {
        const expected = ["button",
            "input",
            "headline",
            "label"];
        expect(getComponentList()).toEqual(expected);
    })
})
