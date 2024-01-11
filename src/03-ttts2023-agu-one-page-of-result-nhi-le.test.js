/*
Write test cases for the scenario in which there is only 1 page of result, validate the result and pagination
*/

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'nghiệm thu đề tài cấp trường' and validate the result and pagination", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const pagination = Selector(".main .page-item .page-link");
    await t.expect(searchInputSelector.exists).ok("Search box should exist");
  
    await t.typeText(searchInputSelector, "nghiệm thu đề tài cấp trường").pressKey("enter");
  
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("At least one search result should exist");

      await t.expect(pagination.exists).notOk("pagination should not exist");
  });