import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("validate that the pagination works correctly", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const nextPageButton = Selector(".main .row .pagination .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .row .pagination .page-item:first-child .page-link");
  const currentPageButton = Selector('.main .row .pagination .active .page-link');

  const page1Button = Selector('.main .row .pagination .page-item:nth-child(2) .page-link');
  const page2Button = Selector('.main .row .pagination .page-item:nth-child(3) .page-link');


  await t.expect(searchInputSelector.exists).ok("input exists");
  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");

  await t.expect(nextPageButton.exists).ok("next exists");
  await t.expect(previousPageButton.exists).ok("previous exists");
  await t
    .expect(currentPageButton.exists).ok("current exists")
    .expect(currentPageButton.innerText).eql("1");
  

  //get textContent first element of Page1 with search "tuyển sinh"
  const firstPostTitle = Selector('.main .thong-tin .col-sm-4:first-child');
  const firstPostTitleContentPage1Active = await firstPostTitle.textContent;

  //click page 2, expect content not the same
  await t 
    .click(page2Button)
    .expect(currentPageButton.innerText).eql("2");

  const firstPostTitleContentPage2 = await firstPostTitle.textContent;
  await t  
    .expect(firstPostTitleContentPage1Active).notEql(firstPostTitleContentPage2);


  //click page 1, expect content not the same
  await t
    .click(page1Button)
    .expect(currentPageButton.innerText).eql("1")

  const firstPostTitleContentPage1 = await firstPostTitle.textContent;
  await t  
    .expect(firstPostTitleContentPage1).eql(firstPostTitleContentPage1Active);


  //click nextPageButton
  await t
    .click(nextPageButton)
    .expect(currentPageButton.innerText).eql("2")
    .expect(firstPostTitleContentPage1).notEql(firstPostTitleContentPage2);

  
   //click previousPageButton
  await t
    .click(previousPageButton)
    .expect(currentPageButton.innerText).eql("1") 
    .expect(firstPostTitleContentPage1).eql(firstPostTitleContentPage1Active);

});
