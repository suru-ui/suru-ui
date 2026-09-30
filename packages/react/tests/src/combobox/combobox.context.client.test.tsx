import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { defaultItemToStringLabel } from "../../../src/_item.js";
import { ComboboxContext, useComboboxContext } from "../../../src/combobox/combobox.context.js";
import { ComboboxPopup } from "../../../src/combobox/combobox.popup.jsx";
import { ComboboxPortal } from "../../../src/combobox/combobox.portal.jsx";
import { ComboboxPositioner } from "../../../src/combobox/combobox.positioner.jsx";
import { ComboboxRoot } from "../../../src/combobox/combobox.root.jsx";
import { ContextMissingError } from "../../../src/errors.js";

const fruits = ["りんご", "ばなな"];

describe("useComboboxContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return (
        <span>
          {[ctx.size, ctx.color, ctx.variant, String(ctx.multiple), String(ctx.outlined)].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" color="blue" variant="naked" multiple outlined>
        <Probe />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg,blue,naked,true,true").query()?.textContent).toBe(
      "lg,blue,naked,true,true",
    );
  });

  test("既定値を補完する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return (
        <span>
          {[
            ctx.size,
            ctx.color,
            ctx.radius,
            ctx.variant,
            String(ctx.multiple),
            String(ctx.outlined),
            ctx.itemToStringLabel === defaultItemToStringLabel ? "既定" : "置換",
          ].join(",")}
        </span>
      );
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg">
        <Probe />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("lg,grey,lg,liquid,false,false,既定").query()?.textContent).toBe(
      "lg,grey,lg,liquid,false,false,既定",
    );
  });

  test("角丸の指定を優先する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{ctx.radius}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" radius="full">
        <Probe />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("full").query()?.textContent).toBe("full");
  });

  test("ポップアップの派生した値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{String(ctx.outlined)}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} outlined open>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup outlined={false}>
              <Probe />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("false").query()?.textContent).toBe("false");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useComboboxContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext(true);
      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      size: "sm",
      color: "red",
      items: fruits,
      itemToStringLabel: defaultItemToStringLabel,
      multiple: false,
      outlined: false,
      radius: "sm",
      variant: "liquid",
    } as const;
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxContext value={provided}>
        <Probe />
      </ComboboxContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
