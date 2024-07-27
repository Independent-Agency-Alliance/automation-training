import { Selector, ClientFunction } from "testcafe";

const getURL = ClientFunction(() => window.location.href);

fixture("ttts2024-agu").page("https://www.agu.edu.vn/vi");

test("should display Thông Tin Tuyển Sinh 2024", async (t) => {
  await t
    .expect(Selector(".main .row:first-child .panel-title").innerText)
    .eql(" Thông tin Tuyển sinh 2024");
  const readMoreButton = Selector(
    ".main .row:first-child .panel-body .btn-primary"
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
