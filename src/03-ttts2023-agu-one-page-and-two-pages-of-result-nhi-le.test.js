/*
Write test cases for the scenario in which there is only 1 page of result, validate the result and pagination
Write test cases for the scenario in which there are 2 pages of result, validate the result and pagination
*/

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'nghiệm thu đề tài cấp trường' which there is only 1 page of result and validate the result and pagination", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const pagination = Selector(".main .page-item .page-link");

    // validate that the search box is visible
    await t.expect(searchInputSelector.exists).ok("Search box should exist");
  
    // search for "nghiem thu de tai cap truong" and validate some results appear
    await t.typeText(searchInputSelector, "nghiệm thu đề tài cấp trường").pressKey("enter");
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("At least one search result should exist");

    // validate that the pagination is not visible
    await t.expect(pagination.exists).notOk("pagination should not exist");
  });

  
test("search for 'hội nghị viên chức' which there are 2 pages of result and validate the result and pagination", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const pagination = Selector(".main .page-item .page-link");
  const page2Button = Selector(".main .page-item .page-link").nth(2);
  const nextPageButton = Selector(".main .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .page-item:first-child .page-link");
  const firstPostTitle = Selector(".main .thong-tin .col-sm-4:first-child");
  const firstPostTitleContent = await firstPostTitle.textContent;

  // validate that the search box is visible
  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  // search for "hoi nghi vien chuc" and validate some results appear
  await t.typeText(searchInputSelector, "hội nghị viên chức").pressKey("enter");
  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .ok("At least one search result should exist");

  // validate that the pagination is visible and have four element
  await t.expect(pagination.exists).ok("pagination should exist");
  await t.expect(pagination.count).eql(4);

  //click the button 2 to navigate the page 2 and compare the first title on page 1 and page 2
  await t.click(page2Button);
  const firstPostTitleOnPage2 = Selector(".main .thong-tin .col-sm-4:first-child");
  const firstPostTitleOnPage2Content = await firstPostTitleOnPage2.textContent;
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

  //click the previous button to navigate the previous page and compare the first title on page 1 and page 2
  await t .click(previousPageButton);
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
  
  //click the next button to navigate the next page and compare the first title on page 1 and page 2
  await t.click(nextPageButton);
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
});