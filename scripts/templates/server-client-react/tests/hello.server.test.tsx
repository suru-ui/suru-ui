import { renderToStaticMarkup } from "react-dom/server";
import { test, expect, describe } from "vite-plus/test";

import { Hello } from "../src/Hello.js";

describe("Hello", () => {
  test("名前を含む挨拶を描画する", () => {
    // 実行：
    const html = renderToStaticMarkup(<Hello name="World" />);

    // 検証：
    expect(html).toBe("<p>Hello, World!</p>");
  });
});
