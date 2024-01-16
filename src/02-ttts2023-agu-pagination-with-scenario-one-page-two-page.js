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

test("validate that the pagination which there are 2 pages of result", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");

    const page2Button = Selector(".main .row .pagination .page-item:nth-child(2) .page-link");
    const nextPageButton = Selector(".main .row .pagination .page-item:last-child .page-link");
    const previousPageButton = Selector(".main .row .pagination .page-item:first-child .page-link");
    const currentPageButton = Selector(".main .row .pagination .active .page-link");
    const searchResultOnPage = Selector(".main .thong-tin .blog-details .btn");

    const firstPostTitle = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleContent = await firstPostTitle.textContent;
    await t.expect(searchInputSelector.exists).ok("Search box should exist");

    await t.typeText(searchInputSelector, "chất lượng").pressKey("enter");

    await t
        .expect(Selector(searchResultOnPage).exists)
        .ok("At least one search result should exist");


    // check Pagination exist
    await t.expect(nextPageButton.exists).ok("Nextpage button should exist");
    await t.expect(previousPageButton.exists).ok("Previouspage button should exist");
    await t
        .expect(currentPageButton.exists)
        .ok("Currentpage button should exist")
        .expect(currentPageButton.innerText)
        .eql("1");



    await t.click(page2Button);
    const firstPostTitleOnPage2 = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleOnPage2Content = await firstPostTitleOnPage2.textContent;
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

    //back page 1
    await t.click(previousPageButton);
    //compare content between PostTitle on page 1 and PostTitle on page 2
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

    await t.click(nextPageButton);
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

});