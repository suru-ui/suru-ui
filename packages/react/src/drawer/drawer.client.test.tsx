import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Drawer } from "./drawer.jsx";
import "../../tests/src/_locators.js";

const closeButton = <button type="button">閉じる</button>;

const triggerButton = <button type="button">開く</button>;
describe("Drawer", () => {
  test("既定では閉じている", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Drawer title="見出し" trigger={triggerButton} />);

    // 検証。
    expect(screen.getByRole("dialog").query()).toBe(null);
  });

  test("閉じるアイコンボタンを表示しない指定ができる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Drawer title="見出し" defaultOpen showCloseIconButton={false} />);

    // 検証。
    expect(screen.getByRole("button", { name: "閉じる" }).query()).toBe(null);
  });

  test("本文と操作を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Drawer title="見出し" controls="操作" defaultOpen>
        本文
      </Drawer>,
    );

    // 検証。
    expect(screen.getByText("本文").query()?.textContent).toBe("本文");
    expect(screen.getByText("操作").query()?.textContent).toBe("操作");
  });

  test("slotProps で各パーツに props を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Drawer
        title="見出し"
        footer={closeButton}
        controls="操作"
        slotProps={{
          body: { id: "body" },
          popup: { id: "popup" },
          title: { id: "title" },
          footer: { id: "footer" },
          header: { id: "header" },
          portal: { id: "portal" },
          content: { id: "content" },
          backdrop: { id: "backdrop" },
          controls: { id: "controls" },
          viewport: { id: "viewport" },
          description: { id: "description" },
        }}
        defaultOpen
        description="説明"
      >
        本文
      </Drawer>,
    );

    // 検証。
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
    // 準備と実行。
    const screen = await render(
      <Drawer slotProps={{ header: { id: "header" } }} defaultOpen showCloseIconButton={false}>
        本文
      </Drawer>,
    );

    // 検証。
    expect(screen.getByClassName("sui_drawer_header").element().id).toBe("header");
  });

  test("slotProps.swipeArea でスワイプ領域を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Drawer title="見出し" slotProps={{ swipeArea: { id: "swipe-area" } }} defaultOpen />,
    );

    // 検証。
    expect(screen.getByClassName("sui_drawer_swipe_area").element().id).toBe("swipe-area");
  });

  test("showSwipeHandle でスワイプハンドルを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Drawer title="見出し" defaultOpen showSwipeHandle />);

    // 検証。
    expect(screen.getByClassName("sui_drawer_swipe_handle").query()).not.toBe(null);
  });

  test("slotProps.swipeHandle でスワイプハンドルを表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Drawer title="見出し" slotProps={{ swipeHandle: { id: "swipe-handle" } }} defaultOpen />,
    );

    // 検証。
    expect(screen.getByClassName("sui_drawer_swipe_handle").element().id).toBe("swipe-handle");
  });

  test("slotProps.virtualKeyboardProvider でキーボード対応を有効にする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Drawer title="見出し" slotProps={{ virtualKeyboardProvider: {} }} defaultOpen />,
    );

    // 検証。
    expect(screen.getByRole("dialog", { name: "見出し" }).query()).not.toBe(null);
  });
});
