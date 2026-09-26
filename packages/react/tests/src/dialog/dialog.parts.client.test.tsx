import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { DialogBackdrop } from "../../../src/dialog/dialog.backdrop.jsx";
import { DialogBody } from "../../../src/dialog/dialog.body.jsx";
import { DialogCloseTrigger } from "../../../src/dialog/dialog.close-trigger.jsx";
import { DialogContent } from "../../../src/dialog/dialog.content.jsx";
import { DialogControls } from "../../../src/dialog/dialog.controls.jsx";
import { DialogDescription } from "../../../src/dialog/dialog.description.jsx";
import { DialogFooter } from "../../../src/dialog/dialog.footer.jsx";
import { DialogHeader } from "../../../src/dialog/dialog.header.jsx";
import { DialogPortal } from "../../../src/dialog/dialog.portal.jsx";
import { DialogRoot } from "../../../src/dialog/dialog.root.jsx";
import { DialogTitle } from "../../../src/dialog/dialog.title.jsx";
import { DialogToggleTrigger } from "../../../src/dialog/dialog.toggle-trigger.jsx";
import { DialogViewport } from "../../../src/dialog/dialog.viewport.jsx";
import "../../../src/dialog/dialog.parts.js";
import "../_locators.js";

/**
 * 開いた状態のダイアログを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderDialog(children: React.ReactNode) {
  return render(
    <DialogRoot defaultOpen>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogContent>{children}</DialogContent>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>,
  );
}

describe("DialogPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証
    const portal = screen.getByClassName("sui_dialog_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("DialogBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証
    const backdrop = screen.getByClassName("sui_dialog_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("DialogViewport", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証
    const viewport = screen.getByClassName("sui_dialog_viewport").element();
    expect(viewport.tagName).toBe("DIV");
    expect(viewport.getAttribute("role")).toBe("presentation");
  });
});

describe("DialogHeader", () => {
  test("ヘッダーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <DialogHeader>
        <span>内容</span>
      </DialogHeader>,
    );

    // 検証
    const header = screen.getByClassName("sui_dialog_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.textContent).toBe("内容");
  });
});

describe("DialogTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_dialog_title")).toBe(true);
  });

  test("ポップアップのラベルに関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証
    const content = screen.getByRole("dialog").element();
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(content.getAttribute("aria-labelledby")).toBe(title.id);
  });
});

describe("DialogDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogDescription>説明</DialogDescription>);

    // 検証
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_dialog_description")).toBe(true);
  });

  test("ポップアップの説明に関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogDescription>説明</DialogDescription>);

    // 検証
    const content = screen.getByRole("dialog").element();
    const description = screen.getByText("説明").element();
    expect(content.getAttribute("aria-describedby")).toBe(description.id);
  });
});

describe("DialogBody", () => {
  test("本文を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogBody title="説明">本文</DialogBody>);

    // 検証
    const body = screen.getByClassName("sui_dialog_body").element();
    expect(body.tagName).toBe("DIV");
    expect(body.textContent).toBe("本文");
    expect(body.getAttribute("title")).toBe("説明");
  });
});

describe("DialogFooter", () => {
  test("フッターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <DialogFooter>
        <span>操作</span>
      </DialogFooter>,
    );

    // 検証
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(footer.tagName).toBe("DIV");
    expect(footer.textContent).toBe("操作");
  });
});

describe("DialogControls", () => {
  test("既定では相対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogControls>操作</DialogControls>);

    // 検証
    const controls = screen.getByClassName("sui_dialog_controls").element();
    expect(controls.classList.contains("sui_dialog_controls-relative")).toBe(true);
    expect(controls.classList.contains("sui_dialog_controls-absolute")).toBe(false);
  });

  test("指定すると絶対配置にする", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<DialogControls absolute>操作</DialogControls>);

    // 検証
    const controls = screen.getByClassName("sui_dialog_controls").element();
    expect(controls.classList.contains("sui_dialog_controls-absolute")).toBe(true);
  });
});

describe("DialogToggleTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <DialogRoot>
        <DialogToggleTrigger>
          {(props) => (
            <button type="button" {...props}>
              開く
            </button>
          )}
        </DialogToggleTrigger>
      </DialogRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.classList.contains("sui_dialog_trigger")).toBe(true);
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });
});

describe("DialogCloseTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <DialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </DialogCloseTrigger>,
    );

    // 検証
    const close = screen.getByRole("button", { name: "閉じる" }).element();
    expect(close.classList.contains("sui_dialog_close")).toBe(true);
  });

  test("押すとダイアログを閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <DialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </DialogCloseTrigger>,
    );
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });
});
