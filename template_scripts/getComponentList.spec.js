const getComponentList = require("./getComponentList");

jest.mock("dotenv");
jest.mock("fs");

describe("getComponentList", () => {
    it("should return all non-blacklisted subfolders", () => {
        const expected = ["button",
            "input",
            "headline",
            "label"];
        expect(getComponentList()).toEqual(expected);
    })
})
