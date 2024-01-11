/*  3.2. search for "tuyển sinh" and validate some results appear,
*      validate that the pagination works correctly (homework)
*          3.2.1. create a new branch from "develop"
*          3.2.2. create a new test file "02-ttts2023-agu-pagination-<nhi-nguyen>.test.js"
*          3.2.3. implement the test case
*          3.2.4. push the code to the new branch
*          3.2.5. create a pull request in github to merge the new branch to "develop"
*/
import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'tuyển sinh' and validate some results appear", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const pagination = Selector(".main .page-item .page-link");
    const page2Button = Selector(".main .page-item .page-link").nth(2);
    const nextPageButton = Selector(".main .page-item:last-child .page-link");
    const previousPageButton = Selector(".main .page-item:first-child .page-link");
    const firstPostTitle = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleContent = await firstPostTitle.textContent;

    await t.expect(searchInputSelector.exists).ok("Search box should exist");
  
    await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");
  
    
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("At least one search result should exist");
    
    await t.expect(pagination.exists).ok("pagination should exist");

    await t.click(page2Button);
    const firstPostTitleOnPage2 = Selector(".main .thong-tin .col-sm-4:first-child");
    const firstPostTitleOnPage2Content = await firstPostTitleOnPage2.textContent;
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

    await t .click(previousPageButton);
    await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
  
  
    // //click nextPageButton
    await t
      .click(nextPageButton);
      await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
  });