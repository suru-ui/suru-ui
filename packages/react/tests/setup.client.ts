import { afterEach } from "vitest";
import { userEvent } from "vitest/browser";

// Playwright のマウス位置はテストファイルや iframe をまたいで共有されるため、hover したまま終了したテストのポインターが次のテストの要素へ :hover を当て、computed style の期待値を壊します。テストごとにポインターを body へ退避させます。
afterEach(async () => {
  await userEvent.unhover(document.body);
});
