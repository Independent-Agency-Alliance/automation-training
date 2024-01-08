import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("after search, validate that the pagination works correcly", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");

  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t
    .expect(Selector(".main .row .pagination").exists)
    .ok("container page exists");
});
