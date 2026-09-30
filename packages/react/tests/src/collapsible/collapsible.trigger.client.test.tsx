import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CollapsibleRoot } from "../../../src/collapsible/collapsible.root.jsx";
import {
  type CollapsibleTriggerProps,
  CollapsibleTrigger,
} from "../../../src/collapsible/collapsible.trigger.jsx";
import "../_locators.js";

function renderTrigger(label = "開閉"): CollapsibleTriggerProps["children"] {
  return (props) => (
    <button type="button" {...props}>
      {label}
    </button>
  );
}

describe("CollapsibleTrigger", () => {
  test("描画関数で内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
      </CollapsibleRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開閉" }).element();
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.classList.contains("sui_collapsible_trigger")).toBe(true);
  });

  test("描画関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot size="lg" defaultOpen>
        <CollapsibleTrigger>
          {(props, state) => (
            <button type="button" {...props} data-probe={`${state.size}/${String(state.open)}`} />
          )}
        </CollapsibleTrigger>
      </CollapsibleRoot>,
    );

    // 検証
    const trigger = screen.getByClassName("sui_collapsible_trigger").element();
    expect(trigger.getAttribute("data-probe")).toBe("lg/true");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot>
        <CollapsibleTrigger className="custom">{renderTrigger()}</CollapsibleTrigger>
      </CollapsibleRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開閉" }).element();
    expect(trigger.classList.contains("custom")).toBe(true);
    expect(trigger.classList.contains("sui_collapsible_trigger")).toBe(true);
  });
});
