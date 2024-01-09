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
  const paginationActiveSelector = Selector(".main .page-item .page-link").nth(2);

  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .ok("At least one search result should exist");

  await t.expect(paginationActiveSelector.exists).ok("Pagination active should exist");
  await t
    .expect(paginationActiveSelector.getAttribute("disabled"))
    .notOk("Pagination active should not be disabled");
  await t.click(paginationActiveSelector);
  await t
    .expect(getURL())
    .eql("https://www.agu.edu.vn/vi/tim-kiem?q=tuy%E1%BB%83n%20sinh&page=2");
});