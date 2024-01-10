import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("validate that the pgination works correctly", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const nextPageButton = Selector(".main .row .pagination .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .row .pagination .page-item:first-child .page-link");
  const currentPageButton = Selector('.main .row .pagination .active .page-link');
  const page2Button = Selector('.main .row .pagination .page-item:nth-child(3) .page-link');
  const firstPostTitle = Selector('.main .thong-tin .col-sm-4:first-child');
  const firstPostTitleContent1 = await firstPostTitle.textContent;

  await t.expect(searchInputSelector.exists).ok("input exsits");
  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t.expect(nextPageButton.exists).ok("next exsits");
  await t.expect(previousPageButton.exists).ok("previous exsits");
  await t
    .expect(currentPageButton.exists).ok("current exsits")
    .expect(currentPageButton.innerText).eql("1");
  

  //click page 2, expect content not the same
  await t 
    .click(page2Button)
    .expect(currentPageButton.innerText).eql("2");

    const firstPostTitleContent2 = await firstPostTitle.textContent;

  await t  
    .expect(firstPostTitleContent1).notEql(firstPostTitleContent2);


   //click previousPageButton
  await t
  .click(previousPageButton)
  .expect(currentPageButton.innerText).eql("1")
  .expect(firstPostTitleContent2).notEql(firstPostTitleContent1);


  // //click nextPageButton
  await t
    .click(nextPageButton)
    .expect(currentPageButton.innerText).eql("2")
    .expect(firstPostTitleContent1).notEql(firstPostTitleContent2);
 
});
