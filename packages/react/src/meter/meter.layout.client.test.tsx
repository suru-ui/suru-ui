import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./meter.parts.js";
import "../../tests/src/_locators.js";
import { Meter } from "./meter.jsx";

function getTrack(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_meter_track`)!;
}

function getIndicator(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_meter_indicator`)!;
}

describe("Meter の配置", () => {
  test("大きさごとのトラックの高さを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          id="expected-sm"
          style={{
            height: "--sui-border_width(3)",
            display: "block",
          }}
        />
        <span
          id="expected-md"
          style={{
            height: "--sui-border_width(5)",
            display: "block",
          }}
        />
        <span
          id="expected-lg"
          style={{
            height: "--sui-border_width(7)",
            display: "block",
          }}
        />
        <Meter id="sm" size="sm" label="使用量" value={25} />
        <Meter id="md" size="md" label="使用量" value={25} />
        <Meter id="lg" size="lg" label="使用量" value={25} />
      </>,
    );

    // 検証。
    expect(getComputedStyle(getTrack(screen.container, "sm")).height).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!).height,
    );
    expect(getComputedStyle(getTrack(screen.container, "md")).height).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-md")!).height,
    );
    expect(getComputedStyle(getTrack(screen.container, "lg")).height).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!).height,
    );
  });

  test("大きさが増えるほどトラックを高くする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Meter id="sm" size="sm" label="使用量" value={25} />
        <Meter id="md" size="md" label="使用量" value={25} />
        <Meter id="lg" size="lg" label="使用量" value={25} />
      </>,
    );

    // 検証。
    const sm = Number.parseFloat(getComputedStyle(getTrack(screen.container, "sm")).height);
    const md = Number.parseFloat(getComputedStyle(getTrack(screen.container, "md")).height);
    const lg = Number.parseFloat(getComputedStyle(getTrack(screen.container, "lg")).height);
    expect(md).toBeGreaterThan(sm);
    expect(lg).toBeGreaterThan(md);
  });

  test("指定した角丸でトラックとインジケーターを切り抜く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          id="expected-sm"
          style={{
            display: "block",
            borderTopLeftRadius: "4px",
          }}
        />
        <span
          id="expected-md"
          style={{
            display: "block",
            borderTopLeftRadius: "8px",
          }}
        />
        <span
          id="expected-lg"
          style={{
            display: "block",
            borderTopLeftRadius: "12px",
          }}
        />
        <Meter id="none" label="使用量" value={25} radius="none" />
        <Meter id="sm" label="使用量" value={25} radius="sm" />
        <Meter id="md" label="使用量" value={25} radius="md" />
        <Meter id="lg" label="使用量" value={25} radius="lg" />
        <Meter id="full" label="使用量" value={25} radius="full" />
      </>,
    );

    // 検証。
    expect(getComputedStyle(getTrack(screen.container, "none")).borderTopLeftRadius).toBe("0px");
    expect(getComputedStyle(getTrack(screen.container, "sm")).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!)
        .borderTopLeftRadius,
    );
    expect(getComputedStyle(getTrack(screen.container, "md")).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-md")!)
        .borderTopLeftRadius,
    );
    expect(getComputedStyle(getTrack(screen.container, "lg")).borderTopLeftRadius).toBe(
      getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!)
        .borderTopLeftRadius,
    );

    const full = getComputedStyle(getTrack(screen.container, "full"));
    expect(Number.parseFloat(full.borderTopLeftRadius)).toBeCloseTo(
      Number.parseFloat(full.height) / 2,
      1,
    );
    expect(getComputedStyle(getIndicator(screen.container, "full")).borderTopLeftRadius).toBe(
      full.borderTopLeftRadius,
    );
  });

  test("ラベルと値をトラックの上に並べ、トラックを全幅にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Meter id="meter" label="使用量" style={{ width: "320px" }} value={25} />,
    );

    // 検証。
    const root = screen.container.querySelector<HTMLElement>("#meter")!;
    const rootRect = root.getBoundingClientRect();
    const labelRect = root.querySelector<HTMLElement>(".sui_meter_label")!.getBoundingClientRect();
    const valueRect = root.querySelector<HTMLElement>(".sui_meter_value")!.getBoundingClientRect();
    const trackRect = getTrack(screen.container, "meter").getBoundingClientRect();
    expect(labelRect.left).toBeCloseTo(rootRect.left, 1);
    expect(labelRect.top).toBeCloseTo(valueRect.top, 1);
    expect(labelRect.right).toBeLessThanOrEqual(valueRect.left + 0.5);
    expect(valueRect.right).toBeCloseTo(rootRect.right, 1);
    expect(trackRect.left).toBeCloseTo(rootRect.left, 1);
    expect(trackRect.width).toBeCloseTo(rootRect.width, 1);
    expect(trackRect.top).toBeGreaterThanOrEqual(labelRect.bottom - 0.5);
  });

  test("配色をインジケーターへ適用する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            display: "block",
            backgroundColor: "var(--sui-grey-solid-canvas-normal)",
          }}
        >
          既定の基準
        </span>
        <span
          style={{
            display: "block",
            backgroundColor: "var(--sui-blue-solid-canvas-normal)",
          }}
        >
          色の基準
        </span>
        <Meter id="grey" label="使用量" value={25} />
        <Meter id="blue" color="blue" label="使用量" value={25} />
      </>,
    );

    // 検証。
    expect(getComputedStyle(getIndicator(screen.container, "grey")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("既定の基準").element()).backgroundColor,
    );
    expect(getComputedStyle(getIndicator(screen.container, "blue")).backgroundColor).toBe(
      getComputedStyle(screen.getByText("色の基準").element()).backgroundColor,
    );
  });

  test("枠線をトラックへ描く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            borderColor: "var(--sui-border-1)",
            borderStyle: "solid",
          }}
        >
          線の基準
        </span>
        <Meter id="plain" label="使用量" value={25} outlined={false} />
        <Meter id="outlined" label="使用量" value={25} outlined />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("線の基準").element());
    const plain = getComputedStyle(getTrack(screen.container, "plain"));
    expect(plain.borderTopWidth).toBe("0px");

    const outlined = getComputedStyle(getTrack(screen.container, "outlined"));
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0);
    expect(outlined.borderTopColor).toBe(expected.borderTopColor);
  });

  test("行間と列間の間隔を付ける", async ({ expect }) => {
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
        <Meter id="meter" label="使用量" value={25} />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected")!,
    ).gap;
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#meter")!);
    expect(root.rowGap).toBe(expected);
    expect(root.columnGap).toBe(expected);
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Meter id="sm" size="sm" label="使用量" value={25} />
        <Meter id="md" size="md" label="使用量" value={25} />
        <Meter id="lg" size="lg" label="使用量" value={25} />
      </>,
    );

    // 検証。
    for (const [id, fontSize] of [
      ["sm", "12px"],
      ["md", "14px"],
      ["lg", "17px"],
    ] as const) {
      const root = screen.container.querySelector<HTMLElement>(`#${id}`)!;
      expect(getComputedStyle(root.querySelector<HTMLElement>(".sui_meter_label")!).fontSize).toBe(
        fontSize,
      );
      expect(getComputedStyle(root.querySelector<HTMLElement>(".sui_meter_value")!).fontSize).toBe(
        fontSize,
      );
      expect(
        getComputedStyle(root.querySelector<HTMLElement>(".sui_meter_value")!).fontVariantNumeric,
      ).toContain("tabular-nums");
    }
  });

  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter label="使用量" value={25} />);

    // 検証。
    const root = getComputedStyle(screen.getByClassName("sui_meter").element());
    expect(root.marginTop).toBe("0px");
    expect(root.marginInlineStart).toBe("0px");
    expect(root.paddingBlockStart).toBe("0px");

    const track = getComputedStyle(screen.getByClassName("sui_meter_track").element());
    expect(track.marginTop).toBe("0px");
    expect(track.paddingBlockStart).toBe("0px");
  });

  test("公開変数でトラックの高さを上書きできる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Meter id="meter" label="使用量" value={25} />);
    const root = screen.container.querySelector<HTMLElement>("#meter")!;
    root.style.setProperty("--sui_meter_track-height", "40px");

    // 検証。
    expect(getTrack(screen.container, "meter").getBoundingClientRect().height).toBeCloseTo(40, 1);
  });
});
