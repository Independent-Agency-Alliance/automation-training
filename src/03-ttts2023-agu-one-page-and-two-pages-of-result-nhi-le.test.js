/*
Write test cases for the scenario in which there is only 1 page of result, validate the result and pagination
Write test cases for the scenario in which there are 2 pages of result, validate the result and pagination
*/

import { Selector } from "testcafe";

fixture("ttts2023-agu").page("https://www.agu.edu.vn/vi/tim-kiem");

test("search for 'nghiệm thu đề tài cấp trường' and validate the result and pagination", async (t) => {
    const searchInputSelector = Selector(".search .input-group .search");
    const pagination = Selector(".main .page-item .page-link");
    await t.expect(searchInputSelector.exists).ok("Search box should exist");
  
    await t.typeText(searchInputSelector, "nghiệm thu đề tài cấp trường").pressKey("enter");
  
    await t
      .expect(Selector(".main .thong-tin .blog-details .btn").exists)
      .ok("At least one search result should exist");

      await t.expect(pagination.exists).notOk("pagination should not exist");
  });

  
test("search for 'hội nghị viên chức' and validate the result and pagination", async (t) => {
  const searchInputSelector = Selector(".search .input-group .search");
  const pagination = Selector(".main .page-item .page-link");
  const page2Button = Selector(".main .page-item .page-link").nth(2);
  const nextPageButton = Selector(".main .page-item:last-child .page-link");
  const previousPageButton = Selector(".main .page-item:first-child .page-link");
  const firstPostTitle = Selector(".main .thong-tin .col-sm-4:first-child");
  const firstPostTitleContent = await firstPostTitle.textContent;

  await t.expect(searchInputSelector.exists).ok("Search box should exist");

  await t.typeText(searchInputSelector, "hội nghị viên chức").pressKey("enter");

  await t
    .expect(Selector(".main .thong-tin .blog-details .btn").exists)
    .ok("At least one search result should exist");

  await t.expect(pagination.exists).ok("pagination should exist");
  await t.expect(pagination.count).eql(4);
  await t.click(page2Button);
  const firstPostTitleOnPage2 = Selector(".main .thong-tin .col-sm-4:first-child");
  const firstPostTitleOnPage2Content = await firstPostTitleOnPage2.textContent;
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);

  await t .click(previousPageButton);
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
  
  await t.click(nextPageButton);
  await t.expect(firstPostTitleContent).notEql(firstPostTitleOnPage2Content);
});