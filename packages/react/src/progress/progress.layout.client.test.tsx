import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./progress.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { Progress } from "./progress.jsx";

function getTrack(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_progress_track`)!;
}

function getIndicator(container: HTMLElement, id: string): HTMLElement {
  return container.querySelector<HTMLElement>(`#${id} .sui_progress_indicator`)!;
}

describe("Progress の配置", () => {
  test.skipIf(!supportsCustomFunctions())(
    "大きさごとのトラックの高さを付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span id="expected-sm" style={{ height: "--sui-border_width(3)", display: "block" }} />
          <span id="expected-md" style={{ height: "--sui-border_width(5)", display: "block" }} />
          <span id="expected-lg" style={{ height: "--sui-border_width(7)", display: "block" }} />
          <Progress id="sm" size="sm" label="読み込み中" value={25} />
          <Progress id="md" size="md" label="読み込み中" value={25} />
          <Progress id="lg" size="lg" label="読み込み中" value={25} />
        </>,
      );

      // 検証
      expect(getComputedStyle(getTrack(screen.container, "sm")).height).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-sm")!).height,
      );
      expect(getComputedStyle(getTrack(screen.container, "md")).height).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-md")!).height,
      );
      expect(getComputedStyle(getTrack(screen.container, "lg")).height).toBe(
        getComputedStyle(screen.container.querySelector<HTMLElement>("#expected-lg")!).height,
      );
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "大きさが増えるほどトラックを高くする",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <Progress id="sm" size="sm" label="読み込み中" value={25} />
          <Progress id="md" size="md" label="読み込み中" value={25} />
          <Progress id="lg" size="lg" label="読み込み中" value={25} />
        </>,
      );

      // 検証
      const sm = Number.parseFloat(getComputedStyle(getTrack(screen.container, "sm")).height);
      const md = Number.parseFloat(getComputedStyle(getTrack(screen.container, "md")).height);
      const lg = Number.parseFloat(getComputedStyle(getTrack(screen.container, "lg")).height);
      expect(md).toBeGreaterThan(sm);
      expect(lg).toBeGreaterThan(md);
    },
  );

  test("指定した角丸でトラックとインジケーターを切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected-sm" style={{ display: "block", borderTopLeftRadius: "4px" }} />
        <span id="expected-md" style={{ display: "block", borderTopLeftRadius: "8px" }} />
        <span id="expected-lg" style={{ display: "block", borderTopLeftRadius: "12px" }} />
        <Progress id="none" label="読み込み中" value={25} radius="none" />
        <Progress id="sm" label="読み込み中" value={25} radius="sm" />
        <Progress id="md" label="読み込み中" value={25} radius="md" />
        <Progress id="lg" label="読み込み中" value={25} radius="lg" />
        <Progress id="full" label="読み込み中" value={25} radius="full" />
      </>,
    );

    // 検証
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
    // 準備と実行
    const screen = await render(
      <Progress id="progress" label="読み込み中" style={{ width: "320px" }} value={25} />,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>("#progress")!;
    const rootRect = root.getBoundingClientRect();
    const labelRect = root
      .querySelector<HTMLElement>(".sui_progress_label")!
      .getBoundingClientRect();
    const valueRect = root
      .querySelector<HTMLElement>(".sui_progress_value")!
      .getBoundingClientRect();
    const trackRect = getTrack(screen.container, "progress").getBoundingClientRect();
    expect(labelRect.left).toBeCloseTo(rootRect.left, 1);
    expect(labelRect.top).toBeCloseTo(valueRect.top, 1);
    expect(labelRect.right).toBeLessThanOrEqual(valueRect.left + 0.5);
    expect(valueRect.right).toBeCloseTo(rootRect.right, 1);
    expect(trackRect.left).toBeCloseTo(rootRect.left, 1);
    expect(trackRect.width).toBeCloseTo(rootRect.width, 1);
    expect(trackRect.top).toBeGreaterThanOrEqual(labelRect.bottom - 0.5);
  });

  test("不確定状態ではトラックの割合でインジケーターを動かす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Progress id="progress" label="読み込み中" style={{ width: "320px" }} value={null} />,
    );

    // 検証
    const trackRect = getTrack(screen.container, "progress").getBoundingClientRect();
    const indicatorRect = getIndicator(screen.container, "progress").getBoundingClientRect();
    expect(indicatorRect.width).toBeCloseTo(trackRect.width * 0.4, 0);
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
        <Progress id="grey" label="読み込み中" value={25} />
        <Progress id="blue" color="blue" label="読み込み中" value={25} />
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

  test.skipIf(!supportsCustomFunctions())("枠線をトラックへ描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ borderColor: "var(--sui-border-1)", borderStyle: "solid" }}>線の基準</span>
        <Progress id="plain" label="読み込み中" value={25} />
        <Progress id="outlined" label="読み込み中" value={25} outlined />
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

  test("行間と列間の間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span id="expected" style={{ gap: "--sui-gap(2)", display: "block" }} />
        <Progress id="progress" label="読み込み中" value={25} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#expected")!,
    ).gap;
    const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#progress")!);
    expect(root.rowGap).toBe(expected);
    expect(root.columnGap).toBe(expected);
  });

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Progress id="sm" size="sm" label="読み込み中" value={25} />
        <Progress id="md" size="md" label="読み込み中" value={25} />
        <Progress id="lg" size="lg" label="読み込み中" value={25} />
      </>,
    );

    // 検証
    for (const [id, fontSize] of [
      ["sm", "12px"],
      ["md", "14px"],
      ["lg", "17px"],
    ] as const) {
      const root = screen.container.querySelector<HTMLElement>(`#${id}`)!;
      expect(
        getComputedStyle(root.querySelector<HTMLElement>(".sui_progress_label")!).fontSize,
      ).toBe(fontSize);
      expect(
        getComputedStyle(root.querySelector<HTMLElement>(".sui_progress_value")!).fontSize,
      ).toBe(fontSize);
      expect(
        getComputedStyle(root.querySelector<HTMLElement>(".sui_progress_value")!)
          .fontVariantNumeric,
      ).toContain("tabular-nums");
    }
  });

  test("外部の余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Progress label="読み込み中" value={25} />);

    // 検証
    const root = getComputedStyle(screen.getByClassName("sui_progress").element());
    expect(root.marginTop).toBe("0px");
    expect(root.marginInlineStart).toBe("0px");
    expect(root.paddingBlockStart).toBe("0px");
    const track = getComputedStyle(screen.getByClassName("sui_progress_track").element());
    expect(track.marginTop).toBe("0px");
    expect(track.paddingBlockStart).toBe("0px");
  });

  test("公開変数でトラックの高さを上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Progress id="progress" label="読み込み中" value={25} />);
    const root = screen.container.querySelector<HTMLElement>("#progress")!;
    root.style.setProperty("--sui_progress_track-height", "40px");

    // 検証
    expect(getTrack(screen.container, "progress").getBoundingClientRect().height).toBeCloseTo(
      40,
      1,
    );
  });
});
