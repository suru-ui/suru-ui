import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { useComboboxContext } from "../root/combobox.root.context.js";
import { ComboboxRoot } from "../root/combobox.root.jsx";
import { ComboboxInputGroup } from "./combobox.input-group.jsx";

const fruits = ["りんご", "ばなな"];

describe("ComboboxInputGroup", () => {
  test("指定した値を子孫へ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{ctx.size}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot size="lg" items={fruits}>
        <ComboboxInputGroup size="sm">
          <Probe />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });
});
