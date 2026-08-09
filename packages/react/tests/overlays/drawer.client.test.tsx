import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Button } from "../../src/buttons/button/index.js";
import { Drawer } from "../../src/overlays/drawer/index.js";
import * as DrawerParts from "../../src/overlays/drawer/index.js";
import { clickElement } from "../_click.js";

describe("Drawer", () => {
  test("トリガーをクリックするとドロワーが開く", async () => {
    // 実行
    const screen = await render(
      <Drawer
        trigger={<Button>通知を見る</Button>}
        title="通知"
        description="新しい通知はありません。"
      />,
    );
    const trigger = screen.getByRole("button", { name: "通知を見る" });

    // 検証
    await expect.element(trigger).toHaveClass("sui_drawer_trigger");
    await expect.element(screen.getByRole("dialog")).not.toBeInTheDocument();

    // 実行
    clickElement(trigger);

    // 検証
    const drawer = screen.getByRole("dialog");
    await expect.element(drawer).toHaveClass("sui_drawer_popup");
    await expect.element(screen.getByRole("heading", { name: "通知" })).toBeInTheDocument();
    await expect.element(screen.getByText("新しい通知はありません。")).toBeInTheDocument();
    await expect.element(screen.getByLabelText("閉じる")).toBeInTheDocument();
  });

  test("方向を指定しない場合は左から表示される", async () => {
    // 実行
    const screen = await render(<Drawer defaultOpen title="通知" />);

    // 検証
    await expect
      .element(screen.getByRole("dialog"))
      .toHaveAttribute("data-swipe-direction", "left");
  });

  test.each(["up", "down", "left", "right"] as const)(
    "%s を指定すると表示方向を変更できる",
    async (swipeDirection) => {
      // 実行
      const screen = await render(<Drawer defaultOpen swipeDirection={swipeDirection} />);

      // 検証
      await expect
        .element(screen.getByRole("dialog"))
        .toHaveAttribute("data-swipe-direction", swipeDirection);
    },
  );

  test("右上の閉じるボタンで onClose が呼ばれて閉じる", async () => {
    // 準備
    const results: string[] = [];

    // 実行
    const screen = await render(
      <Drawer
        defaultOpen
        title="通知"
        onClose={(event) => {
          results.push(event.type);
        }}
      />,
    );
    const drawer = screen.getByRole("dialog");
    const closeButton = screen.getByLabelText("閉じる");

    // 検証
    await expect.element(closeButton).toHaveClass("sui_drawer_close_button");

    // 実行
    clickElement(closeButton);

    // 検証
    await expect.element(drawer).not.toBeInTheDocument();
    expect(results).toStrictEqual(["click"]);
  });

  test("slotProps で各パーツにプロパティーを適用できる", async () => {
    // 実行
    const screen = await render(
      <Drawer
        trigger={<Button>開く</Button>}
        title="通知"
        description="説明"
        slotProps={{
          trigger: { className: "custom-trigger" },
          popup: { className: "custom-popup" },
          content: { className: "custom-content" },
          title: { className: "custom-title" },
          description: { className: "custom-description" },
          backdrop: { className: "custom-backdrop" },
        }}
      />,
    );
    const trigger = screen.getByRole("button", { name: "開く" });

    // 検証
    await expect.element(trigger).toHaveClass("custom-trigger");

    // 実行
    clickElement(trigger);

    // 検証
    await expect.element(screen.getByRole("dialog")).toHaveClass("custom-popup");
    await expect.element(screen.getByRole("heading", { name: "通知" })).toHaveClass("custom-title");
    await expect.element(screen.getByText("説明")).toHaveClass("custom-description");
    const content = screen
      .getByRole("dialog")
      .element()
      .querySelector<HTMLElement>(".sui_drawer_content");

    expect(content).not.toBeNull();
    await expect.element(content as HTMLElement).toHaveClass("custom-content");
    const backdrop = screen
      .getByRole("dialog")
      .element()
      .ownerDocument.querySelector<HTMLElement>(".sui_drawer_backdrop");

    expect(backdrop).not.toBeNull();
    await expect.element(backdrop as HTMLElement).toHaveClass("custom-backdrop");
  });

  test("Esc キーでドロワーが閉じる", async () => {
    // 実行
    const screen = await render(<Drawer defaultOpen title="通知" />);
    const drawer = screen.getByRole("dialog");

    await userEvent.keyboard("{Escape}");

    // 検証
    await expect.element(drawer).not.toBeInTheDocument();
  });
});

describe("DrawerParts", () => {
  test("Base UI のパーツを組み合わせて開閉できる", async () => {
    // 実行
    const handle = DrawerParts.createHandle();
    const screen = await render(
      <DrawerParts.Root handle={handle}>
        <DrawerParts.Trigger handle={handle}>開く</DrawerParts.Trigger>
        <DrawerParts.Portal>
          <DrawerParts.Backdrop />
          <DrawerParts.Viewport>
            <DrawerParts.Popup>
              <DrawerParts.Content>
                <DrawerParts.Title>確認</DrawerParts.Title>
                <DrawerParts.Description>説明</DrawerParts.Description>
                <DrawerParts.Close>閉じる</DrawerParts.Close>
              </DrawerParts.Content>
            </DrawerParts.Popup>
          </DrawerParts.Viewport>
        </DrawerParts.Portal>
      </DrawerParts.Root>,
    );
    const trigger = screen.getByRole("button", { name: "開く" });

    // 検証
    await expect.element(trigger).toHaveClass("sui_drawer_trigger");

    // 実行
    clickElement(trigger);

    // 検証
    const drawer = screen.getByRole("dialog");
    await expect.element(drawer).toHaveClass("sui_drawer_popup");
    await expect
      .element(screen.getByRole("heading", { name: "確認" }))
      .toHaveClass("sui_drawer_title");
    await expect
      .element(screen.getByRole("button", { name: "閉じる" }))
      .toHaveClass("sui_drawer_close");

    // 実行
    clickElement(screen.getByRole("button", { name: "閉じる" }));

    // 検証
    await expect.element(drawer).not.toBeInTheDocument();
  });

  test("Provider と Indent が開閉状態を受け取る", async () => {
    // 実行
    const handle = DrawerParts.createHandle();
    const screen = await render(
      <DrawerParts.Provider>
        <DrawerParts.IndentBackground />
        <DrawerParts.Indent>
          <DrawerParts.Root handle={handle}>
            <DrawerParts.Trigger handle={handle}>開く</DrawerParts.Trigger>
            <DrawerParts.Portal>
              <DrawerParts.Viewport>
                <DrawerParts.Popup>
                  <DrawerParts.Content>
                    <DrawerParts.Title>通知</DrawerParts.Title>
                  </DrawerParts.Content>
                </DrawerParts.Popup>
              </DrawerParts.Viewport>
            </DrawerParts.Portal>
          </DrawerParts.Root>
        </DrawerParts.Indent>
      </DrawerParts.Provider>,
    );

    // 実行
    clickElement(screen.getByRole("button", { name: "開く" }));

    // 検証
    await expect.element(screen.getByRole("dialog")).toBeInTheDocument();
    await expect
      .element(screen.container.querySelector(".sui_drawer_indent") as HTMLElement)
      .toHaveAttribute("data-active", "");
    await expect
      .element(screen.container.querySelector(".sui_drawer_indent_background") as HTMLElement)
      .toHaveAttribute("data-active", "");
  });
});
