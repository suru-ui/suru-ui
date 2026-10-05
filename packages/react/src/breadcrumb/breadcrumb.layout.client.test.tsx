import "@suru-ui/theme/suru.css";
import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./breadcrumb.parts.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import "../../tests/src/_locators.js";
import { Breadcrumb } from "./breadcrumb.jsx";

const items = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "製品" },
  { label: "Suru UI" },
] as const;

describe("Breadcrumb の配置", () => {
  test("項目を余白付きで横並びにして中央揃えにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Breadcrumb items={[...items]} />);

    // 検証
    const root = getComputedStyle(
      screen.getByRole("navigation", { name: "パンくずリスト" }).element(),
    );
    expect(root.display).toBe("flex");
    expect(root.alignItems).toBe("center");
    const list = getComputedStyle(screen.getByRole("list").element());
    expect(list.display).toBe("flex");
    expect(list.flexWrap).toBe("wrap");
    expect(list.alignItems).toBe("center");
    const item = getComputedStyle(
      screen.container.querySelector<HTMLElement>(".sui_breadcrumb_item")!,
    );
    expect(item.display).toBe("flex");
    expect(item.alignItems).toBe("center");
    const separator = getComputedStyle(
      screen.container.querySelector<HTMLElement>(".sui_breadcrumb_separator")!,
    );
    expect(separator.display).toBe("flex");
    expect(separator.alignItems).toBe("center");
    const link = getComputedStyle(screen.getByRole("link", { name: "ホーム" }).element());
    expect(link.textDecorationLine).toBe("none");
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Breadcrumb id="sm" size="sm" items={[...items]} />
        <Breadcrumb id="md" size="md" items={[...items]} />
        <Breadcrumb id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.columnGap).toBe("2px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.columnGap).toBe("4px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.columnGap).toBe("6px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "リンクの左右の余白を大きさの間隔に合わせる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <Breadcrumb id="sm" size="sm" items={[...items]} />
          <Breadcrumb id="md" size="md" items={[...items]} />
          <Breadcrumb id="lg" size="lg" items={[...items]} />
        </>,
      );

      // 検証
      const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm a")!);
      expect(sm.paddingInlineStart).toBe("2px");
      const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md a")!);
      expect(md.paddingInlineStart).toBe("4px");
      const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg a")!);
      expect(lg.paddingInlineStart).toBe("6px");
    },
  );

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Breadcrumb id="sm" size="sm" items={[...items]} />
        <Breadcrumb id="md" size="md" items={[...items]} />
        <Breadcrumb id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm a")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.fontWeight).toBe("500");
    expect(sm.fontFamily).toContain("Noto Sans JP");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md a")!);
    expect(md.fontSize).toBe("14px");
    expect(md.fontWeight).toBe("500");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg a")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.fontWeight).toBe("500");
  });

  test("項目の角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Breadcrumb id="sm" size="sm" items={[...items]} />
        <Breadcrumb id="md" size="md" items={[...items]} />
        <Breadcrumb id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm .sui_breadcrumb_item")!,
    );
    expect(Number.parseFloat(sm.borderTopLeftRadius)).toBeCloseTo(2.64, 1);
    const md = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md .sui_breadcrumb_item")!,
    );
    expect(Number.parseFloat(md.borderTopLeftRadius)).toBeCloseTo(4.4, 1);
    const lg = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg .sui_breadcrumb_item")!,
    );
    expect(Number.parseFloat(lg.borderTopLeftRadius)).toBeCloseTo(6.23, 1);
  });

  test("セパレーターを活字の高さに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Breadcrumb id="sm" size="sm" items={[...items]} />
        <Breadcrumb id="md" size="md" items={[...items]} />
        <Breadcrumb id="lg" size="lg" items={[...items]} />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<SVGElement>("#sm .sui_breadcrumb_separator svg")!;
    expect(sm.getBoundingClientRect().width).toBeCloseTo(13.2, 1);
    const md = screen.container.querySelector<SVGElement>("#md .sui_breadcrumb_separator svg")!;
    expect(md.getBoundingClientRect().width).toBeCloseTo(15.4, 1);
    const lg = screen.container.querySelector<SVGElement>("#lg .sui_breadcrumb_separator svg")!;
    expect(lg.getBoundingClientRect().width).toBeCloseTo(18.7, 1);
  });

  test("現在位置だけ配色を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-blue-naked-canvas_text-normal)" }}>基準</span>
        <Breadcrumb color="blue" items={[{ href: "/", label: "ホーム" }, { label: "現在" }]} />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const current = getComputedStyle(screen.getByText("現在").element());
    expect(current.color).toBe(expected.color);
    const previous = getComputedStyle(screen.getByRole("link", { name: "ホーム" }).element());
    expect(previous.color).not.toBe(expected.color);
  });

  test("通常のリンクは hover で色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Breadcrumb items={[{ href: "/", label: "ホーム" }, { label: "現在" }]} />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const link = screen.getByRole("link", { name: "ホーム" });
    await screen.getByText("待避").hover();
    const before = getComputedStyle(link.element()).color;

    // 実行
    await link.hover();

    // 検証
    expect(getComputedStyle(link.element()).color).not.toBe(before);
  });

  test("無効なリンクを淡色にして操作不能にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <Breadcrumb
          items={[
            { href: "/", label: "ホーム" },
            { href: "/disabled", label: "無効", disabled: true },
            { label: "現在" },
          ]}
        />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const disabled = getComputedStyle(screen.getByText("無効").element());
    expect(disabled.color).toBe(expected.color);
    expect(disabled.cursor).toBe("not-allowed");
  });

  test("無効なリンクは hover でも色を変えない", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Breadcrumb
          items={[
            { href: "/", label: "ホーム" },
            { href: "/disabled", label: "無効", disabled: true },
          ]}
        />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const disabled = screen.getByText("無効");
    await screen.getByText("待避").hover();
    const before = getComputedStyle(disabled.element()).color;

    // 実行
    await disabled.hover();

    // 検証
    expect(getComputedStyle(disabled.element()).color).toBe(before);
  });
});
