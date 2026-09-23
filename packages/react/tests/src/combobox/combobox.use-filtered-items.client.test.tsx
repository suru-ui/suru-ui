import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxRoot } from "../../../src/combobox/combobox.root.jsx";
import { useComboboxFilteredItems } from "../../../src/combobox/combobox.use-filtered-items.js";

const fruits = ["りんご", "ばなな"];

describe("useComboboxFilteredItems", () => {
  test("絞り込み後の項目一覧を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const items = useComboboxFilteredItems<string>();
      return <span>{items.join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <Probe />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("りんご,ばなな").query()?.textContent).toBe("りんご,ばなな");
  });
});
