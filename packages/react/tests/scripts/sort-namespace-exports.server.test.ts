import { describe, expect, it } from "vitest";

import { sortNamespaceExports } from "../../scripts/sort-namespace-exports.js";

describe("sortNamespaceExports", () => {
  it("State、Props を先頭に並べ替える", () => {
    const source = [
      "export namespace Root {",
      "  export type Props = RootProps;",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("Context、SlotProps は State、Props の後に並べる", () => {
    const source = [
      "export namespace Root {",
      "  export type SlotProps = RootSlotProps;",
      "  export type Context = RootContext;",
      "  export type Props = RootProps;",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export type SlotProps = RootSlotProps;",
      "  export type Context = RootContext;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("固定名以外の型は名前順に並べ替える", () => {
    const source = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export type Size = RootSize;",
      "  export type Color = RootColor;",
      "  export type Variant = RootVariant;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export type Color = RootColor;",
      "  export type Size = RootSize;",
      "  export type Variant = RootVariant;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("「I + 大文字」で始まるインターフェースは先頭の「I」を除いた名前順に並べ替える", () => {
    const source = [
      "export namespace Root {",
      "  export interface IVariant {",
      "    variant: string;",
      "  }",
      "  export type Size = RootSize;",
      "  export interface IColor {",
      "    color: string;",
      "  }",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export interface IColor {",
      "    color: string;",
      "  }",
      "  export type Size = RootSize;",
      "  export interface IVariant {",
      "    variant: string;",
      "  }",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("ネストした名前空間は末尾に名前順で並べ替える", () => {
    const source = [
      "export namespace Root {",
      "  export namespace Panel {",
      "    export type Size = PanelSize;",
      "    export type Props = PanelProps;",
      "    export type State = PanelState;",
      "  }",
      "  export namespace Handle {",
      "    export type Props = HandleProps;",
      "    export type State = HandleState;",
      "  }",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export namespace Handle {",
      "    export type State = HandleState;",
      "    export type Props = HandleProps;",
      "  }",
      "  export namespace Panel {",
      "    export type State = PanelState;",
      "    export type Props = PanelProps;",
      "    export type Size = PanelSize;",
      "  }",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("固定名で同名の型と名前空間がある場合は名前空間を型の直後に置く", () => {
    const source = [
      "export namespace Root {",
      "  export namespace Props {",
      "    export type Render = RootProps.Render;",
      "    export type HTML = RootProps.HTML;",
      "  }",
      "  export type Color = RootColor;",
      "  export type Props = RootProps;",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export namespace Props {",
      "    export type Render = RootProps.Render;",
      "    export type HTML = RootProps.HTML;",
      "  }",
      "  export type Color = RootColor;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("固定名以外の同名ペアは名前空間を末尾に置く", () => {
    const source = [
      "export namespace Root {",
      "  export namespace Panel {",
      "    export type Props = PanelProps;",
      "  }",
      "  export type Panel = PanelProps;",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Panel = PanelProps;",
      "  export namespace Panel {",
      "    export type Props = PanelProps;",
      "  }",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("コメントはメンバーと一緒に移動する", () => {
    const source = [
      "export namespace Root {",
      "  /**",
      "   * {@link RootProps} です。",
      "   */",
      "  export type Props = RootProps;",
      "  /**",
      "   * {@link RootState} です。",
      "   */",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  /**",
      "   * {@link RootState} です。",
      "   */",
      "  export type State = RootState;",
      "  /**",
      "   * {@link RootProps} です。",
      "   */",
      "  export type Props = RootProps;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(expected);
  });

  it("既に並べ替え済みなら変更しない", () => {
    const source = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "}",
      "",
    ].join("\n");
    expect(sortNamespaceExports(source)).toBe(source);
  });

  it("メンバーが 1 つだけなら変更しない", () => {
    const source = ["export namespace Root {", "  export type State = RootState;", "}", ""].join(
      "\n",
    );
    expect(sortNamespaceExports(source)).toBe(source);
  });

  it("名前空間以外の型は対象外", () => {
    const source = ["type Props = RootProps;", "type State = RootState;", ""].join("\n");
    expect(sortNamespaceExports(source)).toBe(source);
  });

  it("指定した名前空間では固有の固定名を名前順より先に並べる", () => {
    const source = [
      "export namespace Props {",
      "  export type SuruUI = RootProps.SuruUI;",
      "  export type HTML = RootProps.HTML;",
      "  export type Render = RootProps.Render;",
      "  export type BaseUI = RootProps.BaseUI;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Props {",
      "  export type Render = RootProps.Render;",
      "  export type SuruUI = RootProps.SuruUI;",
      "  export type BaseUI = RootProps.BaseUI;",
      "  export type HTML = RootProps.HTML;",
      "}",
      "",
    ].join("\n");
    expect(
      sortNamespaceExports(source, {
        namespaceFixedOrders: [{ namespace: "Props", names: ["Render", "SuruUI"] }],
      }),
    ).toBe(expected);
  });

  it("指定に一致しない名前空間には固有の固定名を適用しない", () => {
    const source = [
      "export namespace Root {",
      "  export type SuruUI = RootSuruUI;",
      "  export type Render = RootRender;",
      "  export type Props = RootProps;",
      "  export type State = RootState;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Root {",
      "  export type State = RootState;",
      "  export type Props = RootProps;",
      "  export type Render = RootRender;",
      "  export type SuruUI = RootSuruUI;",
      "}",
      "",
    ].join("\n");
    expect(
      sortNamespaceExports(source, {
        namespaceFixedOrders: [{ namespace: "Props", names: ["Render", "SuruUI"] }],
      }),
    ).toBe(expected);
  });

  it("名前空間の指定に正規表現を使える", () => {
    const source = [
      "export namespace ListProps {",
      "  export type Size = ListSize;",
      "  export type Render = ListRender;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace ListProps {",
      "  export type Render = ListRender;",
      "  export type Size = ListSize;",
      "}",
      "",
    ].join("\n");
    expect(
      sortNamespaceExports(source, {
        namespaceFixedOrders: [{ namespace: /Props$/, names: ["Render"] }],
      }),
    ).toBe(expected);
  });

  it("固有の固定名の後に全体の固定名を並べる", () => {
    const source = [
      "export namespace Props {",
      "  export type BaseUI = RootProps.BaseUI;",
      "  export type State = RootState;",
      "  export type SuruUI = RootProps.SuruUI;",
      "}",
      "",
    ].join("\n");
    const expected = [
      "export namespace Props {",
      "  export type SuruUI = RootProps.SuruUI;",
      "  export type State = RootState;",
      "  export type BaseUI = RootProps.BaseUI;",
      "}",
      "",
    ].join("\n");
    expect(
      sortNamespaceExports(source, {
        namespaceFixedOrders: [{ namespace: "Props", names: ["SuruUI"] }],
      }),
    ).toBe(expected);
  });
});
