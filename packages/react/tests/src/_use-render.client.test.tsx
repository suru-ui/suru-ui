import * as React from "react";
import { test, expect, describe, expectTypeOf } from "vite-plus/test";
import { render } from "vitest-browser-react";

import useRender from "../../src/_use-render.js";

describe("useRender", () => {
  test("デフォルトのタグで props を展開してレンダリングする", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLSpanElement>({
        props: {
          id: "example",
          children: "テキスト",
        },
        defaultTagName: "span",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.tagName).toBe("SPAN");
    expect(element?.id).toBe("example");
    expect(element?.textContent).toBe("テキスト");
  });

  test("複数の props をマージし一般プロパティーは後のものを優先する", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement>({
        props: [
          {
            id: "first",
            title: "維持",
          },
          {
            id: "second",
          },
        ],
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.id).toBe("second");
    expect(element?.getAttribute("title")).toBe("維持");
  });

  test("複数の props の className を連結する", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement>({
        props: [{ className: "a" }, { className: "b" }],
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    expect(container.firstElementChild?.className).toBe("b a");
  });

  test("複数の props の style をマージし後のものを優先する", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement>({
        props: [
          {
            style: {
              color: "red",
              margin: "4px",
            },
          },
          {
            style: { color: "blue" },
          },
        ],
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const style = (container.firstElementChild as HTMLElement | null)?.style;
    expect(style?.color).toBe("blue");
    expect(style?.margin).toBe("4px");
  });

  test("className 関数に state を渡して解決する", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement, { active: boolean }>({
        props: {
          className: (state) => (state.active ? "is-active" : "is-inactive"),
        },
        state: { active: true },
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    expect(container.firstElementChild?.className).toBe("is-active");
  });

  test("render プロップに React 要素を渡すとその要素でレンダリングする", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLAnchorElement>({
        props: {
          render: <a href="/docs">ドキュメント</a>,
          className: "sui_link",
        },
        defaultTagName: "span",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.tagName).toBe("A");
    expect(element?.getAttribute("href")).toBe("/docs");
    expect(element?.className).toBe("sui_link");
    expect(element?.textContent).toBe("ドキュメント");
  });

  test("render プロップに関数を渡すとその関数でレンダリングする", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLButtonElement>({
        props: {
          render: (renderProps) => <button type="button" {...renderProps} />,
          children: "ボタン",
          className: "sui_button",
        },
        defaultTagName: "span",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.tagName).toBe("BUTTON");
    expect(element?.className).toBe("sui_button");
    expect(element?.textContent).toBe("ボタン");
  });

  test("state から data-* 属性を設定する", async () => {
    // 準備。
    function Example() {
      return useRender<
        HTMLDivElement,
        {
          disabled: boolean;
          orientation: string;
        }
      >({
        props: {},
        state: {
          disabled: true,
          orientation: "horizontal",
        },
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.getAttribute("data-disabled")).toBe("");
    expect(element?.getAttribute("data-orientation")).toBe("horizontal");
  });

  test("stateAttributesMapping で data-* 属性をカスタマイズする", async () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement, { active: boolean }>({
        props: {},
        state: { active: true },
        defaultTagName: "div",
        stateAttributesMapping: {
          active: (value) => ({ "data-is-on": value ? "true" : "false" }),
        },
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;
    expect(element?.getAttribute("data-is-on")).toBe("true");
    expect(element?.getAttribute("data-active")).toBe(null);
  });

  test("enabled を false にすると要素をレンダリングしない", async () => {
    // 準備。
    function Example(props: { enabled: boolean }) {
      return useRender<HTMLDivElement, {}, boolean>({
        props: { children: "コンテンツ" },
        enabled: props.enabled,
        defaultTagName: "div",
      });
    }

    // 実行。
    const { rerender, container } = await render(<Example enabled />);

    // 検証。
    expect(container.firstElementChild?.textContent).toBe("コンテンツ");

    // 実行。
    await rerender(<Example enabled={false} />);

    // 検証。
    expect(container.firstElementChild).toBe(null);
  });

  test("非推奨の ref 引数で要素を参照する", async () => {
    // 準備。
    let captured: HTMLDivElement | null = null;

    function Example() {
      return useRender<HTMLDivElement>({
        ref: (element) => {
          captured = element;
        },
        props: {},
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    expect(captured).toBe(container.firstElementChild);
  });

  test("非推奨の ref 引数に配列を渡すとすべての ref で要素を参照する", async () => {
    // 準備。
    const capturedByRefA: (HTMLDivElement | null)[] = [];
    const capturedByRefB: (HTMLDivElement | null)[] = [];

    function Example() {
      return useRender<HTMLDivElement>({
        ref: [
          (element) => {
            capturedByRefA.push(element);
          },
          (element) => {
            capturedByRefB.push(element);
          },
        ],
        props: {},
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;

    expect(capturedByRefA.length).toBe(1);
    expect(capturedByRefB.length).toBe(1);
    expect(capturedByRefA[0]).toBe(element);
    expect(capturedByRefB[0]).toBe(element);
  });

  test("配列 props の各 ref を要素に設定する", async () => {
    // 準備。
    const capturedByRefA: (HTMLDivElement | null)[] = [];
    const capturedByRefB: (HTMLDivElement | null)[] = [];

    function Example() {
      return useRender<HTMLDivElement>({
        props: [
          {
            ref: (element) => {
              capturedByRefA.push(element);
            },
          },
          {
            ref: (element) => {
              capturedByRefB.push(element);
            },
          },
        ],
        defaultTagName: "div",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    const element = container.firstElementChild;

    expect(capturedByRefA.length).toBe(1);
    expect(capturedByRefB.length).toBe(1);
    expect(capturedByRefA[0]).toBe(element);
    expect(capturedByRefB[0]).toBe(element);
  });

  test("props の ref を render で上書きした要素に設定する", async () => {
    // 準備。
    let captured: HTMLButtonElement | null = null;

    function Example() {
      return useRender<HTMLButtonElement>({
        props: {
          ref: (element) => {
            captured = element;
          },
          // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- ref 転送の検証が目的で内容は不要
          render: <button type="button" />,
        },
        defaultTagName: "span",
      });
    }

    // 実行。
    const { container } = await render(<Example />);

    // 検証。
    expect(captured).toBe(container.firstElementChild);
    expect(container.firstElementChild?.tagName).toBe("BUTTON");
  });
});

describe("useRender の型", () => {
  test("enabled を省略すると React 要素を返す", () => {
    // 準備。
    function Example() {
      return useRender<HTMLDivElement>({
        props: {},
        defaultTagName: "div",
      });
    }

    // 検証。
    expectTypeOf(Example).returns.toEqualTypeOf<React.ReactElement>();
  });

  test("enabled を false にすると null を返す", () => {
    // 準備。
    function Example() {
      return useRender({
        props: {},
        enabled: false,
        defaultTagName: "div",
      });
    }

    // 検証。
    expectTypeOf(Example).returns.toEqualTypeOf<null>();
  });

  test("enabled を boolean にすると React 要素または null を返す", () => {
    // 準備。
    function Example() {
      return useRender({
        props: {},
        enabled: false,
        defaultTagName: "div",
      });
    }

    // 検証。
    expectTypeOf(Example).returns.toMatchTypeOf<React.ReactElement | null>();
  });
});
