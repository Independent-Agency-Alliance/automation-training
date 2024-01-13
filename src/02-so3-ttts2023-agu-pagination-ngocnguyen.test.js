//Write test cases for the scenario in which there are 2 pages of result, validate the result and pagination

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'Công khai' and there are 2 pages of result, validate the result and pagination", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const ClickNextPage = Selector(".main .page-item:last-child .page-link");
  const ClickPreviousPage = Selector(".main .page-item:first-child .page-link");
 
  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  await t.typeText(searchInputSelector, "Công khai").pressKey("enter");

  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .ok("At more six search result should exist");

  for (let i = 0; i < 5; i++) {
      await t.click(ClickNextPage);
    }
    
  await t.expect(ClickNextPage.exists).ok("Next page search should exist");

  await t.expect(ClickPreviousPage.exists).ok("Previous page search should exist");

  await t.click(ClickNextPage);

  await t.click(ClickPreviousPage);
});