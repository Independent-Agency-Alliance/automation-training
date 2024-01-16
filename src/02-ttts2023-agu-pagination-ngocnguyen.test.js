/*  3.2. search for "tuyển sinh" and validate some results appear,
*      validate that the pagination works correctly (homework)
*          3.2.1. create a new branch from "develop"
*          3.2.2. create a new test file "02-ttts2023-agu-pagination-<nhi-nguyen>.test.js"
*          3.2.3. implement the test case
*          3.2.4. push the code to the new branch
*          3.2.5. create a pull request in github to merge the new branch to "develop"
*/
//Testcase 1: no result should return when searching for 'tuyen sinh'
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

//Test case 2: search for 'tuyển sinh' and validate some results appear
test("search for 'tuyển sinh' and validate some results appear", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const currentPageButton = Selector('.main .row .pagination .active .page-link');
  const nextPageButton = Selector(".main .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .page-item:first-child .page-link");
  

  //set variable to compare 2 different pages (referenced)
  const page1Button = Selector('.main .row .pagination .page-item:nth-child(2) .page-link');  
  const page2Button = Selector('.main .row .pagination .page-item:nth-child(3) .page-link');

 

  await t.expect(searchInputSelector.exists).ok("Search box should exist");
  await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");
  await t
    .expect(currentPageButton.exists).ok("Current page exists")
    .expect(currentPageButton.innerText).eql("1"); //compare value

  await t.expect(nextPageButton.exists).ok("Next page should exist");
  await t.expect(previousPageButton.exists).ok("Previous page should exist");

  //get textContent first element of Page1 with search "tuyển sinh"
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

//Validate click nextpageButton for next pages

  for (let i = 0; i < 5; i++) {
    await t.click(nextPageButton)
    await t.expect(nextPageButton.exists).ok("Next page search should exist");
    }
});

