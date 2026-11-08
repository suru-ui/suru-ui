import { beforeEach } from "vitest";
import { userEvent } from "vitest/browser";

beforeEach(async () => {
  // 直前のテストで残ったポインターが :hover の配色を当てないよう、毎回 body へ退避します。
  await userEvent.unhover(document.body);
});
