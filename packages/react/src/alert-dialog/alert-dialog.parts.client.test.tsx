import * as React from "react";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { AlertDialogAction } from "./action/alert-dialog.action.jsx";
import { AlertDialogBackdrop } from "./backdrop/alert-dialog.backdrop.jsx";
import { AlertDialogCloseTrigger } from "./close-trigger/alert-dialog.close-trigger.jsx";
import { AlertDialogContent } from "./content/alert-dialog.content.jsx";
import { AlertDialogDescription } from "./description/alert-dialog.description.jsx";
import { AlertDialogFooter } from "./footer/alert-dialog.footer.jsx";
import { AlertDialogHeader } from "./header/alert-dialog.header.jsx";
import { type AlertDialogPopupProps, AlertDialogPopup } from "./popup/alert-dialog.popup.jsx";
import { AlertDialogPortal } from "./portal/alert-dialog.portal.jsx";
import { AlertDialogRoot } from "./root/alert-dialog.root.jsx";
import { AlertDialogTitle } from "./title/alert-dialog.title.jsx";
import { AlertDialogToggleTrigger } from "./toggle-trigger/alert-dialog.toggle-trigger.jsx";
import { AlertDialogViewport } from "./viewport/alert-dialog.viewport.jsx";
import "./alert-dialog.parts.js";
import "../../tests/src/_locators.js";

/**
 * 開いた状態のアラートダイアログを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderDialog(children: React.ReactNode, props?: AlertDialogPopupProps) {
  return render(
    <AlertDialogRoot defaultOpen>
      <AlertDialogPortal>
        <AlertDialogBackdrop />
        <AlertDialogViewport>
          <AlertDialogPopup {...props}>{children}</AlertDialogPopup>
        </AlertDialogViewport>
      </AlertDialogPortal>
    </AlertDialogRoot>,
  );
}

describe("AlertDialogPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const portal = screen.getByClassName("sui_alert_dialog_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });
});

describe("AlertDialogBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const backdrop = screen.getByClassName("sui_alert_dialog_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });
});

describe("AlertDialogViewport", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const viewport = screen.getByClassName("sui_alert_dialog_viewport").element();
    expect(viewport.tagName).toBe("DIV");
  });
});

describe("AlertDialogHeader", () => {
  test("カードのヘッダーとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogHeader>
        <span>内容</span>
      </AlertDialogHeader>,
    );

    // 検証
    const header = screen.getByClassName("sui_alert_dialog_header").element();
    expect(header.tagName).toBe("DIV");
    expect(header.classList.contains("sui_card_header")).toBe(true);
    expect(header.textContent).toBe("内容");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogHeader
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_header").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });

  test("className と style の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogHeader
        style={(state) => ({ opacity: state.outlined ? "0.5" : "1" })}
        className={(state) => `probe-variant_${state.variant}`}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    const header = screen.getByClassName("sui_alert_dialog_header").element();
    expect(header.classList.contains("probe-variant_stacked")).toBe(true);
    expect(header.style.opacity).toBe("0.5");
  });
});

describe("AlertDialogTitle", () => {
  test("見出しとして描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogTitle>見出し</AlertDialogTitle>);

    // 検証
    const title = screen.getByRole("heading", { name: "見出し" }).element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_card_title")).toBe(true);
    expect(title.classList.contains("sui_alert_dialog_title")).toBe(true);
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogTitle
        render={(props, state) => (
          // oxlint-disable-next-line jsx-a11y/heading-has-content
          <h2
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_title").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("AlertDialogDescription", () => {
  test("説明文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogDescription>説明</AlertDialogDescription>);

    // 検証
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_card_description")).toBe(true);
    expect(description.classList.contains("sui_alert_dialog_description")).toBe(true);
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogDescription
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_description").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("AlertDialogContent", () => {
  test("カードの本文として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogContent title="説明">本文</AlertDialogContent>);

    // 検証
    const content = screen.getByClassName("sui_alert_dialog_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.classList.contains("sui_card_content")).toBe(true);
    expect(content.textContent).toBe("本文");
    expect(content.getAttribute("title")).toBe("説明");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogContent
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_content").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("AlertDialogFooter", () => {
  test("フッターを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogFooter>
        <span>操作</span>
      </AlertDialogFooter>,
    );

    // 検証
    const footer = screen.getByClassName("sui_alert_dialog_footer").element();
    expect(footer.tagName).toBe("DIV");
    expect(footer.classList.contains("sui_card_footer")).toBe(true);
    expect(footer.textContent).toBe("操作");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogFooter
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_footer").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("AlertDialogAction", () => {
  test("カードの操作要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(<AlertDialogAction>操作</AlertDialogAction>);

    // 検証
    const action = screen.getByClassName("sui_alert_dialog_action").element();
    expect(action.tagName).toBe("DIV");
    expect(action.classList.contains("sui_card_action")).toBe(true);
    expect(action.textContent).toBe("操作");
  });

  test("render の関数へポップアップの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogAction
        render={(props, state) => (
          <div
            {...props}
            data-probe={`${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      />,
      { size: "sm", radius: "lg", variant: "stacked", outlined: true },
    );

    // 検証
    expect(
      screen.getByClassName("sui_alert_dialog_action").element().getAttribute("data-probe"),
    ).toBe("sm/lg/stacked/true");
  });
});

describe("AlertDialogToggleTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <AlertDialogRoot>
        <AlertDialogToggleTrigger>
          {(props) => (
            <button type="button" {...props}>
              削除
            </button>
          )}
        </AlertDialogToggleTrigger>
      </AlertDialogRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "削除" }).element();
    expect(trigger.classList.contains("sui_alert_dialog_trigger")).toBe(true);
  });
});

describe("AlertDialogCloseTrigger", () => {
  test("描画関数の要素にクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderDialog(
      <AlertDialogCloseTrigger>
        {(props) => (
          <button type="button" {...props}>
            閉じる
          </button>
        )}
      </AlertDialogCloseTrigger>,
    );

    // 検証
    const close = screen.getByRole("button", { name: "閉じる" }).element();
    expect(close.classList.contains("sui_alert_dialog_close")).toBe(true);
  });
});
