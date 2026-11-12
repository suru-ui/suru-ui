import * as React from "react";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../errors.js";
import { TooltipArrow } from "./arrow/tooltip.arrow.jsx";
import { TooltipPopup } from "./popup/tooltip.popup.jsx";
import { TooltipPortal } from "./portal/tooltip.portal.jsx";
import { TooltipPositioner } from "./positioner/tooltip.positioner.jsx";
import { TooltipRoot } from "./root/tooltip.root.jsx";
import { Tooltip } from "./tooltip.jsx";
import { TooltipTrigger } from "./trigger/tooltip.trigger.jsx";
import { TooltipViewport } from "./viewport/tooltip.viewport.jsx";
import "./tooltip.parts.js";
import "../../tests/src/_locators.js";

/**
 * 開いた状態のパーツを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderTooltip(children: React.ReactNode) {
  return render(
    <TooltipRoot defaultOpen>
      <TooltipPortal>
        <TooltipPositioner>
          <TooltipPopup>{children}</TooltipPopup>
        </TooltipPositioner>
      </TooltipPortal>
    </TooltipRoot>,
  );
}

describe("TooltipTrigger", () => {
  test("トリガー要素として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot>
        <TooltipTrigger>{(props) => <button {...props}>開く</button>}</TooltipTrigger>
      </TooltipRoot>,
    );

    // 検証。
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.classList.contains("sui_tooltip_trigger")).toBe(true);
  });

  test("描画関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined>
        <TooltipTrigger>
          {(props, state) => (
            <button {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`}>
              開く
            </button>
          )}
        </TooltipTrigger>
      </TooltipRoot>,
    );

    // 検証。
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});

describe("TooltipPortal", () => {
  test("ポータル要素として描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderTooltip("内容");

    // 検証。
    const portal = screen.getByClassName("sui_tooltip_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
  });

  test("大きさと角丸と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined defaultOpen>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup>内容</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>,
    );

    // 検証。
    const portal = screen.getByClassName("sui_tooltip_portal").element();
    expect(portal.classList.contains("sui_tooltip_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_tooltip_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_tooltip_portal-outlined")).toBe(true);
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined defaultOpen>
        <TooltipPortal
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
          )}
        >
          <TooltipPositioner>
            <TooltipPopup>内容</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>,
    );

    // 検証。
    const portal = screen.getByClassName("sui_tooltip_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-probe")).toBe("lg/sm/true");
  });

  test("Root の外ではエラーを投げる", async ({ expect }) => {
    // 実行と検証。
    await expect(render(<TooltipPortal />)).rejects.toThrow(ContextMissingError);
  });
});

describe("TooltipPositioner", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await renderTooltip("内容");

    // 検証。
    const positioner = screen.getByClassName("sui_tooltip_positioner").element();
    expect(positioner.tagName).toBe("DIV");
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined defaultOpen>
        <TooltipPortal>
          <TooltipPositioner
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          >
            <TooltipPopup>内容</TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>,
    );

    // 検証。
    const positioner = screen.getByClassName("sui_tooltip_positioner").element();
    expect(positioner.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});

describe("TooltipPopup", () => {
  test("内容をツールチップとして表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} defaultOpen>
        保存します
      </Tooltip>,
    );

    // 検証。
    const content = screen.getByClassName("sui_tooltip_popup").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("保存します");
  });

  test("指定したクラスを加える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} className="custom-content" defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    const content = screen.getByClassName("sui_tooltip_popup").element();
    expect(content.classList.contains("custom-content")).toBe(true);
  });

  test("描画する要素を差し替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip
        render={<section data-testid="section" />}
        trigger={<button>開く</button>}
        defaultOpen
      >
        内容
      </Tooltip>,
    );

    // 検証。
    const content = screen.getByClassName("sui_tooltip_popup").element();
    expect(content.tagName).toBe("SECTION");
    expect(content.textContent).toBe("内容");
  });

  test("直接組み立てても描画する", async ({ expect }) => {
    // 準備と実行と検証。
    const screen = await renderTooltip("内容");
    expect(screen.getByClassName("sui_tooltip_popup").element().textContent).toBe("内容");
  });

  test("render の関数へルートと内容の状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <TooltipRoot size="lg" radius="sm" outlined defaultOpen>
        <TooltipPortal>
          <TooltipPositioner>
            <TooltipPopup
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.radius}/${state.outlined}/${String(state.open)}`}
                />
              )}
            >
              内容
            </TooltipPopup>
          </TooltipPositioner>
        </TooltipPortal>
      </TooltipRoot>,
    );

    // 検証。
    const content = screen.getByClassName("sui_tooltip_popup").element();
    expect(content.getAttribute("data-probe")).toBe("lg/sm/true/true");
  });
});

describe("TooltipArrow", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    expect(screen.getByClassName("sui_tooltip_arrow").query()).toBe(null);
  });

  test("有効にすると矢印を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} showArrow defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    const arrow = screen.getByClassName("sui_tooltip_arrow").element();
    expect(arrow.tagName).toBe("DIV");
  });

  test("配置された側のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Tooltip side="right" trigger={<button>開く</button>} showArrow defaultOpen>
        内容
      </Tooltip>,
    );

    // 検証。
    const arrow = screen.getByClassName("sui_tooltip_arrow").element();
    const side = screen.getByClassName("sui_tooltip_positioner").element().dataset["side"];
    expect(arrow.classList.contains(`sui_tooltip_arrow-side_${side}`)).toBe(true);
  });

  test("直接組み立てても表示する", async ({ expect }) => {
    // 準備と実行と検証。
    const screen = await renderTooltip(<TooltipArrow id="arrow" />);
    expect(screen.getByClassName("sui_tooltip_arrow").element().id).toBe("arrow");
  });
});

describe("TooltipViewport", () => {
  test("内容の切り替え領域を描画する", async ({ expect }) => {
    // 準備と実行と検証。
    const screen = await renderTooltip(<TooltipViewport>内容</TooltipViewport>);

    const viewport = screen.getByClassName("sui_tooltip_viewport").element();
    expect(viewport.tagName).toBe("DIV");
    expect(viewport.textContent).toBe("内容");
  });

  test("内容を縦に並べる", async ({ expect }) => {
    // 準備と実行と検証。
    const screen = await renderTooltip(<TooltipViewport>内容</TooltipViewport>);

    const style = getComputedStyle(screen.getByClassName("sui_tooltip_viewport").element());
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
  });
});

describe("アクセシビリティー", () => {
  test("内容をツールチップとして読み上げさせる", async ({ expect }) => {
    // 準備と実行と検証。
    const screen = await render(
      <Tooltip trigger={<button>開く</button>} defaultOpen>
        内容
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip").element().textContent).toBe("内容");
  });
});
