import "@suru-ui/theme/suru.css";
import { vi, test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { FullSidebar } from "./_sidebar.jsx";
import "../../tests/src/_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";
import { SidebarTrigger, SidebarProvider } from "./sidebar.parts.js";

/**
 * デザイントークンの値を実際の計算値へ解決します。
 * テーマのカスタム関数が使えないブラウザーでは `NaN` を返します。
 */
function resolveLength(value: string): number {
  const probe = document.createElement("div");
  probe.style.width = value;
  document.body.append(probe);
  const width = Number.parseFloat(getComputedStyle(probe).width);
  probe.remove();

  return width;
}

describe("Sidebar の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const elements = screen.container.querySelectorAll<HTMLElement>(
      ".sui_sidebar_provider, .sui_sidebar, .sui_sidebar_header, .sui_sidebar_content, .sui_sidebar_group, .sui_sidebar_group_label, .sui_sidebar_group_content, .sui_sidebar_footer, .sui_sidebar_rail, .sui_sidebar_inset, .sui_sidebar_trigger",
    );
    expect(elements.length).toBe(11);
    for (const element of elements) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginRight).toBe("0px");
      expect(style.marginBottom).toBe("0px");
      expect(style.marginLeft).toBe("0px");
    }
  });

  test("プロバイダーはサイドバーと本文を横並びにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const provider = screen.getByClassName("sui_sidebar_provider").element();
    const root = screen.getByClassName("sui_sidebar").element();
    const inset = screen.getByClassName("sui_sidebar_inset").element();
    expect(getComputedStyle(provider).display).toBe("flex");
    expect(getComputedStyle(provider).alignItems).toBe("stretch");
    expect(getComputedStyle(root).flexDirection).toBe("column");
    expect(getComputedStyle(inset).flexDirection).toBe("column");
    expect(inset.getBoundingClientRect().left).toBeCloseTo(root.getBoundingClientRect().right, 0);
  });

  test("既定では 16rem の幅を持ち折りたたみで 0 にする", async ({ expect }) => {
    // 準備
    const screen = await render(<FullSidebar />);
    const root = screen.getByClassName("sui_sidebar").element();

    // 検証
    expect(root.getBoundingClientRect().width).toBeCloseTo(256, 0);

    // 実行
    await screen.getByClassName("sui_sidebar_trigger").click();

    // 検証
    await vi.waitFor(() => {
      expect(root.getBoundingClientRect().width).toBeCloseTo(0, 0);
    });
  });

  test("icon 折りたたみでは 3rem の幅を残す", async ({ expect }) => {
    // 準備
    const screen = await render(<FullSidebar collapsible="icon" />);
    const root = screen.getByClassName("sui_sidebar").element();

    // 実行
    await screen.getByClassName("sui_sidebar_trigger").click();

    // 検証
    await vi.waitFor(() => {
      expect(root.getBoundingClientRect().width).toBeCloseTo(48, 0);
    });
  });

  test("右辺では本文をサイドバーの反対側に置く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar side="right" />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    const inset = screen.getByClassName("sui_sidebar_inset").element();
    expect(inset.getBoundingClientRect().right).toBeCloseTo(root.getBoundingClientRect().left, 0);
  });

  test("修飾の変更をクラスと配置へ反映する", async ({ expect }) => {
    // 準備
    const screen = await render(<FullSidebar collapsible="icon" />);

    // 実行
    await screen.rerender(<FullSidebar side="right" variant="floating" collapsible="icon" />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.classList.contains("sui_sidebar-side_right")).toBe(true);
    expect(root.classList.contains("sui_sidebar-variant_floating")).toBe(true);
    expect(root.classList.contains("sui_sidebar-collapsible_icon")).toBe(true);

    const inset = screen.getByClassName("sui_sidebar_inset").element();
    expect(inset.getBoundingClientRect().right).toBeLessThanOrEqual(
      root.getBoundingClientRect().left,
    );
  });

  test("公開変数で幅を上書きできる", async ({ expect }) => {
    // 準備
    const screen = await render(<FullSidebar />);
    const root = screen.getByClassName("sui_sidebar").element();

    // 実行
    root.style.setProperty("--sui_sidebar-width", "20rem");

    // 検証
    await vi.waitFor(() => {
      expect(root.getBoundingClientRect().width).toBeCloseTo(320, 0);
    });
  });

  test("左辺では内側の辺に枠線を描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_sidebar").element());
    expect(Number.parseFloat(style.borderRightWidth)).toBeGreaterThan(0);
    expect(Number.parseFloat(style.borderLeftWidth)).toBe(0);
  });

  test("右辺では反対側の辺に枠線を描く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar side="right" />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_sidebar").element());
    expect(Number.parseFloat(style.borderLeftWidth)).toBeGreaterThan(0);
    expect(Number.parseFloat(style.borderRightWidth)).toBe(0);
  });

  test.skipIf(!supportsCustomFunctions())("floating では余白と角丸を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar variant="floating" />);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_sidebar").element());
    const margin = resolveLength("--sui-space(1)");
    expect(Number.parseFloat(style.marginTop)).toBeCloseTo(margin, 0);
    expect(Number.parseFloat(style.marginLeft)).toBeCloseTo(margin, 0);
    expect(Number.parseFloat(style.borderTopLeftRadius)).toBeCloseTo(12, 0);
  });

  test.skipIf(!supportsCustomFunctions())("各領域がテーマの余白を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const header = getComputedStyle(screen.getByClassName("sui_sidebar_header").element());
    expect(Number.parseFloat(header.paddingTop)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);
    expect(Number.parseFloat(header.paddingLeft)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);
    expect(Number.parseFloat(header.rowGap)).toBeCloseTo(resolveLength("--sui-gap(1)"), 0);

    const content = getComputedStyle(screen.getByClassName("sui_sidebar_content").element());
    expect(Number.parseFloat(content.paddingTop)).toBeCloseTo(resolveLength("--sui-space(1)"), 0);
    expect(Number.parseFloat(content.paddingLeft)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);
    expect(Number.parseFloat(content.rowGap)).toBeCloseTo(resolveLength("--sui-gap(2)"), 0);
    expect(content.overflowY).toBe("auto");

    const group = getComputedStyle(screen.getByClassName("sui_sidebar_group").element());
    expect(Number.parseFloat(group.paddingTop)).toBeCloseTo(resolveLength("--sui-space(1)"), 0);
    expect(Number.parseFloat(group.paddingLeft)).toBeCloseTo(resolveLength("--sui-space(0.5)"), 0);
    expect(Number.parseFloat(group.rowGap)).toBeCloseTo(resolveLength("--sui-gap(0.5)"), 0);

    const label = getComputedStyle(screen.getByClassName("sui_sidebar_group_label").element());
    expect(Number.parseFloat(label.minHeight)).toBeCloseTo(resolveLength("--sui-space(4)"), 0);
    expect(Number.parseFloat(label.paddingLeft)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);

    const groupContent = getComputedStyle(
      screen.getByClassName("sui_sidebar_group_content").element(),
    );
    expect(Number.parseFloat(groupContent.rowGap)).toBeCloseTo(resolveLength("--sui-gap(0.5)"), 0);

    const footer = getComputedStyle(screen.getByClassName("sui_sidebar_footer").element());
    expect(Number.parseFloat(footer.paddingTop)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);
    expect(Number.parseFloat(footer.paddingLeft)).toBeCloseTo(resolveLength("--sui-space(2)"), 0);
    expect(Number.parseFloat(footer.rowGap)).toBeCloseTo(resolveLength("--sui-gap(1)"), 0);
  });

  test.skipIf(!supportsCustomFunctions())(
    "inset バリアントでは本文を押し込む",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(<FullSidebar variant="inset" />);

      // 検証
      const style = getComputedStyle(screen.getByClassName("sui_sidebar_inset").element());
      const margin = resolveLength("--sui-space(1)");
      expect(Number.parseFloat(style.marginTop)).toBeCloseTo(margin, 0);
      expect(Number.parseFloat(style.marginLeft)).toBeCloseTo(margin, 0);
      expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
      expect(Number.parseFloat(style.borderTopLeftRadius)).toBeCloseTo(12, 0);
    },
  );

  test("トリガーは 32px の正方形にする", async ({ expect }) => {
    // 準備と実行
    // フレックスアイテムでは inline-flex が flex へ解決されるため、ブロック内で描画します。
    const screen = await render(
      <SidebarProvider>
        <div>
          <SidebarTrigger />
        </div>
      </SidebarProvider>,
    );

    // 検証
    const trigger = screen.getByClassName("sui_sidebar_trigger").element();
    const style = getComputedStyle(trigger);
    const rect = trigger.getBoundingClientRect();
    expect(rect.width).toBeCloseTo(32, 0);
    expect(rect.height).toBeCloseTo(32, 0);
    expect(style.display).toBe("inline-flex");
    expect(style.alignItems).toBe("center");
    expect(style.justifyContent).toBe("center");
  });

  test("レールは左辺の内側の端に重なる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    const rail = screen.getByClassName("sui_sidebar_rail").element();
    const rootRect = root.getBoundingClientRect();
    const rootStyle = getComputedStyle(root);
    const railRect = rail.getBoundingClientRect();
    expect(getComputedStyle(rail).position).toBe("absolute");
    expect(railRect.width).toBeCloseTo(12, 0);
    expect(railRect.right).toBeCloseTo(
      rootRect.right - Number.parseFloat(rootStyle.borderRightWidth),
      0,
    );
    expect(railRect.top).toBeCloseTo(rootRect.top, 0);
    expect(railRect.bottom).toBeCloseTo(rootRect.bottom, 0);
  });

  test("レールは右辺では反対の端に重なる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar side="right" />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    const rail = screen.getByClassName("sui_sidebar_rail").element();
    const rootRect = root.getBoundingClientRect();
    expect(rail.getBoundingClientRect().left).toBeCloseTo(
      rootRect.left + Number.parseFloat(getComputedStyle(root).borderLeftWidth),
      0,
    );
  });
});
