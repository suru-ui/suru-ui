import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import "../../../src/sidebar/sidebar.parts.js";
import { Sidebar, SidebarAPI, useSidebarAPI } from "../../../src/sidebar/sidebar.jsx";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarRoot,
  SidebarTrigger,
  useSidebarContext,
} from "../../../src/sidebar/sidebar.parts.js";
import "../_locators.js";
import { FullSidebar } from "./_sidebar.js";

describe("Sidebar", () => {
  test("公開パーツをすべて描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    for (const className of [
      "sui_sidebar_provider",
      "sui_sidebar",
      "sui_sidebar_header",
      "sui_sidebar_content",
      "sui_sidebar_group",
      "sui_sidebar_group_label",
      "sui_sidebar_group_content",
      "sui_sidebar_footer",
      "sui_sidebar_rail",
      "sui_sidebar_inset",
      "sui_sidebar_trigger",
    ]) {
      expect(screen.getByClassName(className).query()).not.toBe(null);
    }
  });

  test("既定では展開状態で左辺に描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.classList.contains("sui_sidebar-side_left")).toBe(true);
    expect(root.classList.contains("sui_sidebar-variant_sidebar")).toBe(true);
    expect(root.classList.contains("sui_sidebar-collapsible_offcanvas")).toBe(true);
    expect(root.classList.contains("sui_sidebar-expanded")).toBe(true);

    const provider = screen.getByClassName("sui_sidebar_provider").element();
    expect(provider.classList.contains("sui_sidebar_provider-expanded")).toBe(true);
  });

  test("プロバイダーがないときはエラーを投げる", async ({ expect }) => {
    // 準備と実行と検証
    await expect(
      render(
        <SidebarRoot>
          <SidebarTrigger />
        </SidebarRoot>,
      ),
    ).rejects.toThrow(ContextMissingError);
  });

  test("操作ボタンは状態と操作名を伝える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar />);

    // 検証
    expect(screen.getByRole("complementary").element().tagName).toBe("ASIDE");
    expect(screen.getByRole("main").element().tagName).toBe("MAIN");

    for (const className of ["sui_sidebar_trigger", "sui_sidebar_rail"]) {
      const button = screen.getByClassName(className).element();
      expect(button.tagName).toBe("BUTTON");
      expect(button.getAttribute("type")).toBe("button");
      expect(button.getAttribute("aria-label")).toBe("サイドバーを切り替える");
      expect(button.getAttribute("aria-expanded")).toBe("true");
      expect(button.classList.contains(`${className}-expanded`)).toBe(true);
    }
  });

  test("トリガーで折りたたむ", async ({ expect }) => {
    // 準備
    const screen = await render(<FullSidebar />);

    // 実行
    await screen.getByClassName("sui_sidebar_trigger").click();

    // 検証
    await vi.waitFor(() => {
      expect(
        screen.getByClassName("sui_sidebar").element().classList.contains("sui_sidebar-collapsed"),
      ).toBe(true);
      expect(
        screen
          .getByClassName("sui_sidebar_provider")
          .element()
          .classList.contains("sui_sidebar_provider-collapsed"),
      ).toBe(true);
      expect(
        screen.getByClassName("sui_sidebar_trigger").element().getAttribute("aria-expanded"),
      ).toBe("false");
    });
  });

  test("レールでも開閉を切り替える", async ({ expect }) => {
    // 準備
    // offcanvas で折りたたむとレールが画面外へ隠れるため、アイコン折りたたみで検証します。
    const screen = await render(<FullSidebar collapsible="icon" />);

    // 実行
    await screen.getByClassName("sui_sidebar_rail").click();

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByClassName("sui_sidebar_rail")
          .element()
          .classList.contains("sui_sidebar_rail-collapsed"),
      ).toBe(true);
    });

    // 実行
    await screen.getByClassName("sui_sidebar_rail").click();

    // 検証
    await vi.waitFor(() => {
      expect(
        screen
          .getByClassName("sui_sidebar_rail")
          .element()
          .classList.contains("sui_sidebar_rail-expanded"),
      ).toBe(true);
    });
  });

  test("collapsible が none のときはレールを描画せずトリガーを無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarRoot collapsible="none">
          <SidebarRail />
          <SidebarTrigger />
        </SidebarRoot>
      </SidebarProvider>,
    );

    // 検証
    expect(screen.getByClassName("sui_sidebar_rail").query()).toBe(null);
    const trigger = screen.getByClassName("sui_sidebar_trigger").element();
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.classList.contains("sui_sidebar_trigger-disabled")).toBe(true);
  });

  test("disabled を指定した操作ボタンは状態クラスを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarTrigger disabled />
        <SidebarRoot>
          <SidebarRail disabled />
        </SidebarRoot>
      </SidebarProvider>,
    );

    // 検証
    for (const className of ["sui_sidebar_trigger", "sui_sidebar_rail"]) {
      const button = screen.getByClassName(className).element();
      expect(button.hasAttribute("disabled")).toBe(true);
      expect(button.classList.contains(`${className}-disabled`)).toBe(true);
    }
  });

  test("defaultOpen で初期状態を決める", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar defaultOpen={false} />);

    // 検証
    expect(
      screen.getByClassName("sui_sidebar").element().classList.contains("sui_sidebar-collapsed"),
    ).toBe(true);
  });

  test("制御された開閉状態に従う", async ({ expect }) => {
    // 準備
    const onOpenChange = vi.fn<(open: boolean) => void>();
    const screen = await render(<FullSidebar onOpenChange={onOpenChange} open={false} />);

    // 実行
    await screen.getByClassName("sui_sidebar_trigger").click();

    // 検証
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(true);
    expect(
      screen.getByClassName("sui_sidebar").element().classList.contains("sui_sidebar-collapsed"),
    ).toBe(true);
  });

  test("子要素を指定したトリガーは既定のアイコンとラベルを持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarTrigger>開閉</SidebarTrigger>
      </SidebarProvider>,
    );

    // 検証
    const trigger = screen.getByClassName("sui_sidebar_trigger").element();
    expect(trigger.textContent).toBe("開閉");
    expect(trigger.querySelector("svg")).toBe(null);
    expect(trigger.getAttribute("aria-label")).toBe(null);
  });

  test("既定のトリガーはアイコンを持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarTrigger />
      </SidebarProvider>,
    );

    // 検証
    expect(screen.getByClassName("sui_sidebar_trigger").element().querySelector("svg")).not.toBe(
      null,
    );
  });

  test("修飾をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<FullSidebar collapsible="icon" side="right" variant="floating" />);

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.classList.contains("sui_sidebar-side_right")).toBe(true);
    expect(root.classList.contains("sui_sidebar-variant_floating")).toBe(true);
    expect(root.classList.contains("sui_sidebar-collapsible_icon")).toBe(true);
  });

  test("render で別の要素に描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Sidebar defaultOpen>
        <Sidebar.Root render={<section />} />
      </Sidebar>,
    );

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.tagName).toBe("SECTION");
    expect(screen.getByClassName("sui_sidebar_provider").element().querySelector("section")).toBe(
      root,
    );
  });

  test("render 関数で状態を受け取る", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Sidebar defaultOpen>
        <Sidebar.Root
          render={(renderProps, state) => <section {...renderProps} data-state={state.state} />}
        />
      </Sidebar>,
    );

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-state")).toBe("expanded");
  });

  test("プロバイダーの render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider
        defaultOpen={false}
        render={(renderProps, state) => (
          <section {...renderProps} data-probe={`${String(state.open)}/${state.state}`} />
        )}
      />,
    );

    // 検証
    const provider = screen.getByClassName("sui_sidebar_provider").element();
    expect(provider.tagName).toBe("SECTION");
    expect(provider.getAttribute("data-probe")).toBe("false/collapsed");
  });

  test("ルートの render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Sidebar defaultOpen>
        <Sidebar.Root
          collapsible="icon"
          side="right"
          variant="floating"
          render={(renderProps, state) => (
            <section
              {...renderProps}
              data-probe={`${state.collapsible}/${state.side}/${state.variant}/${state.state}`}
            />
          )}
        />
      </Sidebar>,
    );

    // 検証
    const root = screen.getByClassName("sui_sidebar").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("icon/right/floating/expanded");
  });

  test("トリガーの render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarRoot collapsible="icon" side="right" variant="floating">
          <SidebarTrigger
            render={(renderProps, state) => (
              <button
                {...renderProps}
                data-probe={`${state.collapsible}/${state.side}/${state.variant}/${state.state}`}
              />
            )}
          />
        </SidebarRoot>
      </SidebarProvider>,
    );

    // 検証
    const trigger = screen.getByClassName("sui_sidebar_trigger").element();
    expect(trigger.getAttribute("data-probe")).toBe("icon/right/floating/expanded");
  });

  test("レールの render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SidebarProvider>
        <SidebarRoot collapsible="icon" side="right" variant="floating">
          <SidebarRail
            render={(renderProps, state) => (
              <button
                {...renderProps}
                data-probe={`${state.collapsible}/${state.side}/${state.variant}/${state.state}`}
              />
            )}
          />
        </SidebarRoot>
      </SidebarProvider>,
    );

    // 検証
    const rail = screen.getByClassName("sui_sidebar_rail").element();
    expect(rail.getAttribute("data-probe")).toBe("icon/right/floating/expanded");
  });

  test("公開パーツとフックを静的メンバーに持つ", ({ expect }) => {
    // 検証
    expect(Sidebar.Provider).toBe(SidebarProvider);
    expect(Sidebar.Root).toBe(SidebarRoot);
    expect(Sidebar.Header).toBe(SidebarHeader);
    expect(Sidebar.Content).toBe(SidebarContent);
    expect(Sidebar.Footer).toBe(SidebarFooter);
    expect(Sidebar.Group).toBe(SidebarGroup);
    expect(Sidebar.GroupLabel).toBe(SidebarGroupLabel);
    expect(Sidebar.GroupContent).toBe(SidebarGroupContent);
    expect(Sidebar.Inset).toBe(SidebarInset);
    expect(Sidebar.Rail).toBe(SidebarRail);
    expect(Sidebar.Trigger).toBe(SidebarTrigger);
    expect(Sidebar.useContext).toBe(useSidebarContext);
  });

  test("slotProps.provider を Provider へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Sidebar id="provider" slotProps={{ provider: { "aria-label": "サイドバー" } }} />,
    );

    // 検証
    const provider = screen.container.querySelector<HTMLElement>("#provider")!;
    expect(provider.classList.contains("sui_sidebar_provider")).toBe(true);
    expect(provider.getAttribute("aria-label")).toBe("サイドバー");
  });

  test("useSidebarAPI が Provider の props を作る", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useSidebarAPI({
        id: "provider",
        slotProps: { provider: { "aria-label": "サイドバー" } },
      });

      return <SidebarProvider {...api.getProviderProps()} />;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    const provider = screen.container.querySelector<HTMLElement>("#provider")!;
    expect(provider.getAttribute("aria-label")).toBe("サイドバー");
  });

  test("API から Provider の props を取得できる", ({ expect }) => {
    // 準備
    const api = new SidebarAPI({
      defaultOpen: false,
      slotProps: { provider: { id: "provider" } },
    });

    // 実行
    const props = api.getProviderProps();

    // 検証
    expect(props.defaultOpen).toBe(false);
    expect(props.id).toBe("provider");
  });
});
