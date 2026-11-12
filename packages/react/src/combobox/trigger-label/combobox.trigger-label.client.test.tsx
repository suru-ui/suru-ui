import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { FieldRoot } from "../../field/root/field.root.jsx";
import { ComboboxRoot } from "../root/combobox.root.jsx";
import { ComboboxTriggerLabel } from "./combobox.trigger-label.jsx";

const fruits = ["りんご", "ばなな"];
describe("ComboboxTriggerLabel", () => {
  test("ラベルを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
      </ComboboxRoot>,
    );

    // 検証。
    const label = screen.getByText("果物").query();
    expect(label?.textContent).toBe("果物");
  });

  test("無効時は無効状態にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldRoot disabled>
        <ComboboxRoot items={fruits}>
          <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
        </ComboboxRoot>
      </FieldRoot>,
    );

    // 検証。
    expect(
      screen.getByText("果物").query()?.classList.contains("sui_combobox_trigger_label-disabled"),
    ).toBe(true);
  });

  test("有効時は無効状態にしない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxTriggerLabel>果物</ComboboxTriggerLabel>
      </ComboboxRoot>,
    );

    // 検証。
    expect(
      screen.getByText("果物").query()?.classList.contains("sui_combobox_trigger_label-disabled"),
    ).toBe(false);
  });
});
