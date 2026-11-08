import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./slider.parts.js";
import "../../tests/src/_locators.js";
import { Slider } from "./slider.jsx";

function getControl(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_slider_control`)!;
}

function getIndicator(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_slider_indicator`)!;
}

function getThumb(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_slider_thumb`)!;
}

function getTrack(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_slider_track`)!;
}

describe("Slider の配置", () => {
  test("行間と列間の間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected" style={{ gap: "--sui-gap(2)", display: "block" }} />
        <Slider id="slider" label="音量" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected")!,
    ).gap;
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#slider")!);
    expect(root.rowGap).toBe(expected);
    expect(root.columnGap).toBe(expected);
  });

  test("ラベルと値をトラックの上に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider id="slider" label="音量" style={{ width: "320px" }} renderValue defaultValue={25} />,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>("#slider")!;
    const rootRect = root.getBoundingClientRect();
    const labelRect = root.querySelector<HTMLElement>(".sui_slider_label")!.getBoundingClientRect();
    const valueRect = root.querySelector<HTMLElement>(".sui_slider_value")!.getBoundingClientRect();
    const trackRect = getTrack(screen.container, "slider").getBoundingClientRect();
    expect(labelRect.left).toBeCloseTo(rootRect.left, 1);
    expect(labelRect.top).toBeCloseTo(valueRect.top, 1);
    expect(labelRect.right).toBeLessThanOrEqual(valueRect.left + 0.5);
    expect(valueRect.right).toBeCloseTo(rootRect.right, 1);
    expect(trackRect.top).toBeGreaterThanOrEqual(labelRect.bottom - 0.5);
  });

  test("トラックを操作領域の中央に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider id="slider" label="音量" style={{ width: "320px" }} defaultValue={25} />,
    );

    // 検証
    const rootRect = screen.container
      .querySelector<HTMLElement>("#slider")!
      .getBoundingClientRect();
    const controlRect = getControl(screen.container, "slider").getBoundingClientRect();
    const trackRect = getTrack(screen.container, "slider").getBoundingClientRect();
    expect(controlRect.left).toBeCloseTo(rootRect.left, 1);
    expect(controlRect.width).toBeCloseTo(rootRect.width, 1);
    expect(trackRect.left).toBeGreaterThan(controlRect.left);
    expect(trackRect.left - controlRect.left).toBeCloseTo(controlRect.right - trackRect.right, 0);
  });

  test("大きさごとのサム径を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          id="expected-sm"
          style={{
            height:
              "calc(var(--sui-text-oln-sm-m-font_size) * var(--sui-text-oln-sm-m-line_height))",
            display: "block",
          }}
        />
        <span
          id="expected-md"
          style={{
            height:
              "calc(var(--sui-text-oln-md-m-font_size) * var(--sui-text-oln-md-m-line_height))",
            display: "block",
          }}
        />
        <span
          id="expected-lg"
          style={{
            height:
              "calc(var(--sui-text-oln-lg-m-font_size) * var(--sui-text-oln-lg-m-line_height))",
            display: "block",
          }}
        />
        <Slider id="sm" size="sm" label="音量" defaultValue={25} />
        <Slider id="md" size="md" label="音量" defaultValue={25} />
        <Slider id="lg" size="lg" label="音量" defaultValue={25} />
      </>,
    );

    // 検証
    for (const id of ["sm", "md", "lg"] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#expected-${id}`)!,
      );
      const thumb = getComputedStyle(getThumb(screen.container, id));
      expect(thumb.height).toBe(expected.height);
      expect(thumb.width).toBe(expected.height);
    }
  });

  test("大きさが増えるほどサムを大きくする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Slider id="sm" size="sm" label="音量" defaultValue={25} />
        <Slider id="md" size="md" label="音量" defaultValue={25} />
        <Slider id="lg" size="lg" label="音量" defaultValue={25} />
      </>,
    );

    // 検証
    const sm = Number.parseFloat(getComputedStyle(getThumb(screen.container, "sm")).height);
    const md = Number.parseFloat(getComputedStyle(getThumb(screen.container, "md")).height);
    const lg = Number.parseFloat(getComputedStyle(getThumb(screen.container, "lg")).height);
    expect(md).toBeGreaterThan(sm);
    expect(lg).toBeGreaterThan(md);
  });

  test("トラックの高さをサム径の 4 分の 1 にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider id="slider" label="音量" defaultValue={25} />);

    // 検証
    const thumbHeight = Number.parseFloat(
      getComputedStyle(getThumb(screen.container, "slider")).height,
    );
    const trackHeight = Number.parseFloat(
      getComputedStyle(getTrack(screen.container, "slider")).height,
    );
    expect(trackHeight).toBeCloseTo(thumbHeight / 4, 1);
  });

  test("指定した角丸でトラックとサムを切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "block", borderTopLeftRadius: "4px" }} />
        <span id="expected-md" style={{ display: "block", borderTopLeftRadius: "8px" }} />
        <span id="expected-lg" style={{ display: "block", borderTopLeftRadius: "12px" }} />
        <Slider id="none" label="音量" radius="none" defaultValue={25} />
        <Slider id="sm" label="音量" radius="sm" defaultValue={25} />
        <Slider id="md" label="音量" radius="md" defaultValue={25} />
        <Slider id="lg" label="音量" radius="lg" defaultValue={25} />
        <Slider id="full" label="音量" radius="full" defaultValue={25} />
      </>,
    );

    // 検証
    expect(getComputedStyle(getTrack(screen.container, "none")).borderTopLeftRadius).toBe("0px");
    expect(getComputedStyle(getThumb(screen.container, "none")).borderTopLeftRadius).toBe("0px");
    for (const id of ["sm", "md", "lg"] as const) {
      const expected = getComputedStyle(
        screen.container.querySelector<HTMLElement>(`#expected-${id}`)!,
      ).borderTopLeftRadius;
      expect(getComputedStyle(getTrack(screen.container, id)).borderTopLeftRadius).toBe(expected);
      expect(getComputedStyle(getThumb(screen.container, id)).borderTopLeftRadius).toBe(expected);
    }
    const fullTrack = getComputedStyle(getTrack(screen.container, "full"));
    expect(Number.parseFloat(fullTrack.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(fullTrack.height) / 2,
      1,
    );
    const fullThumb = getComputedStyle(getThumb(screen.container, "full"));
    expect(Number.parseFloat(fullThumb.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(fullThumb.height) / 2,
      1,
    );
    expect(getComputedStyle(getIndicator(screen.container, "full")).borderTopLeftRadius).toBe(
      fullTrack.borderTopLeftRadius,
    );
  });

  test("現在値の割合に応じてインジケーターを伸ばす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider id="slider" label="音量" style={{ width: "320px" }} defaultValue={25} />,
    );

    // 検証
    const trackRect = getTrack(screen.container, "slider").clientWidth;
    const indicatorRect = getIndicator(screen.container, "slider").getBoundingClientRect();
    expect(indicatorRect.width).toBeCloseTo(trackRect / 4, 0);
  });

  test("配色をインジケーターへ適用する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ display: "block", backgroundColor: "var(--sui-grey-solid-canvas-normal)" }}>
          既定の基準
        </span>
        <span style={{ display: "block", backgroundColor: "var(--sui-blue-solid-canvas-normal)" }}>
          色の基準
        </span>
        <Slider id="grey" label="音量" defaultValue={25} />
        <Slider id="blue" color="blue" label="音量" defaultValue={25} />
      </>,
    );

    // 検証
    expect(getComputedStyle(getIndicator(screen.container, "grey")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("既定の基準").element()).backgroundColor,
    );
    expect(getComputedStyle(getIndicator(screen.container, "blue")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("色の基準").element()).backgroundColor,
    );
  });

  test("枠線をトラックへ描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ borderColor: "var(--sui-grey-liquid-border-normal)", borderStyle: "solid" }}>
          線の基準
        </span>
        <Slider id="plain" label="音量" outlined={false} defaultValue={25} />
        <Slider id="outlined" label="音量" outlined defaultValue={25} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("線の基準").element());
    const plain = getComputedStyle(getTrack(screen.container, "plain"));
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(getTrack(screen.container, "outlined"));
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Slider id="sm" size="sm" label="音量" renderValue defaultValue={25} />
        <Slider id="md" size="md" label="音量" renderValue defaultValue={25} />
        <Slider id="lg" size="lg" label="音量" renderValue defaultValue={25} />
      </>,
    );

    // 検証
    for (const [id, fontSize] of [
      ["sm", "12px"],
      ["md", "14px"],
      ["lg", "17px"],
    ] as const) {
      const root = screen.container.querySelector<HTMLElement>(`#${id}`)!;
      expect(getComputedStyle(root.querySelector<HTMLElement>(".sui_slider_label")!).fontSize).toBe(
        fontSize,
      );
      expect(getComputedStyle(root.querySelector<HTMLElement>(".sui_slider_value")!).fontSize).toBe(
        fontSize,
      );
      expect(
        getComputedStyle(root.querySelector<HTMLElement>(".sui_slider_value")!).fontVariantNumeric,
      ).toContain("tabular-nums");
    }
  });

  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider label="音量" defaultValue={25} />);

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_slider").element());
    expect(root.marginTop).toBe("0px");
    expect(root.marginInlineStart).toBe("0px");
    expect(root.paddingBlockStart).toBe("0px");
    const track = getComputedStyle(screen.getByClassName("sui_slider_track").element());
    expect(track.marginTop).toBe("0px");
    expect(track.paddingBlockStart).toBe("0px");
  });

  test("公開変数でサム径を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Slider id="slider" label="音量" defaultValue={25} />);
    const root = screen.container.querySelector<HTMLElement>("#slider")!;
    root.style.setProperty("--sui_slider_thumb-size", "40px");

    // 検証
    expect(getThumb(screen.container, "slider").getBoundingClientRect().height).toBeCloseTo(40, 1);
  });

  test("縦方向では操作領域の高さにトラックを合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Slider
        id="slider"
        label="音量"
        slotProps={{ control: { style: { height: 160 } } }}
        orientation="vertical"
        defaultValue={25}
      />,
    );

    // 検証
    const controlRect = getControl(screen.container, "slider").getBoundingClientRect();
    const trackRect = getTrack(screen.container, "slider").getBoundingClientRect();
    expect(controlRect.height).toBeCloseTo(160, 0);
    expect(trackRect.height).toBeCloseTo(controlRect.height, 0);
    expect(trackRect.width).toBeLessThan(controlRect.width);
  });
});
