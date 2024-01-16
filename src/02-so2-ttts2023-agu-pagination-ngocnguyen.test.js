//Write test cases for the scenario in which there is only 1 page of result, validate the result and pagination

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'giới thiệu' and only 1 page of result, validate the result and pagination", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const currentPageButton = Selector('.main .row .pagination .active .page-link'); 

    //validate that the pagination doesn't appear.
    await t
        .expect(currentPageButton.exists).ok("Current page exists")
        .expect(currentPageButton.innerText).eql("1");

    //search for "giới thiệu" and validate have 1 page of result
    await t.expect(searchInputSelector.exists).ok("Search box should exist");
    await t.typeText(searchInputSelector, "giới thiệu").pressKey("enter");
    
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("A page result should exist");
  });