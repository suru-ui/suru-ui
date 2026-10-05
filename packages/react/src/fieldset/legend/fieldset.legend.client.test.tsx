import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "../fieldset.parts.js";
import { FieldsetRoot } from "../root/fieldset.root.jsx";
import { FieldsetLegend } from "./fieldset.legend.jsx";
import "../../../tests/src/_locators.js";

describe("FieldsetLegend", () => {
  test("既定の基底クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend>お支払い情報</FieldsetLegend>
      </FieldsetRoot>,
    );

    // 検証
    const legend = screen.getByClassName("sui_fieldset_legend").element();
    expect(legend.classList.contains("sui_fieldset_legend")).toBe(true);
    expect(legend.textContent).toBe("お支払い情報");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend className="custom">お支払い情報</FieldsetLegend>
      </FieldsetRoot>,
    );

    // 検証
    const legend = screen.getByClassName("sui_fieldset_legend").element();
    expect(legend.classList.contains("custom")).toBe(true);
    expect(legend.classList.contains("sui_fieldset_legend")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend render={<span />}>お支払い情報</FieldsetLegend>
      </FieldsetRoot>,
    );

    // 検証
    const legend = screen.getByClassName("sui_fieldset_legend").element();
    expect(legend.tagName).toBe("SPAN");
    expect(legend.classList.contains("sui_fieldset_legend")).toBe(true);
  });

  test("無効なグループでは凡例を薄く表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <React.Fragment>
        <FieldsetRoot>
          <FieldsetLegend>有効な凡例</FieldsetLegend>
        </FieldsetRoot>
        <FieldsetRoot disabled>
          <FieldsetLegend>無効な凡例</FieldsetLegend>
        </FieldsetRoot>
      </React.Fragment>,
    );

    // 検証
    const enabled = getComputedStyle(screen.getByText("有効な凡例").element());
    const disabled = getComputedStyle(screen.getByText("無効な凡例").element());
    expect(disabled.color).not.toBe(enabled.color);
    expect(disabled.cursor).toBe("not-allowed");
  });
});
