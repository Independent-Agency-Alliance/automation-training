// 1. Navigate to www.agu.edu.vn
// 2. Validate that the panel with title "Thông tin Tuyển sinh 2023" is visible
//     2.1. Validate that the panel title has a light red color - ignore for now
// 3. Validate the button "Xem Them" is visible and clickable
// 4. Click on the button "Xem Them"
// 5. Validate the page changed to "Tuyen Sinh 2023"
// 6. Validate the element with title "Tuyển sinh năm 2023" is visible on the page.

import { Selector, ClientFunction } from "testcafe";

const getURL = ClientFunction(() => window.location.href);

fixture("ttts2024-agu").page("https://www.agu.edu.vn/vi");

test("should display Thông Tin Tuyển Sinh 2024", async (t) => {
  await t
    .expect(Selector(".main .row:first-child .panel-title").innerText)
    .eql(" Thông tin Tuyển sinh 2024");
  const readMoreButton = Selector(
    ".main .row:first-child .panel-body .btn-primary .uni-paper-plane"
  );
  await t.expect(readMoreButton.exists).ok("Button should exist");
  await t
    .expect(readMoreButton.getAttribute("disabled"))
    .notOk("Button should not be disabled");
  await t.click(readMoreButton);
  await t
    .expect(getURL())
    .eql("https://www.agu.edu.vn/vi/tuyen-sinh/thong-tin-tuyen-sinh-dai-hoc");
});
