import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxInputGroup } from "../../../src/combobox/input-group/combobox.input-group.jsx";
import { useComboboxContext } from "../../../src/combobox/root/combobox.root.context.js";
import { ComboboxRoot } from "../../../src/combobox/root/combobox.root.jsx";

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
      <ComboboxRoot items={fruits} size="lg">
        <ComboboxInputGroup size="sm">
          <Probe />
        </ComboboxInputGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("sm").query()?.textContent).toBe("sm");
  });
});
