import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import {
  Stat,
  Root as StatPartsRoot,
  Label as StatPartsLabel,
  Value as StatPartsValue,
  Change as StatPartsChange,
  Description as StatPartsDescription,
} from "../../src/data-display/stat/index.js";

function getRoot(screen: Awaited<ReturnType<typeof render>>) {
  return screen.container.querySelector("dl");
}

function getLabel(screen: Awaited<ReturnType<typeof render>>) {
  return screen.container.querySelector("dt");
}

function getValue(screen: Awaited<ReturnType<typeof render>>) {
  return screen.container.querySelector("dd");
}

describe("Stat", () => {
  test("既定のスタイルクラスをルートへ適用する", async () => {
    // 実行
    const screen = await render(
      <Stat>
        <Stat.Label>総ページビュー</Stat.Label>
        <Stat.Value>89,400</Stat.Value>
      </Stat>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_stat");
    await expect.element(root!).toHaveClass("sui_stat-size_md");
  });

  test("size プロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <Stat size="lg">
        <Stat.Label>総ページビュー</Stat.Label>
        <Stat.Value>89,400</Stat.Value>
      </Stat>,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_stat-size_lg");
  });
});

describe("StatParts.Root", () => {
  test("dl 要素を描画する", async () => {
    // 実行
    const screen = await render(<StatPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("DL");
  });
});

describe("StatParts.Label", () => {
  test("dt 要素を描画する", async () => {
    // 実行
    const screen = await render(<StatPartsLabel>ラベル</StatPartsLabel>);

    // 検証
    const label = getLabel(screen);

    expect(label).not.toBeNull();
    expect(label!.tagName).toBe("DT");
    expect(label!.textContent).toBe("ラベル");
  });

  test("統計外では既定のサイズクラスを適用する", async () => {
    // 実行
    const screen = await render(<StatPartsLabel>ラベル</StatPartsLabel>);

    // 検証
    const label = getLabel(screen);

    expect(label).not.toBeNull();
    await expect.element(label!).toHaveClass("sui_stat_label-size_md");
  });

  test("親の統計のサイズを継承する", async () => {
    // 実行
    const screen = await render(
      <Stat size="sm">
        <Stat.Label>ラベル</Stat.Label>
      </Stat>,
    );

    // 検証
    const label = getLabel(screen);

    expect(label).not.toBeNull();
    await expect.element(label!).toHaveClass("sui_stat_label-size_sm");
  });
});

describe("StatParts.Value", () => {
  test("dd 要素を描画する", async () => {
    // 実行
    const screen = await render(<StatPartsValue>89,400</StatPartsValue>);

    // 検証
    const value = getValue(screen);

    expect(value).not.toBeNull();
    expect(value!.tagName).toBe("DD");
    expect(value!.textContent).toBe("89,400");
  });

  test("親の統計のサイズを継承する", async () => {
    // 実行
    const screen = await render(
      <Stat size="lg">
        <Stat.Value>89,400</Stat.Value>
      </Stat>,
    );

    // 検証
    const value = getValue(screen);

    expect(value).not.toBeNull();
    await expect.element(value!).toHaveClass("sui_stat_value-size_lg");
  });
});

describe("StatParts.Change", () => {
  test("span 要素を描画する", async () => {
    // 実行
    const screen = await render(<StatPartsChange>+12%</StatPartsChange>);

    // 検証
    const change = screen.container.querySelector<HTMLElement>(".sui_stat_change");

    expect(change).not.toBeNull();
    expect(change!.tagName).toBe("SPAN");
    expect(change!.textContent).toBe("+12%");
  });

  test.each([
    ["up", "sui_stat_change-direction_up"],
    ["down", "sui_stat_change-direction_down"],
    ["flat", "sui_stat_change-direction_flat"],
  ])("direction %s に応じたクラスを適用する", async (direction, expected) => {
    // 実行
    const screen = await render(
      <StatPartsChange direction={direction as "up" | "down" | "flat"}>+12%</StatPartsChange>,
    );

    // 検証
    const change = screen.container.querySelector<HTMLElement>(".sui_stat_change");

    expect(change).not.toBeNull();
    await expect.element(change!).toHaveClass(expected);
  });

  test("direction を省略すると増加のクラスを適用する", async () => {
    // 実行
    const screen = await render(<StatPartsChange>+12%</StatPartsChange>);

    // 検証
    const change = screen.container.querySelector<HTMLElement>(".sui_stat_change");

    expect(change).not.toBeNull();
    await expect.element(change!).toHaveClass("sui_stat_change-direction_up");
  });
});

describe("StatParts.Description", () => {
  test("dd 要素を描画する", async () => {
    // 実行
    const screen = await render(
      <StatPartsDescription>先月と比較した累計です</StatPartsDescription>,
    );

    // 検証
    const descriptions = screen.container.querySelectorAll<HTMLElement>("dd");
    const description = descriptions[descriptions.length - 1];

    expect(description).not.toBeNull();
    expect(description!.textContent).toBe("先月と比較した累計です");
  });

  test("親の統計のサイズを継承する", async () => {
    // 実行
    const screen = await render(
      <Stat size="lg">
        <Stat.Description>説明</Stat.Description>
      </Stat>,
    );

    // 検証
    const description = screen.container.querySelector<HTMLElement>(".sui_stat_description");

    expect(description).not.toBeNull();
    await expect.element(description!).toHaveClass("sui_stat_description-size_lg");
  });
});
