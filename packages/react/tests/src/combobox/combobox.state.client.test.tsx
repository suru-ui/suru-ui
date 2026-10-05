import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ComboboxChip } from "../../../src/combobox/chip/combobox.chip.jsx";
import { ComboboxChips } from "../../../src/combobox/chips/combobox.chips.jsx";
import { ComboboxInputGroup } from "../../../src/combobox/input-group/combobox.input-group.jsx";
import { ComboboxItem } from "../../../src/combobox/item/combobox.item.jsx";
import { ComboboxList } from "../../../src/combobox/list/combobox.list.jsx";
import { ComboboxPopup } from "../../../src/combobox/popup/combobox.popup.jsx";
import { ComboboxPortal } from "../../../src/combobox/portal/combobox.portal.jsx";
import { ComboboxPositioner } from "../../../src/combobox/positioner/combobox.positioner.jsx";
import { ComboboxRoot } from "../../../src/combobox/root/combobox.root.jsx";
import "../_locators.js";

const fruits = ["りんご", "ばなな"];

describe("Combobox の状態", () => {
  test("入力グループの render へスタイル情報と入力グループの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot
        items={fruits}
        size="lg"
        color="blue"
        radius="none"
        variant="naked"
        outlined
        open
      >
        <ComboboxInputGroup
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(state.outlined)}/${String(state.open)}`}
            />
          )}
        />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox").element().getAttribute("data-probe")).toBe(
      "lg/blue/none/naked/true/true",
    );
  });

  test("入力グループの修飾をルートより優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" radius="none" variant="naked">
        <ComboboxInputGroup
          size="sm"
          color="red"
          radius="full"
          variant="liquid"
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}`}
            />
          )}
        />
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox").element().getAttribute("data-probe")).toBe(
      "sm/red/full/liquid",
    );
  });

  test("ポップアップの render へスタイル情報とポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" color="blue" outlined open>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.color}/${String(state.outlined)}/${String(state.open)}`}
                />
              )}
            />
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox_popup").element().getAttribute("data-probe")).toBe(
      "lg/blue/true/true",
    );
  });

  test("ポータルの render へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" radius="full" defaultOpen>
        <ComboboxPortal
          render={(props, state) => <div {...props} data-probe={`${state.size}/${state.radius}`} />}
        >
          <ComboboxPositioner>
            <ComboboxPopup />
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox_portal").element().getAttribute("data-probe")).toBe(
      "lg/full",
    );
  });

  test("リストの render へスタイル情報とリストの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" color="blue" variant="naked" open>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxList
                render={(props, state) => (
                  <div
                    {...props}
                    data-probe={`${state.size}/${state.color}/${state.variant}/${String(state.empty)}`}
                  />
                )}
              />
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox_list").element().getAttribute("data-probe")).toBe(
      "lg/blue/naked/false",
    );
  });

  test("項目の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} size="lg" defaultValue="りんご">
        <ComboboxList>
          {fruits.map((fruit) => (
            <ComboboxItem
              key={fruit}
              value={fruit}
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.color}/${String(state.selected)}/${String(state.highlighted)}`}
                />
              )}
            >
              {fruit}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_combobox_item").elements()[0]?.getAttribute("data-probe"),
    ).toBe("lg/grey/true/false");
  });

  test("チップの render へスタイル情報とチップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ComboboxRoot items={fruits} multiple defaultValue={["りんご"]} size="lg" color="blue">
        <ComboboxChips>
          <ComboboxChip
            value="りんご"
            radius="full"
            variant="naked"
            outlined
            render={(props, state) => (
              <div
                {...props}
                data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(state.outlined)}/${String(state.disabled)}`}
              />
            )}
          />
        </ComboboxChips>
      </ComboboxRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_combobox_chip").element().getAttribute("data-probe")).toBe(
      "lg/blue/full/naked/true/false",
    );
  });
});
