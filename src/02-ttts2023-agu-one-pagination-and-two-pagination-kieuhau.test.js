import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("test cases for the scenario in which there is only 1 page of result, validate the result and pagination", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");

  await t.expect(searchInputSelector.exists).ok("input exsits");
  await t.typeText(searchInputSelector, "doanh nghiệp").pressKey("enter");

  await t
  .expect(Selector(".main .thong-tin .blog-details .btn").exists)
  .ok("At least one search result should exist");

  await t
  .expect(Selector(".main .row .pagination").exists)
  .notOk("expect pagination no exist");

});
