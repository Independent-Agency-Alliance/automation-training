//Write test cases for the scenario in which there are 2 pages of result, validate the result and pagination

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'Công khai' and there are 2 pages of result, validate the result and pagination", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const currentPageButton = Selector('.main .row .pagination .active .page-link');
  const nextPageButton = Selector(".main .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .page-item:first-child .page-link");
  
  //set variable to compare 2 different pages (referenced)
  const page1Button = Selector('.main .row .pagination .page-item:nth-child(2) .page-link');  
  const page2Button = Selector('.main .row .pagination .page-item:nth-child(3) .page-link');

  await t.expect(searchInputSelector.exists).ok("Search box should exist");
  await t.typeText(searchInputSelector, "Công khai").pressKey("enter");
  await t
    .expect(currentPageButton.exists).ok("Current page exists")
    .expect(currentPageButton.innerText).eql("1"); //compare value

  await t.expect(nextPageButton.exists).ok("Next page should exist");
  await t.expect(previousPageButton.exists).ok("Previous page should exist");

  //get textContent first element of Page1 with search "Công khai"
  const firstPostTitle = Selector('.main .thong-tin .col-sm-4:first-child');
  const firstPostTitleContentPage1Active = await firstPostTitle.textContent;

  //click page 2, expect content not the same (referenced)
  await t 
    .click(page2Button)
    .expect(currentPageButton.innerText).eql("2");

  const firstPostTitleContentPage2 = await firstPostTitle.textContent;
  await t  
    .expect(firstPostTitleContentPage1Active).notEql(firstPostTitleContentPage2);

  //click page 1, expect content not the same (referenced)
  await t
    .click(page1Button)
    .expect(currentPageButton.innerText).eql("1")

  const firstPostTitleContentPage1 = await firstPostTitle.textContent;
  await t  
    .expect(firstPostTitleContentPage1).eql(firstPostTitleContentPage1Active);

  //click nextPageButton
  await t
    .click(nextPageButton)
    .expect(currentPageButton.innerText).eql("2") //compare value
    .expect(nextPageButton.exists).ok("Next page search should exist");

  //click previousPageButton
  await t
    .click(previousPageButton)
    .expect(currentPageButton.innerText).eql("1")  //compare value
    .expect(previousPageButton.exists).ok("Previous page search should exist");

});