import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/meter/meter.parts.js";
import { MeterAPI } from "../../../src/meter/meter.jsx";
import { MeterRoot } from "../../../src/meter/root/meter.root.jsx";
import "../_locators.js";

describe("MeterRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MeterRoot value={25} />);

    // 検証
    const root = screen.getByClassName("sui_meter").element();
    expect(root.classList.contains("sui_meter")).toBe(true);
    expect(root.classList.contains("sui_meter-size_md")).toBe(true);
    expect(root.classList.contains("sui_meter-color_grey")).toBe(true);
    expect(root.classList.contains("sui_meter-radius_full")).toBe(true);
    expect(root.classList.contains("sui_meter-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_meter-outlined")).toBe(false);
  });

  test("指定した大きさの修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <MeterRoot id="sm" value={0} size="sm" />
        <MeterRoot id="md" value={0} size="md" />
        <MeterRoot id="lg" value={0} size="lg" />
      </>,
    );

    // 検証
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_meter-size_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_meter-size_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_meter-size_lg")).toBe(
      true,
    );
  });

  test("指定した配色の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <MeterRoot id="blue" value={0} color="blue" />
        <MeterRoot id="purple" value={0} color="purple" />
        <MeterRoot id="magenta" value={0} color="magenta" />
        <MeterRoot id="red" value={0} color="red" />
        <MeterRoot id="orange" value={0} color="orange" />
        <MeterRoot id="yellow" value={0} color="yellow" />
        <MeterRoot id="green" value={0} color="green" />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#blue")?.classList.contains("sui_meter-color_blue"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#purple")?.classList.contains("sui_meter-color_purple"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#magenta")?.classList.contains("sui_meter-color_magenta"),
    ).toBe(true);
    expect(screen.container.querySelector("#red")?.classList.contains("sui_meter-color_red")).toBe(
      true,
    );
    expect(
      screen.container.querySelector("#orange")?.classList.contains("sui_meter-color_orange"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#yellow")?.classList.contains("sui_meter-color_yellow"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#green")?.classList.contains("sui_meter-color_green"),
    ).toBe(true);
  });

  test("指定した角丸の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <MeterRoot id="none" value={0} radius="none" />
        <MeterRoot id="sm" value={0} radius="sm" />
        <MeterRoot id="md" value={0} radius="md" />
        <MeterRoot id="lg" value={0} radius="lg" />
        <MeterRoot id="full" value={0} radius="full" />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#none")?.classList.contains("sui_meter-radius_none"),
    ).toBe(true);
    expect(screen.container.querySelector("#sm")?.classList.contains("sui_meter-radius_sm")).toBe(
      true,
    );
    expect(screen.container.querySelector("#md")?.classList.contains("sui_meter-radius_md")).toBe(
      true,
    );
    expect(screen.container.querySelector("#lg")?.classList.contains("sui_meter-radius_lg")).toBe(
      true,
    );
    expect(
      screen.container.querySelector("#full")?.classList.contains("sui_meter-radius_full"),
    ).toBe(true);
  });

  test("指定した外観と枠線の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <MeterRoot id="naked" value={0} variant="naked" />
        <MeterRoot id="liquid" value={0} variant="liquid" />
        <MeterRoot id="outlined" value={0} outlined />
      </>,
    );

    // 検証
    expect(
      screen.container.querySelector("#naked")?.classList.contains("sui_meter-variant_naked"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#liquid")?.classList.contains("sui_meter-variant_liquid"),
    ).toBe(true);
    expect(
      screen.container.querySelector("#outlined")?.classList.contains("sui_meter-outlined"),
    ).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MeterRoot value={25} />);

    // 検証
    expect(screen.getByClassName("sui_meter").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MeterRoot value={25} className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_meter").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_meter")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<MeterRoot value={25} render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_meter").element().tagName).toBe("SECTION");
  });
});

describe("MeterAPI", () => {
  test("現在値の既定値を 0 にする", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({});

    // 検証
    expect(api.getRootProps().value).toBe(0);
  });

  test("利用者の HTML 属性をルートへ引き継ぐ", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({ id: "meter", value: 25 });

    // 検証
    expect(api.getRootProps().id).toBe("meter");
    expect(api.getRootProps().value).toBe(25);
  });

  test("ラベルがないときはラベルと値を表示しない", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({ value: 25 });

    // 検証
    expect(api.getLabelProps()).toBe(null);
    expect(api.getValueProps()).toBe(null);
  });

  test.for([null, undefined, false, true])(
    "非表示のラベルでは表示しない (%s)",
    (label, { expect }) => {
      // 準備と実行
      const api = new MeterAPI({ label });

      // 検証
      expect(api.getLabelProps()).toBe(null);
      expect(api.getValueProps()).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({ label: "" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "" });
    expect(api.getValueProps()).toStrictEqual({});
  });

  test("ラベルがあるときはラベルと値を表示する", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({ label: "使用量" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "使用量" });
    expect(api.getValueProps()).toStrictEqual({});
  });

  test("slotProps を各パーツへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({
      label: "使用量",
      value: 25,
      slotProps: {
        indicator: { id: "indicator" },
        label: { id: "label" },
        track: { id: "track" },
        value: { id: "value" },
      },
    });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ id: "label", children: "使用量" });
    expect(api.getTrackProps()).toStrictEqual({ id: "track" });
    expect(api.getValueProps()).toStrictEqual({ id: "value" });
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
  });

  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new MeterAPI({ label: "使用量", value: 25 });

    // 検証
    expect(api.getRootProps()).not.toHaveProperty("label");
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
  });
});
