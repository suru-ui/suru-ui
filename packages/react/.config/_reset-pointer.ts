import { beforeEach } from "vite-plus/test";
import { userEvent } from "vite-plus/test/browser";

// oxlint-disable-next-line vitest/require-top-level-describe
beforeEach(async () => {
  // 直前のテストで残ったポインターが :hover の配色を当てないよう、毎回 body へ退避します。
  await userEvent.unhover(document.body);
});
