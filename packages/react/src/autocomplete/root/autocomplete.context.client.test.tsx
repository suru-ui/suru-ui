import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../errors.js";
import { AutocompleteContext, useAutocompleteContext } from "./autocomplete.root.context.js";
import { AutocompleteRoot } from "./autocomplete.root.jsx";

const fruits = ["りんご", "ばなな"];

describe("useAutocompleteContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      size: "lg",
      color: "blue",
      items: fruits,
      radius: "sm",
      variant: "naked",
      outlined: true,
    } as const;
    function Probe() {
      const ctx = useAutocompleteContext();

      return (
        <span>{`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.variant}/${String(ctx.outlined)}`}</span>
      );
    }

    // 実行
    const screen = await render(
      <AutocompleteContext value={provided}>
        <Probe />
      </AutocompleteContext>,
    );

    // 検証
    expect(screen.getByText("lg/blue/sm/naked/true").query()?.textContent).toBe(
      "lg/blue/sm/naked/true",
    );
  });

  test("ルートの状態を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAutocompleteContext();

      return (
        <span>{`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.variant}/${String(ctx.outlined)}`}</span>
      );
    }

    // 実行
    const screen = await render(
      <AutocompleteRoot size="lg" color="blue" items={fruits} radius="none" variant="naked">
        <Probe />
      </AutocompleteRoot>,
    );

    // 検証
    expect(screen.getByText("lg/blue/none/naked/false").query()?.textContent).toBe(
      "lg/blue/none/naked/false",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useAutocompleteContext();

      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useAutocompleteContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });
});
