import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import Config from "../../_config.jsx";
import "../label.parts.js";
import { LabelRoot } from "./label.root.jsx";
import "../../../tests/src/_locators.js";

/**
 * LabelRoot に設定コンテクストの値を与えるプロバイダーです。
 * 既定値の引き継ぎと上書きの検証に使用します。
 */
function Provider(props: {
  children: React.ReactNode;
  color?: string;
  disabled?: boolean;
  size?: string;
}) {
  const config = React.use(Config);

  return (
    <config.Context size={props.size} color={props.color} disabled={props.disabled}>
      {props.children}
    </config.Context>
  );
}

describe("LabelRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot />);

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("sui_label")).toBe(true);
    expect(root.classList.contains("sui_label-size_md")).toBe(true);
    expect(root.classList.contains("sui_label-color_grey")).toBe(true);
  });

  test("label を既定の要素にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot />);

    // 検証
    expect(screen.getByClassName("sui_label").element().tagName).toBe("LABEL");
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <LabelRoot size="sm" />
        <LabelRoot size="md" />
        <LabelRoot size="lg" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_label-size_sm").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-size_md").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-size_lg").query()).not.toBe(null);
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <LabelRoot color="blue" />
        <LabelRoot color="purple" />
        <LabelRoot color="magenta" />
        <LabelRoot color="red" />
        <LabelRoot color="orange" />
        <LabelRoot color="yellow" />
        <LabelRoot color="green" />
      </>,
    );

    // 検証
    expect(screen.getByClassName("sui_label-color_blue").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_purple").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_magenta").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_red").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_orange").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_yellow").query()).not.toBe(null);
    expect(screen.getByClassName("sui_label-color_green").query()).not.toBe(null);
  });

  test("無効状態のクラスを付け、aria-disabled は付けない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot disabled />);

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("sui_label-disabled")).toBe(true);
    expect(root.getAttribute("aria-disabled")).toBe(null);
  });

  test("有効なときは無効状態のクラスを付けない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot />);

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("sui_label-disabled")).toBe(false);
  });

  test("無効状態でも子要素のコントロールを無効にしない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <LabelRoot disabled>
        名前
        <input />
      </LabelRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element() as HTMLInputElement;
    expect(input.disabled).toBe(false);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot />);

    // 検証
    expect(screen.getByClassName("sui_label").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_label")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<LabelRoot render={<span />} />);

    // 検証
    expect(screen.getByClassName("sui_label").element().tagName).toBe("SPAN");
  });

  test("子要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <LabelRoot>
        <span>名前</span>
      </LabelRoot>,
    );

    // 検証
    expect(screen.getByText("名前").query()).not.toBe(null);
  });

  test("設定コンテクストの値を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    // Config は一旦剥がされているため、Provider の値は無視して既定値になる。
    const screen = await render(
      <Provider size="lg" color="red" disabled>
        <LabelRoot>名前</LabelRoot>
      </Provider>,
    );

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("sui_label-size_md")).toBe(true);
    expect(root.classList.contains("sui_label-color_grey")).toBe(true);
    expect(root.classList.contains("sui_label-disabled")).toBe(false);
  });

  test("指定した props は設定コンテクストより優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Provider size="lg" color="red" disabled>
        <LabelRoot size="sm" color="blue" disabled={false}>
          名前
        </LabelRoot>
      </Provider>,
    );

    // 検証
    const root = screen.getByClassName("sui_label").element();
    expect(root.classList.contains("sui_label-size_sm")).toBe(true);
    expect(root.classList.contains("sui_label-color_blue")).toBe(true);
    expect(root.classList.contains("sui_label-disabled")).toBe(false);
    expect(root.getAttribute("aria-disabled")).toBe(null);
  });
});
