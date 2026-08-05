import { describe, expect, test } from "vitest";

import splitRenderProps from "../src/_split-render-props.js";

describe("splitRenderProps", () => {
  test("render props とコンポーネント props に分割する", () => {
    // 準備
    const props = {
      className: "foo",
      style: { color: "red" },
      render: () => null,
      type: "submit",
      onClick: () => {},
    };

    // 実行
    const [renderProps, componentProps] = splitRenderProps(props);

    // 検証
    expect(renderProps).toStrictEqual({
      className: "foo",
      style: { color: "red" },
      render: props.render,
    });
    expect(componentProps).toStrictEqual({
      type: "submit",
      onClick: props.onClick,
    });
  });

  test("render props が未指定でも分割できる", () => {
    // 準備
    const props = {
      type: "button",
      disabled: true,
    };

    // 実行
    const [renderProps, componentProps] = splitRenderProps(props);

    // 検証
    expect(renderProps).toStrictEqual({
      className: undefined,
      style: undefined,
      render: undefined,
    });
    expect(componentProps).toStrictEqual(props);
  });
});
