/*
Homework 02 - Due on next Monday, 01/15/2024

1. Finish the PR for Homework 01
2. Write test cases for the scenario in which there is only 1 page of result, validate the result and pagination
3. Write test cases for the scenario in which there are 2 pages of result, validate the result and pagination
*/

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("validate that the pagination which there is only 1 page of result", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const paginationSelector = Selector(".main .page-item .page-link");

    await t.expect(searchInputSelector.exists).ok("Search box should exist");

    await t.typeText(searchInputSelector, "đảm bảo chất lượng đầu vào").pressKey("enter");

    await t
        .expect(Selector(".main .thong-tin .blog-details .btn").exists)
        .ok("At least one search result should exist");

    // check Pagination not exist because there is only 1 page of result
    await t.expect(paginationSelector.exists).notOk("Pagination should not exist")
});
