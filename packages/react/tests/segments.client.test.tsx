import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import {
  Segments,
  Root as SegmentsPartsRoot,
  List as SegmentsPartsList,
  Item as SegmentsPartsItem,
} from "../src/segments/index.js";

const items = [
  { value: "day", label: "日" },
  { value: "week", label: "週" },
  { value: "month", label: "月" },
];

function getRoot(screen: { container: HTMLElement }): HTMLElement | null {
  return screen.container.querySelector<HTMLElement>(".sui_segments");
}

describe("Segments", () => {
  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<Segments items={items} />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_segments");
    await expect.element(root).toHaveClass("sui_segments-size_md");
    await expect.element(root).toHaveClass("sui_segments-color_grey");
    await expect.element(root).toHaveClass("sui_segments-radius_md");
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(<Segments items={items} size="lg" color="blue" radius="full" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_segments-size_lg");
    await expect.element(root).toHaveClass("sui_segments-color_blue");
    await expect.element(root).toHaveClass("sui_segments-radius_full");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<Segments items={items} className="my-segments" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-segments");
    await expect.element(root).toHaveClass("sui_segments");
  });

  test("items の各ラベルを描画する", async () => {
    // 実行
    const screen = await render(<Segments items={items} defaultValue="week" />);

    // 検証
    await expect.element(screen.getByRole("tab", { name: "日" })).toBeInTheDocument();
    await expect.element(screen.getByRole("tab", { name: "週" })).toBeInTheDocument();
    await expect.element(screen.getByRole("tab", { name: "月" })).toBeInTheDocument();

    const selected = screen.getByRole("tab", { name: "週" });

    await expect.element(selected).toHaveAttribute("aria-selected", "true");
  });

  test("セグメントを押すと選択が変わる", async () => {
    // 準備
    const screen = await render(<Segments items={items} defaultValue="day" />);
    const month = screen.getByRole("tab", { name: "月" });

    // 実行
    await userEvent.click(month);

    // 検証
    await expect.element(month).toHaveAttribute("aria-selected", "true");
  });

  test("onValueChange に選択した値を渡す", async () => {
    // 準備
    const values: unknown[] = [];
    const screen = await render(
      <Segments items={items} defaultValue="day" onValueChange={(value) => values.push(value)} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("tab", { name: "月" }));

    // 検証
    expect(values).toStrictEqual(["month"]);
  });

  test("制御されているときは親の指定が優先される", async () => {
    // 準備
    let value = "day";
    const screen = await render(
      <Segments items={items} value={value} onValueChange={(nextValue) => (value = nextValue)} />,
    );

    // 実行
    await userEvent.click(screen.getByRole("tab", { name: "週" }));

    // 検証
    expect(value).toBe("week");
    await expect
      .element(screen.getByRole("tab", { name: "週" }))
      .toHaveAttribute("aria-selected", "false");
    await expect
      .element(screen.getByRole("tab", { name: "日" }))
      .toHaveAttribute("aria-selected", "true");
  });

  test("無効な項目は選択できない", async () => {
    // 実行
    const screen = await render(
      <Segments
        items={[
          { value: "day", label: "日" },
          { value: "week", label: "週", disabled: true },
        ]}
        defaultValue="day"
      />,
    );

    // 検証
    await expect.element(screen.getByRole("tab", { name: "週" })).toBeDisabled();
  });

  test("slotProps を各パーツへ適用できる", async () => {
    // 実行
    const screen = await render(
      <Segments
        items={items}
        slotProps={{
          list: { className: "my-list" },
          item: { className: "my-item", value: null },
          indicator: { className: "my-indicator" },
        }}
      />,
    );

    // 検証
    const root = getRoot(screen)!;

    expect(root.querySelector(".my-list")).not.toBeNull();
    expect(root.querySelectorAll(".my-item").length).toBe(3);
    expect(root.querySelector(".my-indicator")).not.toBeNull();
  });
});

describe("SegmentsParts.Root", () => {
  test("div 要素として描画される", async () => {
    // 実行
    const screen = await render(<SegmentsPartsRoot defaultValue="week" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    expect(root!.tagName).toBe("DIV");
  });
});

describe("SegmentsParts.List と SegmentsParts.Item", () => {
  test("パーツを組み合わせてセグメントを選択できる", async () => {
    // 準備
    const screen = await render(
      <SegmentsPartsRoot defaultValue="day">
        <SegmentsPartsList>
          <SegmentsPartsItem value="day">日</SegmentsPartsItem>
          <SegmentsPartsItem value="week">週</SegmentsPartsItem>
        </SegmentsPartsList>
      </SegmentsPartsRoot>,
    );

    // 実行
    await userEvent.click(screen.getByRole("tab", { name: "週" }));

    // 検証
    await expect
      .element(screen.getByRole("tab", { name: "週" }))
      .toHaveAttribute("aria-selected", "true");
  });
});
