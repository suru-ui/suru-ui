import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/aspect-ratio/aspect-ratio.parts.js";
import { AspectRatioRoot } from "../../../src/aspect-ratio/aspect-ratio.root.jsx";
import "../_locators.js";

describe("AspectRatioRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot />);

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.classList.contains("sui_aspect_ratio")).toBe(true);
    expect(root.classList.contains("sui_aspect_ratio-radius_none")).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AspectRatioRoot radius="sm" />
        <AspectRatioRoot radius="md" />
        <AspectRatioRoot radius="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_aspect_ratio-radius_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_aspect_ratio-radius_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_aspect_ratio-radius_lg").query()).not.toBe(null);
  });

  test("比率の既定値は 1 にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot />);

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("1");
  });

  test("比率を CSS 変数へ設定する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <AspectRatioRoot id="number" ratio={1.5} />
        <AspectRatioRoot id="string" ratio="16 / 9" />
      </>,
    );

    // 検証
    const number = screen.container.querySelector<HTMLElement>("#number");
    const string = screen.container.querySelector<HTMLElement>("#string");
    expect(number?.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("1.5");
    expect(string?.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("16 / 9");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_aspect_ratio")).toBe(true);
  });

  test("利用者の style を比率の変数と併用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot style={{ marginTop: "10px" }} />);

    // 検証
    const root = screen.getByClassName("sui_aspect_ratio").element();
    expect(root.style.marginTop).toBe("10px");
    expect(root.style.getPropertyValue("--sui_aspect_ratio-ratio")).toBe("1");
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_aspect_ratio").element().tagName).toBe("SECTION");
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<AspectRatioRoot />);

    // 検証
    expect(screen.getByClassName("sui_aspect_ratio").element().getAttribute("data-scope")).toBe("");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AspectRatioRoot>
        <span>内容</span>
      </AspectRatioRoot>,
    );

    // 検証
    expect(screen.getByText("内容").query()).not.toBe(null);
  });
});
