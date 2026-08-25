import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import {
  Sidebar,
  SidebarProvider as SidebarPartsProvider,
  SidebarRoot as SidebarPartsRoot,
  SidebarTrigger as SidebarPartsTrigger,
  useContext as useSidebarPartsContext,
} from "../src/sidebar/index.js";

describe("Sidebar", () => {
  test("既定のスタイルクラスをプロバイダーと本体へ適用する", async () => {
    // 実行
    const screen = await render(
      <Sidebar>
        <Sidebar.Root />
      </Sidebar>,
    );

    // 検証
    const provider = screen.container.querySelector<HTMLElement>(".sui_sidebar_provider");
    expect(provider).not.toBeNull();
    await expect.element(provider!).toHaveClass("sui_sidebar_provider");
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar");
    expect(root).not.toBeNull();
    await expect.element(root!).toHaveClass("sui_sidebar-side_left");
    await expect.element(root!).toHaveClass("sui_sidebar-variant_sidebar");
    await expect.element(root!).toHaveClass("sui_sidebar-collapsible_offcanvas");
  });

  test.each(["left", "right"] as const)("side を %s へ上書きする", async (side) => {
    // 実行
    const screen = await render(
      <Sidebar>
        <Sidebar.Root side={side} />
      </Sidebar>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar");
    await expect.element(root!).toHaveClass(`sui_sidebar-side_${side}`);
    await expect.element(root!).toHaveAttribute("data-side", side);
  });

  test.each(["sidebar", "floating", "inset"] as const)(
    "variant を %s へ上書きする",
    async (variant) => {
      // 実行
      const screen = await render(
        <Sidebar>
          <Sidebar.Root variant={variant} />
        </Sidebar>,
      );

      // 検証
      const root = screen.container.querySelector<HTMLElement>(".sui_sidebar");
      await expect.element(root!).toHaveClass(`sui_sidebar-variant_${variant}`);
      await expect.element(root!).toHaveAttribute("data-variant", variant);
    },
  );

  test.each(["offcanvas", "icon", "none"] as const)(
    "collapsible を %s へ上書きする",
    async (collapsible) => {
      // 実行
      const screen = await render(
        <Sidebar>
          <Sidebar.Root collapsible={collapsible} />
        </Sidebar>,
      );

      // 検証
      const root = screen.container.querySelector<HTMLElement>(".sui_sidebar");
      await expect.element(root!).toHaveClass(`sui_sidebar-collapsible_${collapsible}`);
      await expect.element(root!).toHaveAttribute("data-collapsible", collapsible);
    },
  );

  test("トリガーをクリックすると開閉状態を切り替える", async () => {
    // 準備
    const screen = await render(
      <Sidebar>
        <Sidebar.Root>
          <Sidebar.Header>ヘッダー</Sidebar.Header>
          <Sidebar.Content>コンテンツ</Sidebar.Content>
          <Sidebar.Footer>フッター</Sidebar.Footer>
        </Sidebar.Root>
        <Sidebar.Trigger />
      </Sidebar>,
    );
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar")!;
    const trigger = screen.getByRole("button", { name: "サイドバーを切り替える" });
    await expect.element(trigger).toHaveAttribute("aria-expanded", "true");

    // 実行
    await userEvent.click(trigger);

    // 検証
    await expect.element(trigger).toHaveAttribute("aria-expanded", "false");
    expect(root.getAttribute("data-state")).toBe("collapsed");
    expect(root.getAttribute("data-open")).toBe("false");

    // 実行
    await userEvent.click(trigger);

    // 検証
    expect(root.getAttribute("data-state")).toBe("expanded");
  });

  test("open=false を指定すると折りたたんだ状態で表示する", async () => {
    // 実行
    const screen = await render(
      <Sidebar open={false}>
        <Sidebar.Root />
      </Sidebar>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar")!;
    expect(root.getAttribute("data-state")).toBe("collapsed");
  });

  test("onOpenChange が開閉状態の変化を受け取る", async () => {
    // 準備
    const onOpenChangeCalls: boolean[] = [];
    const screen = await render(
      <Sidebar onOpenChange={(open) => onOpenChangeCalls.push(open)}>
        <Sidebar.Root />
        <Sidebar.Trigger />
      </Sidebar>,
    );

    // 実行
    await userEvent.click(screen.getByRole("button"));

    // 検証
    expect(onOpenChangeCalls).toStrictEqual([false]);
  });

  test("レールをクリックすると開閉状態を切り替える", async () => {
    // 準備
    const screen = await render(
      <Sidebar defaultOpen={false}>
        <Sidebar.Root>
          <Sidebar.Rail />
        </Sidebar.Root>
      </Sidebar>,
    );
    const rail = screen.getByRole("button", { name: "サイドバーを切り替える" });

    // 実行
    await userEvent.click(rail);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar")!;
    expect(root.getAttribute("data-state")).toBe("expanded");
  });
});

describe("SidebarParts.Provider", () => {
  test("useContext でコンテキストを読み取れる", async () => {
    let context: ReturnType<typeof useSidebarPartsContext> | undefined;

    function Probe() {
      context = useSidebarPartsContext(true);
      return null;
    }

    // 実行
    await render(
      <SidebarPartsProvider>
        <Probe />
      </SidebarPartsProvider>,
    );

    // 検証
    expect(context?.open).toBe(true);
    expect(context?.state).toBe("expanded");
    expect(typeof context?.setOpen).toBe("function");
    expect(typeof context?.toggle).toBe("function");
  });
});

describe("SidebarParts.Root", () => {
  test("プロバイダーの外では既定で展開した状態になる", async () => {
    // 実行
    const screen = await render(<SidebarPartsRoot />);

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_sidebar")!;
    expect(root.getAttribute("data-state")).toBe("expanded");
    expect(root.tagName).toBe("ASIDE");
  });
});

describe("SidebarParts.Trigger", () => {
  test("プロバイダーの外では ContextMissingError を投げる", async () => {
    // 実行と検証
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      await expect(() => render(<SidebarPartsTrigger />)).rejects.toThrow(/SidebarContext/);
    } finally {
      consoleError.mockRestore();
    }
  });
});
