import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxCollection } from "../collection/combobox.collection.jsx";
import { Combobox } from "../combobox.jsx";
import { ComboboxList } from "../list/combobox.list.jsx";
import { ComboboxPopup } from "../popup/combobox.popup.jsx";
import { ComboboxPortal } from "../portal/combobox.portal.jsx";
import { ComboboxPositioner } from "../positioner/combobox.positioner.jsx";
import { ComboboxRoot } from "../root/combobox.root.jsx";
import { useComboboxGroupContext } from "./combobox.group.context.js";
import { ComboboxGroup } from "./combobox.group.jsx";

const fruits = ["りんご", "ばなな"];
const grouped = [
  { items: ["りんご", "ばなな"], label: "果物" },
  { items: ["にんじん"], label: "野菜" },
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
      <ComboboxRoot items={fruits} defaultOpen>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup items={["みかん"]}>
                  <ComboboxCollection />
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("みかん").query()).not.toBe(null);
    expect(screen.getByText("りんご").query()).toBe(null);
  });

  test("項目なしでは上位の項目を子孫コンテキストへ透過しない", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxGroupContext();
      return <span>{ctx.items === undefined ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} defaultOpen>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup>
                  <Probe />
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("項目ありではグループの項目を子孫コンテキストへ伝える", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useComboboxGroupContext();
      return <span>{ctx.items?.join(",")}</span>;
    }

    // 実行
    const screen = await render(
      <ComboboxRoot items={fruits} defaultOpen>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList>
                <ComboboxGroup items={["みかん"]}>
                  <Probe />
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByText("みかん").query()?.textContent).toBe("みかん");
  });
});
