import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { FieldControl } from "../../../src/field/field.control.jsx";
import { FieldRoot } from "../../../src/field/field.root.jsx";
import "../../../src/fieldset/fieldset.parts.js";
import { Fieldset, FieldsetAPI, useFieldsetAPI } from "../../../src/fieldset/fieldset.jsx";
import "../_locators.js";

describe("FieldsetAPI", () => {
  test("Root の props から凡例と構成用の props を除く", ({ expect }) => {
    // 準備と実行
    const api = new FieldsetAPI({
      legend: "お支払い情報",
      disabled: true,
      children: "内容",
      slotProps: {},
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.disabled).toBe(true);
    expect(rootProps.children).toBe("内容");
    expect(rootProps).not.toHaveProperty("legend");
    expect(rootProps).not.toHaveProperty("slotProps");
  });

  test("Legend の表示内容を組み立てる", ({ expect }) => {
    // 準備と実行
    const api = new FieldsetAPI({ legend: "お支払い情報" });

    // 検証
    expect(api.getLegendProps()).toStrictEqual({ children: "お支払い情報" });
  });

  test.for([null, undefined, false])("非表示の凡例では null を返す (%s)", (legend, { expect }) => {
    // 準備と実行
    const api = new FieldsetAPI({ legend });

    // 検証
    expect(api.getLegendProps()).toBe(null);
  });

  test("空文字の凡例を表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new FieldsetAPI({ legend: "" });

    // 検証
    expect(api.getLegendProps()).toStrictEqual({ children: "" });
  });

  test("slotProps の Legend を引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new FieldsetAPI({
      legend: "お支払い情報",
      slotProps: { legend: { id: "payment-legend" } },
    });

    // 検証
    expect(api.getLegendProps()).toStrictEqual({ id: "payment-legend", children: "お支払い情報" });
  });
});

describe("useFieldsetAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useFieldsetAPI({ legend: "お支払い情報" });
      return <span>{api.getLegendProps()?.children}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("お支払い情報").query()?.textContent).toBe("お支払い情報");
  });
});

describe("Fieldset", () => {
  test("凡例と内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Fieldset legend="お支払い情報">
        <FieldRoot name="sui:card">
          <FieldControl aria-label="カード番号" />
        </FieldRoot>
      </Fieldset>,
    );

    // 検証
    const fieldset = screen.getByRole("group", { name: "お支払い情報" }).element();
    expect(fieldset.tagName).toBe("FIELDSET");
    expect(screen.getByRole("textbox", { name: "カード番号" }).query()).not.toBe(null);
  });

  test("凡例を省略できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Fieldset>
        <span>内容</span>
      </Fieldset>,
    );

    // 検証
    expect(screen.getByClassName("sui_fieldset_legend").query()).toBe(null);
    expect(screen.getByText("内容").query()).not.toBe(null);
  });

  test("無効をグループ内のコントロールへ伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Fieldset legend="お支払い情報" disabled>
        <FieldRoot name="sui:card">
          <FieldControl aria-label="カード番号" />
        </FieldRoot>
      </Fieldset>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "カード番号" }).element();
    expect(input.hasAttribute("disabled")).toBe(true);
  });
});
