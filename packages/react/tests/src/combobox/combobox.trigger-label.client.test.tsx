import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxRoot } from "../../../src/combobox/combobox.root.jsx";
import { ComboboxTriggerLabel } from "../../../src/combobox/combobox.trigger-label.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxTriggerLabel", () => {
  test("ラベルを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
      </ComboboxRoot>,
    );

    // 検証
    const label = screen.getByText("果物").query();
    expect(label?.textContent).toBe("果物");
  });

  test("無効時は無効状態にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldRoot disabled>
        <ComboboxRoot items={fruits}>
          <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
        </ComboboxRoot>
      </FieldRoot>,
    );

    // 検証
    expect(
      screen.getByText("果物").query()?.classList.contains("sui_combobox_trigger_label-disabled"),
    ).toBe(true);
  });

  test("有効時は無効状態にしない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
      </ComboboxRoot>,
    );

    // 検証
    expect(
      screen.getByText("果物").query()?.classList.contains("sui_combobox_trigger_label-disabled"),
    ).toBe(false);
  });
});
