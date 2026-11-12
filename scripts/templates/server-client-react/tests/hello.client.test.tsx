import { test, expect, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Hello } from "../src/Hello.js";

describe("Hello", () => {
  test("名前を含む挨拶を表示する", async () => {
    // 準備：
    const screen = await render(<Hello name="World" />);

    // 実行（ロケーターの解決を待機）：
    const element = await screen.getByText("Hello, World!").findElement();

    // 検証：
    expect(element.textContent).toBe("Hello, World!");
  });
});
