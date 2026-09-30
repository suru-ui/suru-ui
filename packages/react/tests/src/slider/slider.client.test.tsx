import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/slider/slider.parts.js";
import { Slider, SliderAPI, useSliderAPI } from "../../../src/slider/slider.jsx";
import "../_locators.js";

describe("Slider", () => {
  test("ラベルと値とトラックとつまみを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider label="音量" renderValue defaultValue={25} />);

    // 検証
    expect(screen.getByText("音量").query()).not.toBe(null);
    expect(screen.getByClassName("sui_slider_value").element().textContent).toBe("25");
    expect(screen.getByClassName("sui_slider_track").query()).not.toBe(null);
    expect(screen.getByClassName("sui_slider_indicator").query()).not.toBe(null);
    expect(screen.getByClassName("sui_slider_thumb").query()).not.toBe(null);
  });

  test("ラベルを省略するとラベルと値を表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider defaultValue={25} />);

    // 検証
    expect(screen.getByClassName("sui_slider_label").query()).toBe(null);
    expect(screen.getByClassName("sui_slider_value").query()).toBe(null);
    expect(screen.getByClassName("sui_slider_track").query()).not.toBe(null);
  });

  test("renderValue が true のときは現在値を既定の形式で表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider label="音量" renderValue defaultValue={25} />);

    // 検証
    expect(screen.getByClassName("sui_slider_value").element().textContent).toBe("25");
  });

  test("renderValue の関数で表示内容を差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider
        label="音量"
        renderValue={(formattedValues) => `${formattedValues[0]} dB`}
        defaultValue={25}
      />,
    );

    // 検証
    expect(screen.getByText("25 dB").query()).not.toBe(null);
  });

  test("renderValue に渡したノードをそのまま表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider label="音量" renderValue={<span>25 dB</span>} defaultValue={25} />,
    );

    // 検証
    expect(screen.getByText("25 dB").query()).not.toBe(null);
  });

  test("値が配列のときは値の数だけつまみを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider label="範囲" defaultValue={[25, 75]} />);

    // 検証
    expect(screen.getByClassName("sui_slider_thumb").elements().length).toBe(2);
    expect(screen.getByRole("slider").elements().length).toBe(2);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider
        label="音量"
        renderValue
        defaultValue={25}
        slotProps={{
          control: { id: "control" },
          indicator: { id: "indicator" },
          label: { lang: "ja" },
          thumb: { id: "thumb" },
          track: { id: "track" },
          value: { id: "value" },
        }}
      />,
    );

    // 検証
    const label = screen.getByClassName("sui_slider_label").element();
    expect(label.textContent).toBe("音量");
    expect(label.getAttribute("lang")).toBe("ja");
    expect(screen.container.querySelector("#value")?.textContent).toBe("25");
    expect(screen.container.querySelector("#control")).not.toBe(null);
    expect(screen.container.querySelector("#track")).not.toBe(null);
    expect(screen.container.querySelector("#indicator")).not.toBe(null);
    expect(screen.container.querySelector("#thumb")).not.toBe(null);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider label="音量" defaultValue={25} className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_slider").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_slider")).toBe(true);
  });
});

describe("SliderAPI", () => {
  test("値が配列のときは値の数だけつまみの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ defaultValue: [25, 75] });

    // 検証
    expect(api.getThumbPropsList()).toStrictEqual([{ index: 0 }, { index: 1 }]);
  });

  test("制御値の数だけつまみの props を返す", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ value: [10, 20, 30], onValueChange() {} });

    // 検証
    expect(api.getThumbPropsList()).toStrictEqual([{ index: 0 }, { index: 1 }, { index: 2 }]);
  });

  test("値が単数のときはつまみの props を 1 つ返す", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ defaultValue: 25 });

    // 検証
    expect(api.getThumbPropsList()).toStrictEqual([{ index: 0 }]);
  });

  test("ラベルがないときはラベルを表示しない", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ defaultValue: 25 });

    // 検証
    expect(api.getLabelProps()).toBe(null);
  });

  test.for([null, undefined, false, true])(
    "非表示のラベルでは表示しない (%o)",
    (label, { expect }) => {
      // 準備と実行
      const api = new SliderAPI({ label });

      // 検証
      expect(api.getLabelProps()).toBe(null);
    },
  );

  test("空文字は表示対象にする", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ label: "" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "" });
  });

  test("ラベルがあるときはラベルを表示する", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ label: "音量" });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ children: "音量" });
  });

  test("renderValue がないときは値を表示しない", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ defaultValue: 25 });

    // 検証
    expect(api.getValueProps()).toBe(null);
  });

  test("renderValue が true のときは値を既定表示にする", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ renderValue: true });

    // 検証
    expect(api.getValueProps()).toStrictEqual({ children: undefined });
  });

  test("renderValue の関数を値の children にする", ({ expect }) => {
    // 準備
    const renderValue = (formattedValues: readonly string[]) => formattedValues[0] ?? null;

    // 実行
    const api = new SliderAPI({ renderValue });

    // 検証
    expect(api.getValueProps()).toStrictEqual({ children: renderValue });
  });

  test("slotProps を各パーツへ渡す", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({
      label: "音量",
      renderValue: true,
      defaultValue: 25,
      slotProps: {
        control: { id: "control" },
        indicator: { id: "indicator" },
        label: { lang: "ja" },
        thumb: { id: "thumb" },
        track: { id: "track" },
        value: { id: "value" },
      },
    });

    // 検証
    expect(api.getLabelProps()).toStrictEqual({ lang: "ja", children: "音量" });
    expect(api.getControlProps()).toStrictEqual({ id: "control" });
    expect(api.getTrackProps()).toStrictEqual({ id: "track" });
    expect(api.getIndicatorProps()).toStrictEqual({ id: "indicator" });
    expect(api.getValueProps()).toStrictEqual({ id: "value", children: undefined });
    expect(api.getThumbPropsList()).toStrictEqual([{ id: "thumb", index: 0 }]);
  });

  test("Suru UI 専用の props をルートへ渡さない", ({ expect }) => {
    // 準備と実行
    const api = new SliderAPI({ label: "音量", renderValue: true, defaultValue: 25 });

    // 検証
    expect(api.getRootProps()).not.toHaveProperty("label");
    expect(api.getRootProps()).not.toHaveProperty("renderValue");
    expect(api.getRootProps()).not.toHaveProperty("slotProps");
  });
});

describe("useSliderAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useSliderAPI({ label: "範囲", defaultValue: [25, 75] });

      return <span>{api.getThumbPropsList().length}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("2").query()?.textContent).toBe("2");
  });
});
