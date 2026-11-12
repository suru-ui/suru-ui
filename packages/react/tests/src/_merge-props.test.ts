import * as React from "react";
import { test, expect, describe } from "vite-plus/test";

import mergeProps from "../../src/_merge-props.js";
import type { RenderProps } from "../../src/_use-render.js";

type TestProps = {
  id?: string | undefined;
  title?: string | undefined;
} & RenderProps<Record<string, unknown>>;

/**
 * render 用プロパティーを含む props を受け付ける検証用の要素型です。
 * mergeProps の型引数として使用します。
 */
function TestElement(_props: TestProps): React.ReactElement | null {
  return null;
}

describe("mergeProps", () => {
  test("一般プロパティーは後のものを優先する", () => {
    // 準備。
    const first = {
      id: "first",
      title: "維持",
    };
    const second = { id: "second" };

    // 実行。
    const merged = mergeProps<typeof TestElement>([first, second]);

    // 検証。
    expect(merged).toStrictEqual({
      id: "second",
      title: "維持",
    });
  });

  test("文字列の className を連結する", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([{ className: "a" }, { className: "b" }]);

    // 検証。
    expect(merged.className).toBe("b a");
  });

  test("style オブジェクトをマージし後のものを優先する", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      {
        style: {
          color: "red",
          margin: "4px",
        },
      },
      { style: { color: "blue" } },
    ]);

    // 検証。
    expect(merged.style).toStrictEqual({
      color: "blue",
      margin: "4px",
    });
  });

  test("render は後のものを優先する", () => {
    // 準備。
    const first = React.createElement("a");
    const second = React.createElement("button");

    // 実行。
    const merged = mergeProps<typeof TestElement>([{ render: first }, { render: second }]);

    // 検証。
    expect(merged.render).toBe(second);
  });

  test("未定義の render 用プロパティーは結果に設定しない", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      {
        id: "first",
        style: undefined,
        className: undefined,
      },
      {
        title: "維持",
        render: undefined,
      },
    ]);

    // 検証。
    expect("className" in merged).toBe(false);
    expect("style" in merged).toBe(false);
    expect("render" in merged).toBe(false);
    expect(merged).toStrictEqual({
      id: "first",
      title: "維持",
    });
  });

  test("文字列と関数の className を解決して連結する", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      { className: "a" },
      { className: (current: Record<string, unknown>) => (current["active"] === true ? "b" : "c") },
    ]);

    // 検証。
    expect(typeof merged.className).toBe("function");

    const resolve = merged.className as (current: Record<string, unknown>) => string | undefined;
    expect(resolve({ active: true })).toBe("b a");
    expect(resolve({ active: false })).toBe("c a");
  });

  test("オブジェクトと関数の style を解決してマージする", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      { style: { color: "red" } },
      {
        style: () => ({
          color: "blue",
          margin: "4px",
        }),
      },
    ]);

    // 検証。
    expect(typeof merged.style).toBe("function");

    const resolve = merged.style as (
      current: Record<string, unknown>,
    ) => React.CSSProperties | undefined;
    expect(resolve({})).toStrictEqual({
      color: "blue",
      margin: "4px",
    });
  });

  test("関数 props の className も連結する", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      {
        id: "first",
        className: "a",
      },
      (previous) => ({
        ...previous,
        className: "b",
      }),
    ]);

    // 検証。
    expect(merged.className).toBe("b a");
    expect(merged.id).toBe("first");
  });

  test("関数 props の render も反映する", () => {
    // 準備。
    const element = React.createElement("a");

    // 実行。
    const merged = mergeProps<typeof TestElement>([
      { id: "first" },
      (previous) => ({
        ...previous,
        render: element,
      }),
    ]);

    // 検証。
    expect(merged.render).toBe(element);
    expect(merged.id).toBe("first");
  });

  test("undefined の要素を無視する", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      undefined,
      { className: "a" },
      undefined,
      { className: "b" },
    ]);

    // 検証。
    expect(merged.className).toBe("b a");
  });

  test("空の配列では空のオブジェクトを返す", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([]);

    // 検証。
    expect(merged).toStrictEqual({});
  });

  test("要素が1つの場合は入力をそのまま返す", () => {
    // 準備と実行。
    const merged = mergeProps<typeof TestElement>([
      {
        id: "first",
        className: "a",
      },
    ]);

    // 検証。
    expect(merged).toStrictEqual({
      id: "first",
      className: "a",
    });
  });
});
