import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { Drawer } from "../../../src/drawer/drawer.jsx";
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
});
