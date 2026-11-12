import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./fieldset.parts.js";
import { Fieldset } from "./fieldset.jsx";
import { FieldsetLegend } from "./legend/fieldset.legend.jsx";
import "../../tests/src/_locators.js";
import { FieldsetRoot } from "./root/fieldset.root.jsx";

describe("フィールドセットの配置", () => {
  test("ルートを縦並びにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend>お支払い情報</FieldsetLegend>
        <span>内容</span>
      </FieldsetRoot>,
    );

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_fieldset").element());
    expect(root.display).toBe("flex");
    expect(root.flexDirection).toBe("column");
  });

  test("各パーツに余白を付けない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend>お支払い情報</FieldsetLegend>
        <span>内容</span>
      </FieldsetRoot>,
    );

    // 検証。
    for (const element of screen.container.querySelectorAll<HTMLElement>(
      ".sui_fieldset, .sui_fieldset *",
    )) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }

    const root = getComputedStyle(screen.getByClassName("sui_fieldset").element());
    expect(root.paddingTop).toBe("0px");
    expect(root.paddingRight).toBe("0px");
    expect(root.paddingBottom).toBe("0px");
    expect(root.paddingLeft).toBe("0px");
  });

  test("凡例を内容の前に置く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Fieldset legend="お支払い情報">
        <span>内容</span>
      </Fieldset>,
    );

    // 検証。
    const legend = screen.getByText("お支払い情報").element().getBoundingClientRect();
    const content = screen.getByText("内容").element().getBoundingClientRect();
    expect(legend.bottom).toBeLessThanOrEqual(content.top);
  });

  test("凡例と内容の間隔を空ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend>お支払い情報</FieldsetLegend>
        <span>内容</span>
      </FieldsetRoot>,
    );

    // 検証。
    const root = screen.getByClassName("sui_fieldset").element();
    const gap = Number.parseFloat(getComputedStyle(root).rowGap);
    expect(gap).toBeGreaterThan(0);

    const legend = screen.getByText("お支払い情報").element().getBoundingClientRect();
    const content = screen.getByText("内容").element().getBoundingClientRect();
    expect(content.top - legend.bottom).toBeCloseTo(gap, 1);
  });

  test("凡例の下に罫線を引く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <FieldsetRoot>
        <FieldsetLegend>お支払い情報</FieldsetLegend>
      </FieldsetRoot>,
    );

    // 検証。
    const legend = getComputedStyle(screen.getByClassName("sui_fieldset_legend").element());
    expect(legend.borderBottomStyle).toBe("solid");
    expect(Number.parseFloat(legend.borderBottomWidth)).toBeGreaterThan(0);
  });
});
