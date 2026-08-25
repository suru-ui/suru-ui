import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import {
  Status,
  Root as StatusPartsRoot,
  Indicator as StatusPartsIndicator,
} from "../src/status/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("span.sui_status");
}

function getIndicator(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>("span.sui_status_indicator");
}

describe("Status", () => {
  test("span 要素を描画する", async () => {
    // 実行
    const screen = await render(<Status>オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("SPAN");
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Status>オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_status");
    await expect.element(root!).toHaveClass("sui_status-size_md");
    await expect.element(root!).toHaveClass("sui_status-color_grey");
    await expect.element(root!).not.toHaveClass("sui_status-processing");
  });

  test("ラベルをインジケーターの後に表示する", async () => {
    // 実行
    const screen = await render(<Status>オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.textContent).toBe("オンライン");
  });

  test("size プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Status size="lg">オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_status-size_lg");
    await expect.element(root!).not.toHaveClass("sui_status-size_md");
  });

  test("color プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Status color="green">オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_status-color_green");
  });

  test("processing を有効にするとアニメーションクラスを付ける", async () => {
    // 実行
    const screen = await render(<Status processing>オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_status-processing");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Status className="my-status">オンライン</Status>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("my-status");
    await expect.element(root!).toHaveClass("sui_status");
  });

  test("slotProps.indicator をインジケーターへ適用できる", async () => {
    // 実行
    const screen = await render(
      <Status slotProps={{ indicator: { className: "my-indicator" } }}>オンライン</Status>,
    );

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    await expect.element(indicator!).toHaveClass("my-indicator");
  });
});

describe("StatusParts.Root", () => {
  test("span 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<StatusPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_status");
    await expect.element(root!).toHaveClass("sui_status-size_md");
    await expect.element(root!).toHaveClass("sui_status-color_grey");
  });

  test("子要素をそのまま表示する", async () => {
    // 実行
    const screen = await render(<StatusPartsRoot>ラベル</StatusPartsRoot>);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.textContent).toBe("ラベル");
  });
});

describe("StatusParts.Indicator", () => {
  test("装飾要素として aria-hidden を付ける", async () => {
    // 実行
    const screen = await render(<StatusPartsIndicator />);

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    expect(indicator!.getAttribute("aria-hidden")).toBe("true");
  });

  test("ルート外では既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<StatusPartsIndicator />);

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    await expect.element(indicator!).toHaveClass("sui_status_indicator-size_md");
    await expect.element(indicator!).toHaveClass("sui_status_indicator-color_grey");
    await expect.element(indicator!).not.toHaveClass("sui_status_indicator-processing");
  });

  test("ルート内ではルートのスタイルプロパティーを使用する", async () => {
    // 準備
    const screen = await render(
      <StatusPartsRoot color="red" processing size="lg">
        <StatusPartsIndicator />
      </StatusPartsRoot>,
    );

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    await expect.element(indicator!).toHaveClass("sui_status_indicator-size_lg");
    await expect.element(indicator!).toHaveClass("sui_status_indicator-color_red");
    await expect.element(indicator!).toHaveClass("sui_status_indicator-processing");
  });

  test("ルート内ではルートのスタイルプロパティーが個別の指定より優先される", async () => {
    // 準備
    const screen = await render(
      <StatusPartsRoot color="red" size="lg">
        <StatusPartsIndicator color="green" size="sm" />
      </StatusPartsRoot>,
    );

    // 検証
    const indicator = getIndicator(screen);

    expect(indicator).not.toBeNull();
    await expect.element(indicator!).toHaveClass("sui_status_indicator-size_lg");
    await expect.element(indicator!).toHaveClass("sui_status_indicator-color_red");
  });
});
