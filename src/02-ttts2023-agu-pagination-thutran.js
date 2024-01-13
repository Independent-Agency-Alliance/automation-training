/**
 * Test plan:
 *
 * 1. go to https://www.agu.edu.vn/vi
 * 2. validate that the search box is visible
 * 3. split into 2 scenarios
 *  3.1. search for "tuyen sinh" and validate there is no result
 *  3.2. search for "tuyển sinh" and validate some results appear,
 *      validate that the pagination works correctly (homework)
 *          3.2.1. create a new branch from "develop"
 *          3.2.2. create a new test file "02-ttts2023-agu-pagination-<nhi-nguyen>.test.js"
 *          3.2.3. implement the test case
 *          3.2.4. push the code to the new branch
 *          3.2.5. create a pull request in github to merge the new branch to "develop"
 */

import { Selector, ClientFunction } from "testcafe";

const getURL = ClientFunction(() => window.location.href);

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("validate that the pagination works correctly", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const nextPageButton = Selector(".main .row .pagination .page-item:last-child .page-link");
    const previousPageButton = Selector(".main .row .pagination .page-item:first-child .page-link");
    const currentPageButton = Selector(".main .row .pagination .active .page-link");

    const page2Button = Selector(".main .row .pagination .page-item:nth-child(3) .page-link");
    const firstPostTitle = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleContent = await firstPostTitle.textContent;
    await t.expect(searchInputSelector.exists).ok("Search box should exist");

    await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

    await t
        .expect(Selector(".main .thong-tin .blog-details .btn").exists)
        .ok("At least one search result should exist");

    // check Pagination exist
    await t.expect(nextPageButton.exists).ok("Next should exist");
    await t.expect(previousPageButton.exists).ok("Previous should exist");
    await t
        .expect(currentPageButton.exists)
        .ok("Current should exist")
        .expect(currentPageButton.innerText)
        .eql("1");
        
    //navigate page 2 and get Content Tilte on first post 
    await t.click(page2Button);
    const firstPostTitleOnPage2 = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleOnPage2Content = await firstPostTitleOnPage2.textContent;
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
});
