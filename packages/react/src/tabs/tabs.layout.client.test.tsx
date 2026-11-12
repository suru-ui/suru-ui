import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import "./tabs.parts.js";
import { TabsIndicator } from "./indicator/tabs.indicator.jsx";
import { TabsList } from "./list/tabs.list.jsx";
import { TabsPanel } from "./panel/tabs.panel.jsx";
import { TabsRoot } from "./root/tabs.root.jsx";
import { TabsTab } from "./tab/tabs.tab.jsx";
import "../../tests/src/_locators.js";
import { Tabs } from "./tabs.jsx";

const items = [
  {
    label: "概要",
    value: "overview",
  },
  {
    label: "プロジェクト",
    value: "projects",
  },
  {
    label: "アカウント",
    value: "account",
  },
] as const;
describe("Tabs の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行。
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

    // 検証。
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
    // 準備と実行。
    const screen = await render(<Tabs items={[...items]} defaultValue="overview" />);

    // 検証。
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
    // 準備と実行。
    const screen = await render(
      <Tabs items={[...items]} orientation="vertical" defaultValue="overview" />,
    );

    // 検証。
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
    // 準備と実行。
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
        <Tabs items={[...items]} variant="line" defaultValue="overview" />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element());
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.borderBlockEndStyle).toBe("solid");
    expect(list.borderBlockEndColor).toBe(expected.borderBlockEndColor);
  });

  test("縦方向の下線表示ではリストの終辺に区切り線を引く", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tabs items={[...items]} variant="line" orientation="vertical" defaultValue="overview" />,
    );

    // 検証。
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.borderInlineEndStyle).toBe("solid");
  });

  test("大きさごとの間隔と余白を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="sm" size="sm" items={[...items]} defaultValue="overview" />
        <Tabs id="md" size="md" items={[...items]} defaultValue="overview" />
        <Tabs id="lg" size="lg" items={[...items]} defaultValue="overview" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tablist]")!);
    expect(sm.columnGap).toBe("2px");
    expect(sm.paddingInlineStart).toBe("6px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tablist]")!);
    expect(md.columnGap).toBe("4px");
    expect(md.paddingInlineStart).toBe("6px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tablist]")!);
    expect(lg.columnGap).toBe("6px");
    expect(lg.paddingInlineStart).toBe("8px");
  });

  test("区切り表示では大きめの間隔を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="sm" size="sm" items={[...items]} variant="segments" defaultValue="overview" />
        <Tabs id="md" size="md" items={[...items]} variant="segments" defaultValue="overview" />
        <Tabs id="lg" size="lg" items={[...items]} variant="segments" defaultValue="overview" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tablist]")!);
    expect(sm.columnGap).toBe("2px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tablist]")!);
    expect(md.columnGap).toBe("4px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tablist]")!);
    expect(lg.columnGap).toBe("6px");
  });

  test("大きさごとの活字と最小高さを反映する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="sm" size="sm" items={[...items]} defaultValue="overview" />
        <Tabs id="md" size="md" items={[...items]} defaultValue="overview" />
        <Tabs id="lg" size="lg" items={[...items]} defaultValue="overview" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.fontSize).toBe("12px");
    expect(sm.minHeight).toBe("26px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.fontSize).toBe("14px");
    expect(md.minHeight).toBe("32px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.fontSize).toBe("17px");
    expect(lg.minHeight).toBe("36px");
  });

  test("thin ではタブの高さと上下の余白が小さくなる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="plain" items={[...items]} defaultValue="overview" />
        <Tabs id="thin" thin items={[...items]} defaultValue="overview" />
      </>,
    );

    // 検証。
    const plain = screen.container.querySelector<HTMLElement>("#plain")!;
    const thin = screen.container.querySelector<HTMLElement>("#thin [role=tab]")!;
    expect(plain.classList.contains("sui_tabs-thin")).toBe(false);
    expect(
      screen.container.querySelector<HTMLElement>("#thin")!.classList.contains("sui_tabs-thin"),
    ).toBe(true);
    expect(thin.classList.contains("sui_tabs_tab-thin")).toBe(true);

    const plainTab = screen.container.querySelector<HTMLElement>("#plain [role=tab]")!;
    expect(Number.parseFloat(getComputedStyle(thin).paddingBlockStart)).toBeLessThan(
      Number.parseFloat(getComputedStyle(plainTab).paddingBlockStart),
    );
    expect(Number.parseFloat(getComputedStyle(thin).minHeight)).toBeLessThan(
      Number.parseFloat(getComputedStyle(plainTab).minHeight),
    );
  });

  test("thin のセグメントでもインジケーターがタブの高さに収まる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tabs thin items={[...items]} variant="segments" defaultValue="overview" />,
    );

    // 検証。
    await vi.waitFor(() => {
      const tab = screen.getByRole("tab", { name: "概要" }).element().getBoundingClientRect();
      const indicator = screen
        .getByClassName("sui_tabs_indicator")
        .element()
        .getBoundingClientRect();
      expect(indicator.height).toBeCloseTo(tab.height, 1);
    });
  });

  test("タブの左右の余白を大きさに合わせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="sm" size="sm" items={[...items]} defaultValue="overview" />
        <Tabs id="md" size="md" items={[...items]} defaultValue="overview" />
        <Tabs id="lg" size="lg" items={[...items]} defaultValue="overview" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(Number.parseFloat(sm.paddingInlineStart)).toBeCloseTo(8, 1);

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(Number.parseFloat(md.paddingInlineStart)).toBeCloseTo(12, 1);

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(Number.parseFloat(lg.paddingInlineStart)).toBeCloseTo(16, 1);
  });

  test("角丸を大きさに合わせる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="sm" size="sm" items={[...items]} defaultValue="overview" />
        <Tabs id="md" size="md" items={[...items]} defaultValue="overview" />
        <Tabs id="lg" size="lg" items={[...items]} defaultValue="overview" />
      </>,
    );

    // 検証。
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm [role=tab]")!);
    expect(sm.borderTopLeftRadius).toBe("4px");

    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md [role=tab]")!);
    expect(md.borderTopLeftRadius).toBe("8px");

    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg [role=tab]")!);
    expect(lg.borderTopLeftRadius).toBe("12px");
  });

  test("区切り表示ではリストに背景を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span style={{ backgroundColor: "var(--sui-grey-naked-canvas-subtle)" }}>基準</span>
        <Tabs items={[...items]} variant="segments" defaultValue="overview" />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element());
    const list = getComputedStyle(screen.getByRole("tablist").element());
    expect(list.backgroundColor).toBe(expected.backgroundColor);
  });

  test("下線表示では選択中の下線と文字色を強調する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-canvas_text-1)" }}>基準</span>
        <Tabs items={[...items]} variant="line" defaultValue="overview" />
      </>,
    );

    // 検証。
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
    // 準備と実行。
    const screen = await render(
      <>
        <span
          style={{
            color: "var(--sui-grey-solid-canvas_text-normal)",
            backgroundColor: "var(--sui-grey-solid-canvas-normal)",
          }}
        >
          基準
        </span>
        <Tabs items={[...items]} variant="segments" defaultValue="overview" activeVariant="solid" />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element());
    const active = getComputedStyle(screen.getByRole("tab", { name: "概要" }).element());
    expect(active.color).toBe(expected.color);
    await vi.waitFor(() => {
      const indicator = getComputedStyle(screen.getByClassName("sui_tabs_indicator").element());
      expect(indicator.backgroundColor).toBe(expected.backgroundColor);
    });
  });

  test("outlined でルートに枠線を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <Tabs id="plain" items={[...items]} outlined={false} defaultValue="overview" />
        <Tabs id="outlined" items={[...items]} outlined defaultValue="overview" />
      </>,
    );

    // 検証。
    const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
    expect(plain.borderTopWidth).toBe("0px");

    const outlined = getComputedStyle(screen.container.querySelector<HTMLElement>("#outlined")!);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0);
  });

  test("パネルに余白を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tabs
        items={[
          {
            label: "概要",
            value: "overview",
            content: "概要の内容",
          },
        ]}
        defaultValue="overview"
      />,
    );

    // 検証。
    const panel = getComputedStyle(screen.getByRole("tabpanel").element());
    expect(Number.parseFloat(panel.paddingInlineStart)).toBeCloseTo(6, 1);
    expect(Number.parseFloat(panel.paddingBlockStart)).toBeCloseTo(6, 1);
  });

  test("無効なタブを淡色にして操作不能にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-disabled-naked-canvas_text)" }}>基準</span>
        <Tabs
          items={[
            {
              label: "概要",
              value: "overview",
            },
            {
              label: "プロジェクト",
              value: "projects",
              disabled: true,
            },
          ]}
        />
      </>,
    );

    // 検証。
    const expected = getComputedStyle(screen.getByText("基準").element());
    const disabled = getComputedStyle(screen.getByRole("tab", { name: "プロジェクト" }).element());
    expect(disabled.color).toBe(expected.color);
    expect(disabled.cursor).toBe("not-allowed");
  });

  test("通常のタブは hover で色を変える", async ({ expect }) => {
    // 準備。
    const screen = await render(
      <>
        <Tabs items={[...items]} defaultValue="overview" />
        <span
          style={{
            display: "block",
            marginBlockStart: "48px",
          }}
        >
          待避
        </span>
      </>,
    );
    const tab = screen.getByRole("tab", { name: "アカウント" });
    await screen.getByText("待避").hover();

    const before = getComputedStyle(tab.element()).color;

    // 実行。
    await tab.hover();

    // 検証。
    expect(getComputedStyle(tab.element()).color).not.toBe(before);
  });
});
