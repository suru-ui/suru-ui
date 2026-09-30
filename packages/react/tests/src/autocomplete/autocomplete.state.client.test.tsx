import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { AutocompleteInputGroup } from "../../../src/autocomplete/autocomplete.input-group.jsx";
import { AutocompleteItem } from "../../../src/autocomplete/autocomplete.item.jsx";
import { AutocompleteList } from "../../../src/autocomplete/autocomplete.list.jsx";
import { AutocompletePopup } from "../../../src/autocomplete/autocomplete.popup.jsx";
import { AutocompletePortal } from "../../../src/autocomplete/autocomplete.portal.jsx";
import { AutocompletePositioner } from "../../../src/autocomplete/autocomplete.positioner.jsx";
import { AutocompleteRoot } from "../../../src/autocomplete/autocomplete.root.jsx";
import "../_locators.js";

const fruits = ["りんご", "ばなな"];

describe("Autocomplete の状態", () => {
  test("入力グループの render へスタイル情報と入力グループの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AutocompleteRoot
        items={fruits}
        size="lg"
        color="blue"
        radius="none"
        variant="naked"
        outlined
        open
      >
        <AutocompleteInputGroup
          render={(props, state) => (
            <div
              {...props}
              data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(state.outlined)}/${String(state.open)}`}
            />
          )}
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
      <AutocompleteRoot items={fruits} size="lg" radius="none" variant="naked">
        <AutocompleteInputGroup
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
      <AutocompleteRoot items={fruits} size="lg" outlined open>
        <AutocompletePortal>
          <AutocompletePositioner>
            <AutocompletePopup
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${String(state.outlined)}/${String(state.open)}`}
                />
              )}
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
      <AutocompleteRoot items={fruits} size="lg" color="blue" radius="none" variant="naked">
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
