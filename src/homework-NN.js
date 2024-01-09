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
    const pagination = Selector(".main .page-item .page-link").nth(2);
    const firsttext = Selector(".main .container .blog-details >h5 >a");
    const FirstText = await firsttext.textContent;

    await t.expect(searchInputSelector.exists).ok("Search box should exist");
  
    await t.typeText(searchInputSelector, "tuyển sinh").pressKey("enter");
  
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("At least one search result should exist");
    
    await t.expect(pagination.exists).ok("pagination should exist");
    await t.click(pagination);
    const secondtext = Selector(".main .container .blog-details >h5 >a");
    const SecondText = await secondtext.textContent;
    await t.expect(FirstText).notEql(SecondText);
  });