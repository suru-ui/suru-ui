import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxCollection } from "../../../src/combobox/collection/combobox.collection.jsx";
import { Combobox } from "../../../src/combobox/combobox.jsx";
import { ComboboxGroup } from "../../../src/combobox/group/combobox.group.jsx";
import { useComboboxContext } from "../../../src/combobox/root/combobox.root.context.js";
import { ComboboxRoot } from "../../../src/combobox/root/combobox.root.jsx";

const fruits = ["りんご", "ばなな"];
const grouped = [
  { label: "果物", items: ["りんご", "ばなな"] },
  { label: "野菜", items: ["にんじん"] },
];

describe("ComboboxGroup", () => {
  test("グループを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Combobox items={grouped} defaultOpen />);

    // 検証
    expect(screen.getByRole("group", { name: "果物" }).query()).not.toBe(null);
    expect(screen.getByRole("group", { name: "野菜" }).query()).not.toBe(null);
  });

  test("グループの項目だけを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxGroup items={["みかん"]}>
          <ComboboxCollection />
        </ComboboxGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("みかん").query()).not.toBe(null);
    expect(screen.getByText("りんご").query()).toBe(null);
  });

  test("項目なしでは上位の項目を子孫コンテキストへ透過しない", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{ctx.items === undefined ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxGroup>
          <Probe />
        </ComboboxGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("項目ありではグループの項目を子孫コンテキストへ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxContext();
      return <span>{ctx.items?.join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits}>
        <ComboboxGroup items={["みかん"]}>
          <Probe />
        </ComboboxGroup>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("みかん").query()?.textContent).toBe("みかん");
  });
});
