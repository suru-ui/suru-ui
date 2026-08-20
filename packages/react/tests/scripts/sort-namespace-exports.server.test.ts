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
      "  export type Context = RootContext;",
      "  export type SlotProps = RootSlotProps;",
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
});
