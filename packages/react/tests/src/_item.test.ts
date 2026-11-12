import * as React from "react";
import { test, expect, describe } from "vite-plus/test";

import {
  hasItems,
  hasLabel,
  hasValue,
  isObject,
  getItemKey,
  isItemGroup,
  isLabeledItem,
  isPrimitiveItem,
  defaultItemToStringLabel,
  defaultItemToStringValue,
} from "../../src/_item.js";

describe("isObject", () => {
  test.each([[{}], [[]]])("オブジェクトを受け入れる (%s)", (value) => {
    // 準備と実行。
    const result = isObject(value);

    // 検証。
    expect(result).toBe(true);
  });

  test.each([[null], [undefined], ["文字"], [42], [() => {}]])(
    "非オブジェクトを拒否する (%s)",
    (value) => {
      // 準備と実行。
      const result = isObject(value);

      // 検証。
      expect(result).toBe(false);
    },
  );
});

describe("hasLabel", () => {
  test("label キーを持つ", () => {
    // 準備と実行。
    const result = hasLabel({ label: "表示" });

    // 検証。
    expect(result).toBe(true);
  });

  test("値が undefined でもキーを持つ", () => {
    // 準備と実行。
    const result = hasLabel({ label: undefined });

    // 検証。
    expect(result).toBe(true);
  });

  test("label キーを持たない", () => {
    // 準備と実行。
    const result = hasLabel({});

    // 検証。
    expect(result).toBe(false);
  });
});

describe("hasValue", () => {
  test("value キーを持つ", () => {
    // 準備と実行。
    const result = hasValue({ value: "値" });

    // 検証。
    expect(result).toBe(true);
  });

  test("value キーを持たない", () => {
    // 準備と実行。
    const result = hasValue({});

    // 検証。
    expect(result).toBe(false);
  });
});

describe("hasItems", () => {
  test("配列の items を持つ", () => {
    // 準備と実行。
    const result = hasItems({ items: ["りんご"] });

    // 検証。
    expect(result).toBe(true);
  });

  test("配列でない items を持たない扱いにする", () => {
    // 準備と実行。
    const result = hasItems({ items: "りんご" });

    // 検証。
    expect(result).toBe(false);
  });

  test("items キーを持たない", () => {
    // 準備と実行。
    const result = hasItems({});

    // 検証。
    expect(result).toBe(false);
  });
});

describe("isItemGroup", () => {
  test("配列 items を持つオブジェクトを受け入れる", () => {
    // 準備と実行。
    const result = isItemGroup({
      items: ["りんご"],
      label: "果物",
    });

    // 検証。
    expect(result).toBe(true);
  });

  test.each([
    [null],
    ["文字"],
    [{ items: "りんご" }],
    [
      {
        label: "表示",
        value: "値",
      },
    ],
  ])("グループでない値を拒否する (%s)", (value) => {
    // 準備と実行。
    const result = isItemGroup(value);

    // 検証。
    expect(result).toBe(false);
  });
});

describe("isLabeledItem", () => {
  test("label と value を持つオブジェクトを受け入れる", () => {
    // 準備と実行。
    const result = isLabeledItem({
      label: "りんご",
      value: "apple",
    });

    // 検証。
    expect(result).toBe(true);
  });

  test.each([[null], ["文字"], [{ label: "りんご" }], [{ value: "apple" }]])(
    "ラベル付きでない値を拒否する (%s)",
    (value) => {
      // 準備と実行。
      const result = isLabeledItem(value);

      // 検証。
      expect(result).toBe(false);
    },
  );
});

describe("isPrimitiveItem", () => {
  test.each([["文字"], [42], [10n], [Symbol("記号")], [true]])(
    "プリミティブを受け入れる (%s)",
    (value) => {
      // 準備と実行。
      const result = isPrimitiveItem(value);

      // 検証。
      expect(result).toBe(true);
    },
  );

  test.each([[null], [undefined], [{}], [["りんご"]]])("非プリミティブを拒否する (%s)", (value) => {
    // 準備と実行。
    const result = isPrimitiveItem(value);

    // 検証。
    expect(result).toBe(false);
  });
});

describe("defaultItemToStringLabel", () => {
  test("文字列をそのまま返す", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel("りんご");

    // 検証。
    expect(result).toBe("りんご");
  });

  test.each([
    [42, "42"],
    [10n, "10"],
  ])("数値を文字列にする (%s)", (value, expected) => {
    // 準備と実行。
    const result = defaultItemToStringLabel(value);

    // 検証。
    expect(result).toBe(expected);
  });

  test("説明付きシンボルは説明を返す", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel(Symbol("りんご"));

    // 検証。
    expect(result).toBe("りんご");
  });

  test("要素の子孫テキストを連結する", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel(
      React.createElement("span", null, React.createElement("b", null, "りん"), "ご"),
    );

    // 検証。
    expect(result).toBe("りんご");
  });

  test("ラベル付き項目はラベルを使う", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel({
      label: "りんご",
      value: "apple",
    });

    // 検証。
    expect(result).toBe("りんご");
  });

  test("数値ラベルは文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel({
      label: 5,
      value: "five",
    });

    // 検証。
    expect(result).toBe("5");
  });

  test("ラベルが undefined のときは値を文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel({
      label: undefined,
      value: "apple",
    });

    // 検証。
    expect(result).toBe("apple");
  });

  test("値だけの項目は値を文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel({ value: 7 });

    // 検証。
    expect(result).toBe("7");
  });

  test.each([[null], [undefined], [true]])("表示できない値は空文字にする (%s)", (value) => {
    // 準備と実行。
    const result = defaultItemToStringLabel(value);

    // 検証。
    expect(result).toBe("");
  });

  test("通常オブジェクトは JSON にする", () => {
    // 準備と実行。
    const result = defaultItemToStringLabel({ id: "a" });

    // 検証。
    expect(result).toBe('{"id":"a"}');
  });

  test("循環オブジェクトは String にフォールバックする", () => {
    // 準備。
    const value: Record<string, unknown> = {};
    value["self"] = value;

    // 実行。
    const result = defaultItemToStringLabel(value);

    // 検証。
    expect(result).toBe("[object Object]");
  });
});

describe("defaultItemToStringValue", () => {
  test("ラベル付き項目は値を文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringValue({
      label: "りんご",
      value: "apple",
    });

    // 検証。
    expect(result).toBe("apple");
  });

  test("数値は文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringValue({
      label: "五",
      value: 5,
    });

    // 検証。
    expect(result).toBe("5");
  });

  test("プリミティブはそのまま文字列にする", () => {
    // 準備と実行。
    const result = defaultItemToStringValue("りんご");

    // 検証。
    expect(result).toBe("りんご");
  });

  test("説明付きシンボルは説明を返す", () => {
    // 準備と実行。
    const result = defaultItemToStringValue(Symbol("りんご"));

    // 検証。
    expect(result).toBe("りんご");
  });

  test("null は空文字にする", () => {
    // 準備と実行。
    const result = defaultItemToStringValue(null);

    // 検証。
    expect(result).toBe("");
  });
});

describe("getItemKey", () => {
  test.each([
    ["りんご", "りんご"],
    [42, 42],
    [10n, 10n],
  ])("キー型をそのまま返す (%s)", (value, expected) => {
    // 準備と実行。
    const result = getItemKey(value);

    // 検証。
    expect(result).toBe(expected);
  });

  test.each([
    [true, "true"],
    [false, "false"],
  ])("真偽値を文字列にする (%s)", (value, expected) => {
    // 準備と実行。
    const result = getItemKey(value);

    // 検証。
    expect(result).toBe(expected);
  });

  test("説明付きシンボルは説明を返す", () => {
    // 準備と実行。
    const result = getItemKey(Symbol("りんご"));

    // 検証。
    expect(result).toBe("りんご");
  });

  test("説明なしシンボルは undefined を返す", () => {
    // 準備と実行。
    const result = getItemKey(Symbol());

    // 検証。
    expect(result).toBe(undefined);
  });

  test.each([[{ key: "k" }], [{ id: "i" }]])("key または id を返す (%s)", (value) => {
    // 準備と実行。
    const result = getItemKey(value);

    // 検証。
    expect(result).toBe(Object.values(value)[0]);
  });

  test("余分なキーがあっても id を返す", () => {
    // 準備と実行。
    const result = getItemKey({
      id: "a",
      extra: 1,
    });

    // 検証。
    expect(result).toBe("a");
  });

  test.each([[null], [undefined], [{ name: "x" }]])(
    "キーにならない値は undefined を返す (%s)",
    (value) => {
      // 準備と実行。
      const result = getItemKey(value);

      // 検証。
      expect(result).toBe(undefined);
    },
  );
});
