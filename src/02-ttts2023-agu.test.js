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

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("no result should return when searching for 'tuyen sinh'", async (t) => {
  // validate that the search box is visible
  const searchInputSelector = Selector(".search .input-group .search");

  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  // search for "tuyen sinh" and validate there is no result
  await t.typeText(searchInputSelector, "tuyen sinh").pressKey("enter");

  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .notOk("At least one search result should exist");
});

test("search for 'tuyển sinh' and validate some results appear", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");

  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .ok("At least one search result should exist");
});
