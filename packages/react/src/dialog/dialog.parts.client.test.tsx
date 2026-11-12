import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { DialogAction } from "./action/dialog.action.jsx";
import { DialogBackdrop } from "./backdrop/dialog.backdrop.jsx";
import { DialogCloseTrigger } from "./close-trigger/dialog.close-trigger.jsx";
import { DialogContent } from "./content/dialog.content.jsx";
import { DialogDescription } from "./description/dialog.description.jsx";
import { DialogFooter } from "./footer/dialog.footer.jsx";
import { DialogHeader } from "./header/dialog.header.jsx";
import { type DialogPopupProps, DialogPopup } from "./popup/dialog.popup.jsx";
import { DialogPortal } from "./portal/dialog.portal.jsx";
import { DialogRoot } from "./root/dialog.root.jsx";
import { DialogTitle } from "./title/dialog.title.jsx";
import { DialogToggleTrigger } from "./toggle-trigger/dialog.toggle-trigger.jsx";
import { DialogViewport } from "./viewport/dialog.viewport.jsx";
import "./dialog.parts.js";
import "../../tests/src/_locators.js";

/**
 * 開いた状態のダイアログを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderDialog(children: React.ReactNode, props?: DialogPopupProps) {
  return render(
    <DialogRoot defaultOpen>
      <DialogPortal>
        <DialogBackdrop />
        <DialogViewport>
          <DialogPopup {...props}>{children}</DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>,
  );
}

describe("DialogPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証。
    const portal = screen.getByClassName("sui_dialog_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("DialogBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証。
    const backdrop = screen.getByClassName("sui_dialog_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("DialogViewport", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証。
    const viewport = screen.getByClassName("sui_dialog_viewport").element();
    expect(viewport.tagName).toBe("DIV");
  });
});

describe("DialogHeader", () => {
  test("カードのヘッダーとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogHeader>
        <span>内容</span>
      </DialogHeader>,
    );

    // 検証。
    const header = screen.getByClassName("sui_dialog_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.classList.contains("sui_card_header")).toBe(true);
    expect(header.textContent).toBe("内容");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogHeader
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_header").element().getAttribute("data-probe")).toBe(
      "sm/lg/stacked/true",
    );
  });

  test("className と style の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogHeader
        style={(state) => ({ opacity: state.outlined ? "0.5" : "1" })}
        className={(state) => `probe-variant_${state.variant}`}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    const header = screen.getByClassName("sui_dialog_header").element();
    expect(header.classList.contains("probe-variant_stacked")).toBe(true);
    expect(header.style.opacity).toBe("0.5");
  });
});

describe("DialogTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogTitle>見出し</DialogTitle>);

    // 検証。
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_card_title")).toBe(true);
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogTitle
        render={(props, state) => (
          // oxlint-disable-next-line jsx-a11y/heading-has-content
          <h2
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_title").element().getAttribute("data-probe")).toBe(
      "sm/lg/stacked/true",
    );
  });
});

describe("DialogDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogDescription>説明</DialogDescription>);

    // 検証。
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_card_description")).toBe(true);
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogDescription
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(
      screen.getByClassName("sui_dialog_description").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("DialogAction", () => {
  test("カードの操作要素として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogAction>操作</DialogAction>);

    // 検証。
    const action = screen.getByClassName("sui_dialog_action").element();
    expect(action.tagName).toBe("DIV");
    expect(action.classList.contains("sui_card_action")).toBe(true);
    expect(action.textContent).toBe("操作");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogAction
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_action").element().getAttribute("data-probe")).toBe(
      "sm/lg/stacked/true",
    );
  });
});

describe("DialogContent", () => {
  test("カードの本文として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(<DialogContent title="説明">本文</DialogContent>);

    // 検証。
    const content = screen.getByClassName("sui_dialog_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.classList.contains("sui_card_content")).toBe(true);
    expect(content.textContent).toBe("本文");
    expect(content.getAttribute("title")).toBe("説明");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogContent
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_content").element().getAttribute("data-probe")).toBe(
      "sm/lg/stacked/true",
    );
  });
});

describe("DialogFooter", () => {
  test("カードのフッターとして描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogFooter>
        <span>操作</span>
      </DialogFooter>,
    );

    // 検証。
    const footer = screen.getByClassName("sui_dialog_footer").element();
    expect(footer.tagName).toBe("DIV");
    expect(footer.classList.contains("sui_card_footer")).toBe(true);
    expect(footer.textContent).toBe("操作");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogFooter
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      {
        size: "sm",
        radius: "lg",
        variant: "stacked",
        outlined: true,
      },
    );

    // 検証。
    expect(screen.getByClassName("sui_dialog_footer").element().getAttribute("data-probe")).toBe(
      "sm/lg/stacked/true",
    );
  });
});

describe("DialogToggleTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行。
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

    // 検証。
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.classList.contains("sui_dialog_trigger")).toBe(true);
  });
});

describe("DialogCloseTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderDialog(
      <DialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </DialogCloseTrigger>,
    );

    // 検証。
    const close = screen.getByRole("button", { name: "閉じる" }).element();
    expect(close.classList.contains("sui_dialog_close")).toBe(true);
  });
});
