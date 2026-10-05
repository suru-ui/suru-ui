import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { AutocompleteInputGroup } from "./input-group/autocomplete.input-group.jsx";
import { AutocompleteItem } from "./item/autocomplete.item.jsx";
import { AutocompleteList } from "./list/autocomplete.list.jsx";
import { AutocompletePopup } from "./popup/autocomplete.popup.jsx";
import { AutocompletePortal } from "./portal/autocomplete.portal.jsx";
import { AutocompletePositioner } from "./positioner/autocomplete.positioner.jsx";
import { AutocompleteRoot } from "./root/autocomplete.root.jsx";
import "../../tests/src/_locators.js";

const fruits = ["りんご", "ばなな"];

describe("Autocomplete の状態", () => {
  test("入力グループの render へスタイル情報と入力グループの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AutocompleteRoot open size="lg" color="blue" items={fruits} radius="none" variant="naked">
        <AutocompleteInputGroup
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(state.outlined)}/${String(state.open)}`}
            />
          )}
          outlined
        />
      </AutocompleteRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_autocomplete").element().getAttribute("data-probe")).toBe(
      "lg/blue/none/naked/true/true",
    );
  });

  test("入力グループの修飾をルートより優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AutocompleteRoot size="lg" items={fruits} radius="none" variant="naked">
        <AutocompleteInputGroup
          size="sm"
          color="red"
          radius="full"
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}`}
            />
          )}
          variant="liquid"
        />
      </AutocompleteRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_autocomplete").element().getAttribute("data-probe")).toBe(
      "sm/red/full/liquid",
    );
  });

  test("ポップアップの render へスタイル情報とポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AutocompleteRoot open size="lg" items={fruits}>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${String(state.outlined)}/${String(state.open)}`}
                />
              )}
              outlined
            />
          </AutocompletePositioner>
        </AutocompletePortal>
      </AutocompleteRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_autocomplete_popup").element().getAttribute("data-probe"),
    ).toBe("lg/true/true");
  });

  test("項目の render へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AutocompleteRoot size="lg" color="blue" items={fruits} radius="none" variant="naked">
        <AutocompleteList>
          {fruits.map((fruit) => (
            <AutocompleteItem
              key={fruit}
              value={fruit}
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.color}/${String(state.highlighted)}`}
                />
              )}
            >
              {fruit}
            </AutocompleteItem>
          ))}
        </AutocompleteList>
      </AutocompleteRoot>,
    );

    // 検証
    expect(
      screen.getByClassName("sui_autocomplete_item").elements()[0]?.getAttribute("data-probe"),
    ).toBe("lg/grey/false");
  });
});
