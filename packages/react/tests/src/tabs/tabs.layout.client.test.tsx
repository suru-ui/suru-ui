import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/tabs/tabs.parts.js";
import { TabsIndicator } from "../../../src/tabs/tabs.indicator.jsx";
import { Tabs } from "../../../src/tabs/tabs.jsx";
import { TabsList } from "../../../src/tabs/tabs.list.jsx";
import { TabsPanel } from "../../../src/tabs/tabs.panel.jsx";
import { TabsRoot } from "../../../src/tabs/tabs.root.jsx";
import { TabsTab } from "../../../src/tabs/tabs.tab.jsx";
import "../_locators.js";
import supportsCustomFunctions from "../button/_supports-custom-functions.js";

const items = [
  { label: "概要", value: "overview" },
  { label: "プロジェクト", value: "projects" },
  { label: "アカウント", value: "account" },
] as const;

describe("Tabs の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TabsRoot defaultValue="overview">
        <TabsList>
          <TabsTab value="overview">概要</TabsTab>
          <TabsTab value="projects">プロジェクト</TabsTab>
          <TabsIndicator />
        </TabsList>
        <TabsPanel value="overview">概要の内容</TabsPanel>
      </TabsRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_tabs").query()).not.toBe(null);
    expect(screen.getByRole("tablist").element().classList.contains("sui_tabs_list")).toBe(true);
    expect(screen.getByRole("tab").elements().length).toBe(2);
    expect(screen.getByClassName("sui_tabs_indicator").query()).not.toBe(null);
    expect(screen.getByRole("tabpanel").element().classList.contains("sui_tabs_panel")).toBe(true);

    const elements = screen.container.querySelectorAll<HTMLElement>(".sui_tabs, .sui_tabs *");
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("タブを横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs defaultValue="overview" items={[...items]} />);

    // 検証
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.display).toBe("flex");
    expect(list.flexDirection).toBe("row");
    const overview = screen.getByRole("tab", { name: "概要" }).element().getBoundingClientRect();
    const projects = screen
      .getByRole("tab", { name: "プロジェクト" })
      .element()
      .getBoundingClientRect();
    const account = screen
      .getByRole("tab", { name: "アカウント" })
      .element()
      .getBoundingClientRect();
    expect(projects.left).toBeGreaterThanOrEqual(overview.right);
    expect(account.left).toBeGreaterThanOrEqual(projects.right);
    expect(overview.top).toBeCloseTo(projects.top, 1);
  });

  test("縦方向では列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs defaultValue="overview" items={[...items]} orientation="vertical" />,
    );

    // 検証
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.flexDirection).toBe("column");
    const overview = screen.getByRole("tab", { name: "概要" }).element().getBoundingClientRect();
    const projects = screen
      .getByRole("tab", { name: "プロジェクト" })
      .element()
      .getBoundingClientRect();
    expect(projects.top).toBeGreaterThanOrEqual(overview.bottom);
    expect(overview.left).toBeCloseTo(projects.left, 1);
  });

  test("下線表示ではリストの下辺に区切り線を引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            borderBlockEndColor: "var(--sui-grey-naked-border-normal)",
            borderBlockEndStyle: "solid",
          }}
        >
          基準
        </span>
        <Tabs defaultValue="overview" items={[...items]} variant="line" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.borderBlockEndStyle).toBe("solid");
    expect(list.borderBlockEndColor).toBe(expected.borderBlockEndColor);
  });

  test("縦方向の下線表示ではリストの終辺に区切り線を引く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs defaultValue="overview" items={[...items]} orientation="vertical" variant="line" />,
    );

    // 検証
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.borderInlineEndStyle).toBe("solid");
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの間隔と余白を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tabs defaultValue="overview" id="sm" items={[...items]} size="sm" />
        <Tabs defaultValue="overview" id="md" items={[...items]} size="md" />
        <Tabs defaultValue="overview" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tablist]")!);
    expect(sm.columnGap).toBe("1.12px");
    expect(sm.paddingInlineStart).toBe("5.27px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tablist]")!);
    expect(md.columnGap).toBe("2.53px");
    expect(md.paddingInlineStart).toBe("5.27px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tablist]")!);
    expect(lg.columnGap).toBe("4.27px");
    expect(lg.paddingInlineStart).toBe("8.49px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "区切り表示では大きめの間隔を付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <Tabs defaultValue="overview" id="sm" items={[...items]} size="sm" variant="segments" />
          <Tabs defaultValue="overview" id="md" items={[...items]} size="md" variant="segments" />
          <Tabs defaultValue="overview" id="lg" items={[...items]} size="lg" variant="segments" />
        </>,
      );

      // 検証
      const sm = getComputedStyle(
        screen.container.querySelector<HTMLElement>("#sm [role=tablist]")!,
      );
      expect(sm.columnGap).toBe("2.53px");
      const md = getComputedStyle(
        screen.container.querySelector<HTMLElement>("#md [role=tablist]")!,
      );
      expect(md.columnGap).toBe("4.27px");
      const lg = getComputedStyle(
        screen.container.querySelector<HTMLElement>("#lg [role=tablist]")!,
      );
      expect(lg.columnGap).toBe("6.4px");
    },
  );

  test("大きさごとの活字と最小高さを反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tabs defaultValue="overview" id="sm" items={[...items]} size="sm" />
        <Tabs defaultValue="overview" id="md" items={[...items]} size="md" />
        <Tabs defaultValue="overview" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.minHeight).toBe("20px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.fontSize).toBe("14px");
    expect(md.minHeight).toBe("28px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.minHeight).toBe("36px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "タブの左右の余白を大きさに合わせる",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <Tabs defaultValue="overview" id="sm" items={[...items]} size="sm" />
          <Tabs defaultValue="overview" id="md" items={[...items]} size="md" />
          <Tabs defaultValue="overview" id="lg" items={[...items]} size="lg" />
        </>,
      );

      // 検証
      const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
      expect(Number.parseFloat(sm.paddingInlineStart)).toBeCloseTo(8.49, 1);
      const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
      expect(Number.parseFloat(md.paddingInlineStart)).toBeCloseTo(12.8, 1);
      const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
      expect(Number.parseFloat(lg.paddingInlineStart)).toBeCloseTo(18.54, 1);
    },
  );

  test("角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tabs defaultValue="overview" id="sm" items={[...items]} size="sm" />
        <Tabs defaultValue="overview" id="md" items={[...items]} size="md" />
        <Tabs defaultValue="overview" id="lg" items={[...items]} size="lg" />
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.borderTopLeftRadius).toBe("4px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.borderTopLeftRadius).toBe("8px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.borderTopLeftRadius).toBe("12px");
  });

  test("区切り表示ではリストに背景を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-naked-canvas-subtle)" }}>基準</span>
        <Tabs defaultValue="overview" items={[...items]} variant="segments" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.backgroundColor).toBe(expected.backgroundColor);
  });

  test("下線表示では選択中の下線と文字色を強調する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-canvas_text-1)" }}>基準</span>
        <Tabs defaultValue="overview" items={[...items]} variant="line" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const active = getComputedStyle(screen.getByRole("tab", { name: "概要" }).element());
    expect(active.color).toBe(expected.color);
    const idle = getComputedStyle(screen.getByRole("tab", { name: "プロジェクト" }).element());
    expect(idle.color).not.toBe(expected.color);
    await vi.waitFor(() => {
      const indicator = getComputedStyle(screen.getByClassName("sui_tabs_indicator").element());
      expect(indicator.backgroundColor).toBe(expected.color);
    });
  });

  test("区切り表示では選択中の背景を塗りつぶす", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span
          style={{
            backgroundColor: "var(--sui-grey-solid-canvas-normal)",
            color: "var(--sui-grey-solid-canvas_text-normal)",
          }}
        >
          基準
        </span>
        <Tabs activeVariant="solid" defaultValue="overview" items={[...items]} variant="segments" />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const active = getComputedStyle(screen.getByRole("tab", { name: "概要" }).element());
    expect(active.color).toBe(expected.color);
    await vi.waitFor(() => {
      const indicator = getComputedStyle(screen.getByClassName("sui_tabs_indicator").element());
      expect(indicator.backgroundColor).toBe(expected.backgroundColor);
    });
  });

  test.skipIf(!supportsCustomFunctions())("outlined でルートに枠線を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <Tabs defaultValue="overview" id="plain" items={[...items]} />
        <Tabs defaultValue="overview" id="outlined" items={[...items]} outlined />
      </>,
    );

    // 検証
    const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(screen.container.querySelector<HTMLElement>("#outlined")!);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0);
  });

  test("インジケーターを選択中のタブに重ねる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Tabs defaultValue="projects" items={[...items]} />);
    const indicator = screen.getByClassName("sui_tabs_indicator").element();
    const list = screen.getByRole("tablist").element();

    // 検証
    await vi.waitFor(() => {
      expect(indicator.hasAttribute("hidden")).toBe(false);
    });
    const active = screen
      .getByRole("tab", { name: "プロジェクト" })
      .element()
      .getBoundingClientRect();
    expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-width"))).toBeCloseTo(
      active.width,
      1,
    );
    expect(Number.parseFloat(indicator.style.getPropertyValue("--active-tab-left"))).toBeCloseTo(
      active.left - list.getBoundingClientRect().left,
      1,
    );
  });

  test.skipIf(!supportsCustomFunctions())("パネルに余白を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Tabs
        defaultValue="overview"
        items={[{ content: "概要の内容", label: "概要", value: "overview" }]}
      />,
    );

    // 検証
    const panel = getComputedStyle(screen.getByRole("tabpanel").element());
    expect(Number.parseFloat(panel.paddingInlineStart)).toBeCloseTo(5.27, 1);
    expect(Number.parseFloat(panel.paddingBlockStart)).toBeCloseTo(5.27, 1);
  });

  test("無効なタブを淡色にして操作不能にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <Tabs
          items={[
            { label: "概要", value: "overview" },
            { disabled: true, label: "プロジェクト", value: "projects" },
          ]}
        />
      </>,
    );

    // 検証
    const expected = getComputedStyle(screen.getByText("基準").element());
    const disabled = getComputedStyle(screen.getByRole("tab", { name: "プロジェクト" }).element());
    expect(disabled.color).toBe(expected.color);
    expect(disabled.cursor).toBe("not-allowed");
  });

  test("通常のタブは hover で色を変える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <>
        <Tabs defaultValue="overview" items={[...items]} />
        <span style={{ display: "block", marginBlockStart: "48px" }}>待避</span>
      </>,
    );
    const tab = screen.getByRole("tab", { name: "アカウント" });
    await screen.getByText("待避").hover();
    const before = getComputedStyle(tab.element()).color;

    // 実行
    await tab.hover();

    // 検証
    expect(getComputedStyle(tab.element()).color).not.toBe(before);
  });
});
