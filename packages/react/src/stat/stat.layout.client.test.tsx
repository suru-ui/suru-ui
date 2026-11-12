import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./stat.parts.js";
import { StatRoot } from "./root/stat.root.jsx";
import { Stat } from "./stat.jsx";
import { StatTrend } from "./trend/stat.trend.jsx";
import "../../tests/src/_locators.js";
import { StatValueUnit } from "./value-unit/stat.value-unit.jsx";

/** ルート配下のパーツをクラス名で取得します。 */
function getPart(container: HTMLElement, id: string, className: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .${className}`)!;
}

describe("Stat の配置", () => {
  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Stat label="閲覧者数" trend="+200 (20 %)" value="1,200" description="先月より" />,
    );

    // 検証。
    for (const selector of [
      ".sui_stat",
      ".sui_stat_label",
      ".sui_stat_value",
      ".sui_stat_trend",
      ".sui_stat_description",
    ]) {
      const style = getComputedStyle(screen.container.querySelector<HTMLElement>(selector)!);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
      expect(style.paddingBlockStart).toBe("0px");
    }
  });

  test("パーツを左揃えで縦に並べる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Stat
        id="stat"
        label="閲覧者数"
        style={{ width: "320px" }}
        trend="+200 (20 %)"
        value="1,200"
        description="先月より"
      />,
    );

    // 検証。
    const rootRect = screen.container.querySelector<HTMLElement>("#stat")!.getBoundingClientRect();
    const labelRect = getPart(screen.container, "stat", "sui_stat_label").getBoundingClientRect();
    const valueRect = getPart(screen.container, "stat", "sui_stat_value").getBoundingClientRect();
    const trendRect = getPart(screen.container, "stat", "sui_stat_trend").getBoundingClientRect();
    const descriptionRect = getPart(
      screen.container,
      "stat",
      "sui_stat_description",
    ).getBoundingClientRect();
    expect(labelRect.left).toBeCloseTo(rootRect.left, 1);
    expect(valueRect.left).toBeCloseTo(rootRect.left, 1);
    expect(trendRect.left).toBeCloseTo(rootRect.left, 1);
    expect(descriptionRect.left).toBeCloseTo(rootRect.left, 1);
    expect(labelRect.bottom).toBeLessThanOrEqual(valueRect.top + 0.5);
    expect(valueRect.bottom).toBeLessThanOrEqual(trendRect.top + 0.5);
    expect(trendRect.bottom).toBeLessThanOrEqual(descriptionRect.top + 0.5);
    expect(descriptionRect.right).toBeLessThanOrEqual(rootRect.right + 0.5);
  });

  test("ラベルとトレンドと説明の活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span id="expected-sm" style={{ fontSize: "var(--sui-text-oln-sm-n-font_size)" }} />
        <span id="expected-md" style={{ fontSize: "var(--sui-text-oln-md-n-font_size)" }} />
        <Stat id="sm" size="sm" label="閲覧者数" trend="+200" description="先月より" />
        <Stat id="md" size="md" label="閲覧者数" trend="+200" description="先月より" />
        <Stat id="lg" size="lg" label="閲覧者数" trend="+200" description="先月より" />
      </>,
    );

    // 検証。
    const expected = {
      md: getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-md")!).fontSize,
      sm: getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!).fontSize,
    };

    for (const [id, token] of [
      ["sm", "sm"],
      ["md", "sm"],
      ["lg", "md"],
    ] as const) {
      for (const className of ["sui_stat_label", "sui_stat_trend", "sui_stat_description"]) {
        expect(getComputedStyle(getPart(screen.container, id, className)).fontSize).toBe(
          expected[token],
        );
      }
    }
  });

  test("値と単位の活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span id="expected-value-sm" style={{ fontSize: "var(--sui-text-std-lg-b-font_size)" }} />
        <span id="expected-value-md" style={{ fontSize: "var(--sui-text-std-xl-b-font_size)" }} />
        <span id="expected-value-lg" style={{ fontSize: "var(--sui-text-std-2xl-b-font_size)" }} />
        <span id="expected-unit-sm" style={{ fontSize: "var(--sui-text-std-sm-n-font_size)" }} />
        <span id="expected-unit-md" style={{ fontSize: "var(--sui-text-std-md-n-font_size)" }} />
        <span id="expected-unit-lg" style={{ fontSize: "var(--sui-text-std-lg-n-font_size)" }} />
        <Stat
          id="sm"
          size="sm"
          value={
            <>
              1<StatValueUnit>時間</StatValueUnit>
            </>
          }
        />
        <Stat
          id="md"
          size="md"
          value={
            <>
              1<StatValueUnit>時間</StatValueUnit>
            </>
          }
        />
        <Stat
          id="lg"
          size="lg"
          value={
            <>
              1<StatValueUnit>時間</StatValueUnit>
            </>
          }
        />
      </>,
    );

    // 検証。
    for (const [id, valueToken, unitToken] of [
      ["sm", "expected-value-sm", "expected-unit-sm"],
      ["md", "expected-value-md", "expected-unit-md"],
      ["lg", "expected-value-lg", "expected-unit-lg"],
    ] as const) {
      expect(getComputedStyle(getPart(screen.container, id, "sui_stat_value")).fontSize).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>(`#${valueToken}`)!).fontSize,
      );
      expect(getComputedStyle(getPart(screen.container, id, "sui_stat_value_unit")).fontSize).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>(`#${unitToken}`)!).fontSize,
      );
    }
  });

  test("値を強調して桁を揃える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span id="expected-weight" style={{ fontWeight: "var(--sui-text-std-xl-b-font_weight)" }} />
        <Stat id="stat" label="閲覧者数" value="1,200" />
      </>,
    );

    // 検証。
    const value = getComputedStyle(getPart(screen.container, "stat", "sui_stat_value"));
    expect(value.fontWeight).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-weight")!).fontWeight,
    );
    expect(value.fontVariantNumeric).toContain("tabular-nums");
  });

  test("トレンドの方向で色を変える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span id="expected-up" style={{ color: "var(--sui-green-naked-canvas_text-normal)" }} />
        <span id="expected-flat" style={{ color: "var(--sui-grey-naked-canvas_text-subtle)" }} />
        <span id="expected-down" style={{ color: "var(--sui-red-naked-canvas_text-normal)" }} />
        <StatRoot id="up">
          <StatTrend direction="up">12</StatTrend>
        </StatRoot>
        <StatRoot id="flat">
          <StatTrend direction="flat">0</StatTrend>
        </StatRoot>
        <StatRoot id="down">
          <StatTrend direction="down">-12</StatTrend>
        </StatRoot>
      </>,
    );

    // 検証。
    for (const direction of ["up", "flat", "down"] as const) {
      expect(getComputedStyle(getPart(screen.container, direction, "sui_stat_trend")).color).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>(`#expected-${direction}`)!)
          .color,
      );
    }
  });

  test("トレンドのアイコンを活字の高さと方向の色に合わせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          id="expected-size"
          style={{
            width:
              "calc(var(--sui-text-oln-sm-n-font_size) * var(--sui-text-oln-sm-n-line_height))",
            height:
              "calc(var(--sui-text-oln-sm-n-font_size) * var(--sui-text-oln-sm-n-line_height))",
            display: "block",
          }}
        />
        <span id="expected-color" style={{ color: "var(--sui-green-naked-canvas_text-normal)" }} />
        <StatRoot id="trend">
          <StatTrend direction="up">
            <svg />
          </StatTrend>
        </StatRoot>
      </>,
    );

    // 検証。
    const expectedSize = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected-size")!,
    );
    const icon = getPart(screen.container, "trend", "sui_stat_trend").querySelector("svg")!;
    expect(getComputedStyle(icon).height).toBe(expectedSize.height);
    expect(getComputedStyle(icon).width).toBe(expectedSize.width);
    expect(getComputedStyle(icon).color).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-color")!).color,
    );
  });

  test("ルートとトレンドに間隔を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            gap: "--sui-gap(2)",
            display: "block",
          }}
        />
        <Stat id="stat" label="閲覧者数" trend="+200 (20 %)" value="1,200" description="先月より" />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected")!,
    ).gap;
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#stat")!);
    expect(root.rowGap).toBe(expected);
    expect(root.columnGap).toBe(expected);
    expect(getComputedStyle(getPart(screen.container, "stat", "sui_stat_trend")).columnGap).toBe(
      expected,
    );
  });

  test("単位に左右の余白を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          id="expected"
          style={{
            display: "block",
            paddingInline: "--sui-space(0.5)",
          }}
        />
        <Stat
          id="stat"
          value={
            <>
              1<StatValueUnit>時間</StatValueUnit>
            </>
          }
        />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected")!,
    ).paddingInline;
    const unit = getComputedStyle(getPart(screen.container, "stat", "sui_stat_value_unit"));
    expect(unit.paddingInlineStart).toBe(expected);
    expect(unit.paddingInlineEnd).toBe(expected);
  });

  test("公開変数でルートの間隔を上書きできる", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <Stat id="stat" label="閲覧者数" trend="+200" value="1,200" description="先月より" />,
    );
    const root = screen.container.querySelector<HTMLElement>("#stat")!;

    // 実行。
    root.style.setProperty("--sui_stat-gap", "24px");

    // 検証。
    expect(getComputedStyle(root).rowGap).toBe("24px");
  });

  test("公開変数でトレンドの色を上書きできる", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <StatRoot id="trend">
        <StatTrend direction="up">12</StatTrend>
      </StatRoot>,
    );
    const trend = getPart(screen.container, "trend", "sui_stat_trend");

    // 実行。
    trend.style.setProperty("--sui_stat_trend-color", "rgb(255, 0, 255)");

    // 検証。
    expect(getComputedStyle(trend).color).toBe("rgb(255, 0, 255)");
  });
});
