import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { defaultItemToStringLabel, defaultItemToStringValue } from "../../_item.js";
import { Combobox, ComboboxAPI } from "../combobox.jsx";
import { ComboboxRoot } from "./combobox.root.jsx";
import "../../../tests/src/_locators.js";

describe("isInputInPopup", () => {
  test("既定では入力欄をポップアップの外に置く", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.isInputInPopup()).toBe(false);
  });

  test("指定すると入力欄をポップアップの中に置く", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ inputInPopup: true });

    // 検証。
    expect(api.isInputInPopup()).toBe(true);
  });
});

describe("getArrowProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getArrowProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ arrow: true });

    // 検証。
    expect(api.getArrowProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ slotProps: { arrow: { id: "arrow" } } });

    // 検証。
    expect(api.getArrowProps()).toStrictEqual({ id: "arrow" });
  });
});

describe("getBackdropProps", () => {
  test("指定しないときは表示しない", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getBackdropProps()).toBe(null);
  });

  test("有効にすると props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ backdrop: true });

    // 検証。
    expect(api.getBackdropProps()).toStrictEqual({});
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ slotProps: { backdrop: { id: "backdrop" } } });

    // 検証。
    expect(api.getBackdropProps()).toStrictEqual({ id: "backdrop" });
  });
});

describe("getSeparatorProps", () => {
  test("既定で表示する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getSeparatorProps()).toStrictEqual({});
  });

  test("無効にすると表示しない", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ separator: false });

    // 検証。
    expect(api.getSeparatorProps()).toBe(null);
  });

  test("slotProps だけでも表示する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ slotProps: { separator: { id: "sep" } } });

    // 検証。
    expect(api.getSeparatorProps()).toStrictEqual({ id: "sep" });
  });
});

describe("getEmptyProps", () => {
  test("既定の文言を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getEmptyProps()).toStrictEqual({ children: "該当なし" });
  });

  test("指定した文言を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ empty: "見つかりません" });

    // 検証。
    expect(api.getEmptyProps()).toStrictEqual({ children: "見つかりません" });
  });

  test("空表示を消せる", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ empty: null });

    // 検証。
    expect(api.getEmptyProps()).toStrictEqual({ children: null });
  });
});

describe("getStatusProps", () => {
  test("指定しないときは内容なしを返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getStatusProps()).toStrictEqual({ children: undefined });
  });

  test("指定した内容を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ status: "検索中" });

    // 検証。
    expect(api.getStatusProps()).toStrictEqual({ children: "検索中" });
  });
});

describe("getLabel", () => {
  test("指定しないときは内容なしを返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getLabel()).toBe(undefined);
  });

  test("指定した内容を返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ label: "果物" });

    // 検証。
    expect(api.getLabel()).toBe("果物");
  });
});

describe("プレースホルダーの引き継ぎ", () => {
  test("入力欄はトップレベルの文言を使う", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ placeholder: "選択" });

    // 検証。
    expect(api.getInputProps().placeholder).toBe("選択");
  });

  test("入力欄は slotProps の文言を優先する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({
      slotProps: { input: { placeholder: "検索" } },
      placeholder: "選択",
    });

    // 検証。
    expect(api.getInputProps().placeholder).toBe("検索");
  });

  test("表示欄は選択値の文言にフォールバックする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({ placeholder: "選択" });

    // 検証。
    expect(api.getInputDisplayProps().placeholder).toBe("選択");
  });
});

describe("getGroupLabelProps", () => {
  test("ラベルがあるときは子要素にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const props = api.getGroupLabelProps({
      items: [],
      label: "果物",
    });

    // 検証。
    expect(props).toStrictEqual({
      items: [],
      children: "果物",
    });
  });

  test.for([null, undefined, false, true])(
    "非表示のラベルでは表示しない (%s)",
    (label, { expect }) => {
      // 準備と実行。
      const api = new ComboboxAPI({});
      const props = api.getGroupLabelProps({
        items: [],
        label,
      });

      // 検証。
      expect(props).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const props = api.getGroupLabelProps({
      items: [],
      label: "",
    });

    // 検証。
    expect(props).toStrictEqual({
      items: [],
      children: "",
    });
  });
});

describe("getGroupProps", () => {
  test("ラベルを除いて項目を引き継ぐ", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const props = api.getGroupProps({
      items: ["りんご"],
      label: "果物",
    });

    // 検証。
    expect(props).toStrictEqual({ items: ["りんご"] });
  });
});

describe("getItemProps", () => {
  test("プリミティブを値にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getItemProps("りんご")).toStrictEqual({ value: "りんご" });
  });

  test("ラベル付き項目はラベルを除いて値にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const item = {
      label: "りんご",
      value: "apple",
    };

    // 検証。
    const props = api.getItemProps(item);
    expect(props.value).toStrictEqual(item);
    expect(props).not.toHaveProperty("label");
  });

  test("ラベルなしのオブジェクトを値にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const item = { id: "a" };

    // 検証。
    expect(api.getItemProps(item)).toStrictEqual({ value: item });
  });
});

describe("getChipProps", () => {
  test("項目を値にする", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getChipProps("りんご")).toStrictEqual({ value: "りんご" });
  });
});

describe("getChipLabelProps", () => {
  test("指定しないときは内容なしを返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getChipLabelProps()).toStrictEqual({ children: undefined });
  });
});

describe("getItemLabelProps", () => {
  test("指定しないときは内容なしを返す", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});

    // 検証。
    expect(api.getItemLabelProps()).toStrictEqual({ children: undefined });
  });
});

describe("getRootProps", () => {
  test("変換関数の既定値を設定する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({});
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps.itemToStringLabel).toBe(defaultItemToStringLabel);
    expect(rootProps.itemToStringValue).toBe(defaultItemToStringValue);
  });

  test("Suru UI 専用の props を除外する", ({ expect }) => {
    // 準備と実行。
    const api = new ComboboxAPI({
      placeholder: "選択",
      inputInPopup: true,
      keepFilterOnSelect: true,
    });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps).not.toHaveProperty("placeholder");
    expect(rootProps).not.toHaveProperty("inputInPopup");
    expect(rootProps).not.toHaveProperty("keepFilterOnSelect");
  });

  test("ポップアップ内入力では項目押下の閉じる要求を取り消す", ({ expect }) => {
    // 準備。
    const onOpenChange = vi.fn<(open: boolean, details: unknown) => void>();
    const api = new ComboboxAPI({
      multiple: true,
      inputInPopup: true,
      onOpenChange,
      keepFilterOnSelect: true,
    });
    const rootProps = api.getRootProps();
    const cancel = vi.fn<() => void>();

    // 実行。
    (rootProps.onOpenChange as (open: boolean, details: unknown) => void)(false, {
      cancel,
      reason: "item-press",
    });

    // 検証。
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  test("ポップアップ内入力では項目外の閉じる要求を取り消さない", ({ expect }) => {
    // 準備。
    const onOpenChange = vi.fn<(open: boolean, details: unknown) => void>();
    const api = new ComboboxAPI({
      multiple: true,
      inputInPopup: true,
      onOpenChange,
      keepFilterOnSelect: true,
    });
    const rootProps = api.getRootProps();
    const cancel = vi.fn<() => void>();

    // 実行。
    (rootProps.onOpenChange as (open: boolean, details: unknown) => void)(false, {
      cancel,
      reason: "escape-key",
    });

    // 検証。
    expect(cancel).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });

  test("ポップアップ外入力では入力値ハンドラーを中継する", ({ expect }) => {
    // 準備。
    const onInputValueChange = vi.fn<(value: string, details: unknown) => void>();
    const api = new ComboboxAPI({
      multiple: true,
      keepFilterOnSelect: true,
      onInputValueChange,
    });
    const rootProps = api.getRootProps();

    // 実行。
    (rootProps.onInputValueChange as (value: string, details: unknown) => void)("り", {
      cancel: vi.fn<() => void>(),
    });

    // 検証。
    expect(onInputValueChange).toHaveBeenCalledTimes(1);
  });
});

describe("ComboboxRoot", () => {
  test("自身の見た目を持つ要素を表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<ComboboxRoot items={["りんご"]} />);

    // 検証。
    expect(screen.getByClassName("sui_combobox").query()).toBe(null);
  });

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={["りんご"]} disabled />);

    // 検証。
    const group = screen.getByClassName("sui_combobox").element();
    expect(group.classList.contains("sui_combobox-disabled")).toBe(true);
  });

  test("読み取り専用時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Combobox items={["りんご"]} readOnly />);

    // 検証。
    const group = screen.getByClassName("sui_combobox").element();
    expect(group.classList.contains("sui_combobox-readonly")).toBe(true);
  });
});
