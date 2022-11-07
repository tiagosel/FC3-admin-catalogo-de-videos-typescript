"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_ts_1 = require("category.ts");
describe("Category Unit Tests", () => {
    test("constructor of category", () => {
        let category = new category_ts_1.Category({ name: "Movie" });
        let props = omit(category.props, "created_at");
        expect(props).toStrictEqual({
            name: "Movie",
            description: null,
            is_active: true,
        });
    });
});
