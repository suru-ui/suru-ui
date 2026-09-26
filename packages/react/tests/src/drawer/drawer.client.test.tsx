import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { type DrawerProps, Drawer } from "../../../src/drawer/drawer.jsx";
import "../_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = <button type="button">開く</button>;

describe("Drawer", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Drawer title="見出し" trigger={triggerButton} />);

    // 検証
    expect(screen.getByRole("dialog").query()).toBe(null);
  });

  test("トリガーを押すと開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer description="説明文です。" title="見出し" trigger={triggerButton} />,
    );
    await screen.getByRole("button", { name: "開く" }).click();

    // 検証
    expect(screen.getByRole("dialog", { name: "見出し" }).query()).not.toBe(null);
  });

  test("見出しと説明を関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Drawer defaultOpen description="説明文です。" title="見出し" />);

    // 検証
    const dialog = screen.getByRole("dialog", { name: "見出し" }).element();
    expect(dialog.getAttribute("aria-describedby")).toBeDefined();
  });

  test("閉じるアイコンボタンで閉じてコールバックを呼ぶ", async ({ expect }) => {
    // 準備
    const onClose = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(<Drawer defaultOpen onClose={onClose} title="見出し" />);

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(onClose).toHaveBeenCalledTimes(1);
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("既定を防ぐとコールバックを呼ばない", async ({ expect }) => {
    // 準備
    const onClose = vi.fn<React.MouseEventHandler<HTMLButtonElement>>();
    const screen = await render(
      <Drawer
        defaultOpen
        onClose={onClose}
        slotProps={{ close: { onClick: (evt) => evt.preventDefault() } }}
        title="見出し"
      />,
    );

    // 実行
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    expect(onClose).not.toHaveBeenCalled();
  });

  test("閉じるアイコンボタンを表示しない指定ができる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Drawer defaultOpen showCloseIconButton={false} title="見出し" />);

    // 検証
    expect(screen.getByRole("button", { name: "閉じる" }).query()).toBe(null);
  });

  test("本文と操作を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen controls="操作" title="見出し">
        本文
      </Drawer>,
    );

    // 検証
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer
        defaultOpen
        controls="操作"
        description="説明"
        footer={closeButton}
        title="見出し"
        slotProps={{
          backdrop: { id: "backdrop" },
          body: { id: "body" },
          content: { id: "content" },
          controls: { id: "controls" },
          description: { id: "description" },
          footer: { id: "footer" },
          header: { id: "header" },
          popup: { id: "popup" },
          portal: { id: "portal" },
          title: { id: "title" },
          viewport: { id: "viewport" },
        }}
      >
        本文
      </Drawer>,
    );

    // 検証
    expect(screen.getByClassName("sui_drawer_backdrop").element().id).toBe("backdrop");
    expect(screen.getByClassName("sui_drawer_body").element().id).toBe("body");
    expect(screen.getByClassName("sui_drawer_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_drawer_controls").element().id).toBe("controls");
    expect(screen.getByClassName("sui_drawer_description").element().id).toBe("description");
    expect(screen.getByClassName("sui_drawer_footer").element().id).toBe("footer");
    expect(screen.getByClassName("sui_drawer_header").element().id).toBe("header");
    expect(screen.getByClassName("sui_drawer_popup").element().id).toBe("popup");
    expect(screen.getByClassName("sui_drawer_portal").element().id).toBe("portal");
    expect(screen.getByClassName("sui_drawer_title").element().id).toBe("title");
    expect(screen.getByClassName("sui_drawer_viewport").element().id).toBe("viewport");
  });

  test("slotProps.header だけでヘッダーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen showCloseIconButton={false} slotProps={{ header: { id: "header" } }}>
        本文
      </Drawer>,
    );

    // 検証
    expect(screen.getByClassName("sui_drawer_header").element().id).toBe("header");
  });

  test("slotProps.swipeArea でスワイプ領域を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen slotProps={{ swipeArea: { id: "swipe-area" } }} title="見出し" />,
    );

    // 検証
    expect(screen.getByClassName("sui_drawer_swipe_area").element().id).toBe("swipe-area");
  });

  test("slotProps.virtualKeyboardProvider でキーボード対応を有効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen slotProps={{ virtualKeyboardProvider: {} }} title="見出し" />,
    );

    // 検証
    expect(screen.getByRole("dialog", { name: "見出し" }).query()).not.toBe(null);
  });

  test("外側を押すと閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<Drawer defaultOpen title="見出し" />);
    await screen.getByClassName("sui_drawer_backdrop").click({ position: { x: 4, y: 4 } });

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("外側を押しても閉じない指定ができる", async ({ expect }) => {
    // 準備
    const onOpenChange = vi.fn<NonNullable<DrawerProps["onOpenChange"]>>();
    const screen = await render(
      <Drawer defaultOpen disablePointerDismissal onOpenChange={onOpenChange} title="見出し" />,
    );

    // 実行
    screen
      .getByClassName("sui_drawer_backdrop")
      .element()
      .dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
    await new Promise((resolve) => setTimeout(resolve, 120));

    // 検証
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog").query()).not.toBe(null);
  });

  test("Escape を押すと閉じる", async ({ expect }) => {
    // 準備
    const onOpenChange = vi.fn<NonNullable<DrawerProps["onOpenChange"]>>();
    const screen = await render(<Drawer defaultOpen title="見出し" onOpenChange={onOpenChange} />);

    // 実行
    await userEvent.keyboard("{Escape}");

    // 検証
    await vi.waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledTimes(1);
    });
    expect(onOpenChange.mock.calls[0]?.[0]).toBe(false);
    expect(onOpenChange.mock.calls[0]?.[1].reason).toBe("escape-key");
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("ハンドルで開閉する", async ({ expect }) => {
    // 準備
    const handle = Drawer.createHandle();
    const screen = await render(
      <>
        <button type="button" onClick={() => handle.open(null)}>
          開く
        </button>
        <button type="button" onClick={() => handle.close()}>
          閉じる
        </button>
        <Drawer handle={handle} title="見出し" />
      </>,
    );

    // 実行と検証
    await screen.getByRole("button", { name: "開く" }).click();
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).not.toBe(null);
    });
    await screen.getByRole("button", { name: "閉じる" }).click();
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });

  test("スナップポイントを指定して開ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Drawer defaultOpen defaultSnapPoint={0.5} snapPoints={[0.5, 1]} title="見出し" />,
    );

    // 検証
    expect(screen.getByRole("dialog", { name: "見出し" }).query()).not.toBe(null);
  });
});
