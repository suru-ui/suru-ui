import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { DrawerBackdrop } from "./backdrop/drawer.backdrop.jsx";
import { DrawerBody } from "./body/drawer.body.jsx";
import { DrawerClose } from "./close/drawer.close.jsx";
import { DrawerContent } from "./content/drawer.content.jsx";
import { DrawerControls } from "./controls/drawer.controls.jsx";
import { DrawerDescription } from "./description/drawer.description.jsx";
import { DrawerFooter } from "./footer/drawer.footer.jsx";
import { DrawerHeader } from "./header/drawer.header.jsx";
import { DrawerPopup } from "./popup/drawer.popup.jsx";
import { DrawerPortal } from "./portal/drawer.portal.jsx";
import { DrawerRoot } from "./root/drawer.root.jsx";
import { DrawerSwipeArea } from "./swipe-area/drawer.swipe-area.jsx";
import { DrawerTitle } from "./title/drawer.title.jsx";
import { DrawerTrigger } from "./trigger/drawer.trigger.jsx";
import { DrawerViewport } from "./viewport/drawer.viewport.jsx";
import "./drawer.parts.js";
import "../../tests/src/_locators.js";

/**
 * 開いた状態のドロワーを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderDrawer(children: React.ReactNode) {
  return render(
    <DrawerRoot defaultOpen>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerViewport>
          <DrawerPopup>
            <DrawerContent>{children}</DrawerContent>
          </DrawerPopup>
        </DrawerViewport>
      </DrawerPortal>
    </DrawerRoot>,
  );
}

describe("DrawerPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerTitle>見出し</DrawerTitle>
      </DrawerHeader>,
    );

    // 検証
    const portal = screen.getByClassName("sui_drawer_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("DrawerBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerTitle>見出し</DrawerTitle>
      </DrawerHeader>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_drawer_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("DrawerViewport", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerTitle>見出し</DrawerTitle>
      </DrawerHeader>,
    );

    // 検証
    const viewport = screen.getByClassName("sui_drawer_viewport").element();
    expect(viewport.tagName).toBe("DIV");
  });
});

describe("DrawerPopup", () => {
  test("スワイプ方向のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerTitle>見出し</DrawerTitle>
      </DrawerHeader>,
    );

    // 検証
    const popup = screen.getByClassName("sui_drawer_popup").element();
    expect(popup.classList.contains("sui_drawer_popup-swipe_direction_down")).toBe(true);
  });
});

describe("DrawerContent", () => {
  test("コンテンツを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(<span>内容</span>);

    // 検証
    const content = screen.getByClassName("sui_drawer_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("内容");
  });
});

describe("DrawerHeader", () => {
  test("ヘッダーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <span>内容</span>
      </DrawerHeader>,
    );

    // 検証
    const header = screen.getByClassName("sui_drawer_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.textContent).toBe("内容");
  });
});

describe("DrawerTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerTitle>見出し</DrawerTitle>
      </DrawerHeader>,
    );

    // 検証
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_drawer_title")).toBe(true);
  });
});

describe("DrawerDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerDescription>説明</DrawerDescription>
      </DrawerHeader>,
    );

    // 検証
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_drawer_description")).toBe(true);
  });
});

describe("DrawerBody", () => {
  test("本文を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(<DrawerBody>本文</DrawerBody>);

    // 検証
    const body = screen.getByClassName("sui_drawer_body").element();
    expect(body.tagName).toBe("DIV");
    expect(body.textContent).toBe("本文");
  });
});

describe("DrawerFooter", () => {
  test("フッターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerFooter>
        <span>操作</span>
      </DrawerFooter>,
    );

    // 検証
    const footer = screen.getByClassName("sui_drawer_footer").element();
    expect(footer.tagName).toBe("DIV");
    expect(footer.textContent).toBe("操作");
  });
});

describe("DrawerControls", () => {
  test("既定では絶対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerControls>操作</DrawerControls>
      </DrawerHeader>,
    );

    // 検証
    const controls = screen.getByClassName("sui_drawer_controls").element();
    expect(controls.classList.contains("sui_drawer_controls-absolute")).toBe(true);
    expect(controls.classList.contains("sui_drawer_controls-relative")).toBe(false);
  });

  test("指定すると相対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerHeader>
        <DrawerControls absolute={false}>操作</DrawerControls>
      </DrawerHeader>,
    );

    // 検証
    const controls = screen.getByClassName("sui_drawer_controls").element();
    expect(controls.classList.contains("sui_drawer_controls-relative")).toBe(true);
  });
});

describe("DrawerTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DrawerRoot>
        <DrawerTrigger>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </DrawerTrigger>
      </DrawerRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.classList.contains("sui_drawer_trigger")).toBe(true);
  });
});

describe("DrawerClose", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDrawer(
      <DrawerClose>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </DrawerClose>,
    );

    // 検証
    const close = screen.getByRole("button", { name: "閉じる" }).element();
    expect(close.classList.contains("sui_drawer_close")).toBe(true);
  });
});

describe("DrawerSwipeArea", () => {
  test("スワイプ方向のクラスを付けて描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DrawerRoot swipeDirection="right">
        <DrawerSwipeArea />
      </DrawerRoot>,
    );

    // 検証
    const swipeArea = screen.getByClassName("sui_drawer_swipe_area").element();
    expect(swipeArea.tagName).toBe("DIV");
    expect(swipeArea.classList.contains("sui_drawer_swipe_area-swipe_direction_left")).toBe(true);
  });
});
