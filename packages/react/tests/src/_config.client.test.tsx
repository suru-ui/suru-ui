import * as React from "react";
import { describe, expect, expectTypeOf, test } from "vitest";
import { render } from "vitest-browser-react";

import Config from "../../src/_config.jsx";

/**
 * 値が文字列かどうかを判定する型ガードです。
 * `get` に渡すガードの代表として使用します。
 */
function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * 値が数値かどうかを判定する型ガードです。
 * `Object.is` による比較の検証に使用します。
 */
function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

describe("get", () => {
  test("未登録のキーは undefined を返す", async () => {
    // 準備
    let received: unknown = "unset";
    function Probe() {
      received = React.use(Config).get("missing");
      return null;
    }

    // 実行
    await render(<Probe />);

    // 検証
    expect(received).toBe(undefined);
  });

  test("格納した値をそのまま返す", async () => {
    // 準備
    let received: unknown = "unset";
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo="bar">{props.children}</root.Context>;
    }
    function Probe() {
      received = React.use(Config).get("foo");
      return null;
    }

    // 実行
    await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(received).toBe("bar");
  });

  test("型ガードを満たす値を返す", async () => {
    // 準備
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo="bar">{props.children}</root.Context>;
    }
    function Probe() {
      return <span>{React.use(Config).get("foo", isString)}</span>;
    }

    // 実行
    const { container } = await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(container.textContent).toBe("bar");
  });

  test("型ガードを満たさない場合は null を返す", async () => {
    // 準備
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo={42}>{props.children}</root.Context>;
    }
    function Probe() {
      return <span>{React.use(Config).get("foo", isString)}</span>;
    }

    // 実行
    const { container } = await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(container.textContent).toBe("");
  });

  test("既定値を渡すと型ガードを満たさない場合に既定値を返す", async () => {
    // 準備
    let received: unknown = "unset";
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo={42}>{props.children}</root.Context>;
    }
    function Probe() {
      received = React.use(Config).get("foo", isString, "fallback");
      return null;
    }

    // 実行
    await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(received).toBe("fallback");
  });

  test("型ガードを満たす場合は既定値より格納値を優先する", async () => {
    // 準備
    let received: unknown = "unset";
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo="bar">{props.children}</root.Context>;
    }
    function Probe() {
      received = React.use(Config).get("foo", isString, "fallback");
      return null;
    }

    // 実行
    await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(received).toBe("bar");
  });
});

describe("Context", () => {
  test("入れ子の提供は親の値を引き継ぎ変更分のみ上書きする", async () => {
    // 準備
    function Outer(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return (
        <root.Context bar="outer" foo="foo">
          {props.children}
        </root.Context>
      );
    }
    function Inner(props: { children: React.ReactNode }) {
      const parent = React.use(Config);
      return (
        <parent.Context bar="inner" baz="baz">
          {props.children}
        </parent.Context>
      );
    }
    function Probe() {
      const config = React.use(Config);
      const values = [
        config.get("foo", isString),
        config.get("bar", isString),
        config.get("baz", isString),
      ];
      return <span>{values.join(",")}</span>;
    }

    // 実行
    const { container } = await render(
      <Outer>
        <Inner>
          <Probe />
        </Inner>
      </Outer>,
    );

    // 検証
    expect(container.textContent).toBe("foo,inner,baz");
  });

  test("children は設定に格納しない", async () => {
    // 準備
    let received: unknown = "unset";
    function Provider(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo="bar">{props.children}</root.Context>;
    }
    function Probe() {
      received = React.use(Config).get("children", isString, "fallback");
      return null;
    }

    // 実行
    await render(
      <Provider>
        <Probe />
      </Provider>,
    );

    // 検証
    expect(received).toBe("fallback");
  });

  test("変更した値は再レンダーで子孫に伝わる", async () => {
    // 準備
    function Provider(props: { children: React.ReactNode; value: string }) {
      const root = React.use(Config);
      return <root.Context foo={props.value}>{props.children}</root.Context>;
    }
    function Probe() {
      return <span>{React.use(Config).get("foo", isString)}</span>;
    }

    // 実行
    const { container, rerender } = await render(
      <Provider value="before">
        <Probe />
      </Provider>,
    );

    // 検証
    expect(container.textContent).toBe("before");

    // 実行
    await rerender(
      <Provider value="after">
        <Probe />
      </Provider>,
    );

    // 検証
    expect(container.textContent).toBe("after");
  });

  test("変更のない入れ子は親の設定を使い回す", async () => {
    // 準備
    const seen: unknown[] = [];
    function Outer(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context foo="same">{props.children}</root.Context>;
    }
    function Inner(props: { children: React.ReactNode }) {
      const parent = React.use(Config);
      return <parent.Context foo="same">{props.children}</parent.Context>;
    }
    function Capture() {
      seen.push(React.use(Config));
      return null;
    }

    // 実行
    await render(
      <Outer>
        <Capture />
        <Inner>
          <Capture />
        </Inner>
      </Outer>,
    );

    // 検証
    expect(seen.length).toBeGreaterThanOrEqual(2);
    for (const config of seen) {
      expect(config).toBe(seen[0]);
    }
  });

  test("NaN の再提供は値の変更とみなさない", async () => {
    // 準備
    const seen: unknown[] = [];
    function Outer(props: { children: React.ReactNode }) {
      const root = React.use(Config);
      return <root.Context value={Number.NaN}>{props.children}</root.Context>;
    }
    function Inner(props: { children: React.ReactNode }) {
      const parent = React.use(Config);
      return <parent.Context value={Number.NaN}>{props.children}</parent.Context>;
    }
    function Capture() {
      seen.push(React.use(Config));
      return null;
    }
    function Probe() {
      return <span>{String(React.use(Config).get("value", isNumber))}</span>;
    }

    // 実行
    const { container } = await render(
      <Outer>
        <Capture />
        <Inner>
          <Capture />
          <Probe />
        </Inner>
      </Outer>,
    );

    // 検証
    expect(container.textContent).toBe("NaN");
    expect(seen.length).toBeGreaterThanOrEqual(1);
    for (const config of seen) {
      expect(config).toBe(seen[0]);
    }
  });
});

describe("get の型", () => {
  test("キーだけでは unknown を返す", () => {
    // 準備
    function Probe() {
      const config = React.use(Config);
      expectTypeOf(config.get("foo")).toEqualTypeOf<unknown>();
      return null;
    }

    // 検証
    expectTypeOf(Probe).returns.toEqualTypeOf<null>();
  });

  test("型ガードでは値または null を返す", () => {
    // 準備
    function Probe() {
      const config = React.use(Config);
      expectTypeOf(config.get("foo", isString)).toEqualTypeOf<string | null>();
      return null;
    }

    // 検証
    expectTypeOf(Probe).returns.toEqualTypeOf<null>();
  });

  test("既定値では値または既定値を返す", () => {
    // 準備
    function Probe() {
      const config = React.use(Config);
      expectTypeOf(config.get("foo", isString, "fallback")).toEqualTypeOf<string>();
      return null;
    }

    // 検証
    expectTypeOf(Probe).returns.toEqualTypeOf<null>();
  });
});
