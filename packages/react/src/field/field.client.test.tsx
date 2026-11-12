import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./field.parts.js";
import { FieldControl } from "./control/field.control.jsx";
import { Field, FieldAPI, useFieldAPI } from "./field.jsx";
import { FieldItem } from "./item/field.item.jsx";

describe("FieldAPI", () => {
  test("Root の props から構成用の props を除く", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({
      name: "sui:name",
      label: "名前",
      children: "内容",
      validity: () => null,
      slotProps: {},
      description: "説明",
      errorMatches: false,
    });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps.name).toBe("sui:name");
    expect(rootProps.children).toBe("内容");
    expect(rootProps).not.toHaveProperty("label");
    expect(rootProps).not.toHaveProperty("description");
    expect(rootProps).not.toHaveProperty("validity");
    expect(rootProps).not.toHaveProperty("errorMatches");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("Label の表示内容を組み立てる", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ label: "名前" });

    // 検証。
    expect(api.getLabelProps()).toStrictEqual({ children: "名前" });
  });

  test("Label を表示しないときは null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ label: false });

    // 検証。
    expect(api.getLabelProps()).toBe(null);
  });

  test("slotProps の Label を引き継ぐ", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({
      label: "名前",
      slotProps: { label: { id: "name-label" } },
    });

    // 検証。
    expect(api.getLabelProps()).toStrictEqual({
      id: "name-label",
      children: "名前",
    });
  });

  test("Description の表示内容を組み立てる", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ description: "説明" });

    // 検証。
    expect(api.getDescriptionProps()).toStrictEqual({ children: "説明" });
  });

  test("Validity の表示内容を組み立てる", ({ expect }) => {
    // 準備。
    const validity = (): React.ReactNode => null;
    const api = new FieldAPI({
      validity,
      slotProps: { validity: { id: "validity" } },
    });

    // 実行。
    const props = api.getValidityProps();

    // 検証。
    expect(props).toStrictEqual({
      id: "validity",
      children: validity,
    });
  });

  test("Validity が関数でないときは null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({});

    // 検証。
    expect(api.getValidityProps()).toBe(null);
  });

  test("既定では常に表示するエラーを返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({});

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([{ match: true }]);
  });

  test("false のときはエラーを返さない", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ errorMatches: false });

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([]);
  });

  test("検証状態を文字列で指定するとそのエラーを返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ errorMatches: "valueMissing" });

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([{ match: "valueMissing" }]);
  });

  test("検証状態の配列は重複を除いて返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({ errorMatches: ["valueMissing", "tooShort", "valueMissing"] });

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([
      { match: "valueMissing" },
      { match: "tooShort" },
    ]);
  });

  test("検証状態と内容の対応を返す", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({
      errorMatches: {
        tooShort: "短すぎます",
        valueMissing: "必須です",
      },
    });

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([
      {
        match: "tooShort",
        children: "短すぎます",
      },
      {
        match: "valueMissing",
        children: "必須です",
      },
    ]);
  });

  test("slotProps の Error を各エラーへ引き継ぐ", ({ expect }) => {
    // 準備と実行。
    const api = new FieldAPI({
      slotProps: { error: { id: "error" } },
      errorMatches: ["valueMissing", "tooShort"],
    });

    // 検証。
    expect(api.getErrorPropsList()).toStrictEqual([
      {
        id: "error",
        match: "valueMissing",
      },
      {
        id: "error",
        match: "tooShort",
      },
    ]);
  });
});

describe("useFieldAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useFieldAPI({ label: "名前" });

      return <span>{api.getLabelProps()?.children}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("名前").query()?.textContent).toBe("名前");
  });
});

describe("Field", () => {
  test("ラベル・入力欄・説明文・検証状態を描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Field
        label="名前"
        validity={(state) => <span>有効性: {String(state.validity.valid)}</span>}
        slotProps={{ label: { id: "name-label" } }}
        description="プロフィールに表示されます。"
        errorMatches={false}
      >
        <Field.Control aria-label="名前" />
      </Field>,
    );

    // 検証。
    expect(screen.getByText("名前").element().id).toBe("name-label");
    expect(screen.getByRole("textbox", { name: "名前" }).query()).not.toBe(null);
    expect(screen.getByText("プロフィールに表示されます。").query()).not.toBe(null);
    expect(screen.getByText("有効性: null").query()).not.toBe(null);
  });

  test("Control と Item を公開する", ({ expect }) => {
    // 準備と実行。
    const control = Field.Control;
    const item = Field.Item;

    // 検証。
    expect(control).toBe(FieldControl);
    expect(item).toBe(FieldItem);
  });
});
