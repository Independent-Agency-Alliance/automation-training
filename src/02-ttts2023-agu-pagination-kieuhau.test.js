import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("validate that the pgination works correctly", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const nextPage = Selector(".main .row .pagination .page-item:last-child .page-link");
  const previousPage = Selector(".main .row .pagination .page-item:first-child .page-link");
  const currentPage = Selector('.main .row .pagination .active .page-link');

  await t.expect(searchInputSelector.exists).ok("input exsits");
  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t.expect(nextPage.exists).ok("next exsits");
  await t.expect(previousPage.exists).ok("previous exsits");
  await t
    .expect(currentPage.exists).ok("current exsits")
    .expect(currentPage.innerText).eql("1");
  

  //click nextPage
  await t
    .click(nextPage)
    .expect(currentPage.innerText).eql("2");
 
  //click previousPage
  await t
  .click(previousPage)
  .expect(currentPage.innerText).eql("1");

});