import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { PopoverArrow } from "../../../src/popover/popover.arrow.jsx";
import { PopoverBackdrop } from "../../../src/popover/popover.backdrop.jsx";
import { PopoverClose } from "../../../src/popover/popover.close.jsx";
import { PopoverContent } from "../../../src/popover/popover.content.jsx";
import { PopoverDescription } from "../../../src/popover/popover.description.jsx";
import { Popover } from "../../../src/popover/popover.jsx";
import { PopoverPortal } from "../../../src/popover/popover.portal.jsx";
import { PopoverPositioner } from "../../../src/popover/popover.positioner.jsx";
import { PopoverRoot } from "../../../src/popover/popover.root.jsx";
import { PopoverTitle } from "../../../src/popover/popover.title.jsx";
import { PopoverTrigger } from "../../../src/popover/popover.trigger.jsx";
import { PopoverViewport } from "../../../src/popover/popover.viewport.jsx";
import "../../../src/popover/popover.parts.js";
import "../_locators.js";

/**
 * 開いた状態のパーツを組み立てます。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderPopover(children: React.ReactNode) {
  return render(
    <PopoverRoot defaultOpen>
      <PopoverPortal>
        <PopoverPositioner>
          <PopoverContent>{children}</PopoverContent>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>,
  );
}

describe("PopoverTrigger", () => {
  test("ポップオーバーを開く対象として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot>
        <PopoverTrigger>{(props) => <button {...props}>開く</button>}</PopoverTrigger>
      </PopoverRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.classList.contains("sui_popover_trigger")).toBe(true);
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  test("押すとポップアップを開く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot>
        <PopoverTrigger>{(props) => <button {...props}>開く</button>}</PopoverTrigger>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverContent>内容</PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );
    await screen.getByRole("button", { name: "開く" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("内容").query()?.textContent).toBe("内容");
    });
  });

  test("描画関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot size="lg" radius="sm" outlined>
        <PopoverTrigger>
          {(props, state) => (
            <button {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`}>
              開く
            </button>
          )}
        </PopoverTrigger>
      </PopoverRoot>,
    );

    // 検証
    const trigger = screen.getByRole("button", { name: "開く" }).element();
    expect(trigger.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});

describe("PopoverPortal", () => {
  test("ポップアップを別の場所へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover("内容");

    // 検証
    const portal = screen.getByClassName("sui_popover_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-scope")).toBe("");
    expect(screen.container.contains(portal)).toBe(false);
  });

  test("大きさと角丸と枠線をクラスにする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot defaultOpen size="lg" radius="sm" outlined>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverContent>内容</PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    // 検証
    const portal = screen.getByClassName("sui_popover_portal").element();
    expect(portal.classList.contains("sui_popover_portal-size_lg")).toBe(true);
    expect(portal.classList.contains("sui_popover_portal-radius_sm")).toBe(true);
    expect(portal.classList.contains("sui_popover_portal-outlined")).toBe(true);
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot defaultOpen size="lg" radius="sm" outlined>
        <PopoverPortal
          render={(props, state) => (
            <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
          )}
        >
          <PopoverPositioner>
            <PopoverContent>内容</PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    // 検証
    const portal = screen.getByClassName("sui_popover_portal").element();
    expect(portal.tagName).toBe("DIV");
    expect(portal.getAttribute("data-probe")).toBe("lg/sm/true");
  });

  test("Root の外ではエラーを投げる", async ({ expect }) => {
    // 実行と検証
    await expect(render(<PopoverPortal />)).rejects.toThrow(ContextMissingError);
  });
});

describe("PopoverBackdrop", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    expect(screen.getByClassName("sui_popover_backdrop").query()).toBe(null);
  });

  test("指定するとオーバーレイを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen backdrop trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    const backdrop = screen.getByClassName("sui_popover_backdrop").element();
    expect(backdrop.tagName).toBe("DIV");
  });

  test("直接組み立てても表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot defaultOpen>
        <PopoverPortal>
          <PopoverBackdrop id="backdrop" />
          <PopoverPositioner>
            <PopoverContent>内容</PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_popover_backdrop").element().id).toBe("backdrop");
  });
});

describe("PopoverPositioner", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover("内容");

    // 検証
    const positioner = screen.getByClassName("sui_popover_positioner").element();
    expect(positioner.tagName).toBe("DIV");
    expect(positioner.classList.contains("sui_popover_positioner")).toBe(true);
  });

  test("既定では下端の中央へ配置する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover("内容");

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByClassName("sui_popover_positioner").element().dataset["side"]).toBe(
        "bottom",
      );
    });
    expect(screen.getByClassName("sui_popover_positioner").element().dataset["align"]).toBe(
      "center",
    );
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot defaultOpen size="lg" radius="sm" outlined>
        <PopoverPortal>
          <PopoverPositioner
            render={(props, state) => (
              <div {...props} data-probe={`${state.size}/${state.radius}/${state.outlined}`} />
            )}
          >
            <PopoverContent>内容</PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    // 検証
    const positioner = screen.getByClassName("sui_popover_positioner").element();
    expect(positioner.getAttribute("data-probe")).toBe("lg/sm/true");
  });
});

describe("PopoverContent", () => {
  test("内容を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen trigger={<button>開く</button>}>
        ポップオーバーの内容
      </Popover>,
    );

    // 検証
    const content = screen.getByClassName("sui_popover_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("ポップオーバーの内容");
  });

  test("指定したクラスを加える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover className="custom-content" defaultOpen trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    const content = screen.getByClassName("sui_popover_content").element();
    expect(content.classList.contains("custom-content")).toBe(true);
  });

  test("描画する要素を差し替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover
        defaultOpen
        render={<section data-testid="section" />}
        trigger={<button>開く</button>}
      >
        内容
      </Popover>,
    );

    // 検証
    const content = screen.getByClassName("sui_popover_content").element();
    expect(content.tagName).toBe("SECTION");
    expect(content.textContent).toBe("内容");
  });

  test("直接組み立てても描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover("内容");

    // 検証
    expect(screen.getByClassName("sui_popover_content").element().textContent).toBe("内容");
  });

  test("render の関数へルートと内容の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PopoverRoot defaultOpen size="lg" radius="sm" outlined>
        <PopoverPortal>
          <PopoverPositioner>
            <PopoverContent
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`${state.size}/${state.radius}/${state.outlined}/${String(state.open)}`}
                />
              )}
            >
              内容
            </PopoverContent>
          </PopoverPositioner>
        </PopoverPortal>
      </PopoverRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_popover_content").element();
    expect(content.getAttribute("data-probe")).toBe("lg/sm/true/true");
  });
});

describe("PopoverArrow", () => {
  test("指定しないときは表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    expect(screen.getByClassName("sui_popover_arrow").query()).toBe(null);
  });

  test("有効にすると矢印を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen arrow trigger={<button>開く</button>}>
        内容
      </Popover>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_popover_arrow").element();
    expect(arrow.tagName).toBe("DIV");
    expect(arrow.getAttribute("aria-hidden")).toBe("true");
  });

  test("配置された側のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover
        defaultOpen
        arrow
        trigger={<button>開く</button>}
        slotProps={{ positioner: { side: "right", sideOffset: 8 } }}
      >
        内容
      </Popover>,
    );

    // 検証
    const arrow = screen.getByClassName("sui_popover_arrow").element();
    const side = screen.getByClassName("sui_popover_positioner").element().dataset["side"];
    expect(arrow.classList.contains(`sui_popover_arrow-side_${side}`)).toBe(true);
  });

  test("直接組み立てても表示する", async ({ expect }) => {
    // 準備と実行と検証
    const screen = await renderPopover(<PopoverArrow id="arrow" />);

    expect(screen.getByClassName("sui_popover_arrow").element().id).toBe("arrow");
  });
});

describe("PopoverTitle", () => {
  test("見出し要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover(<PopoverTitle>見出し</PopoverTitle>);

    // 検証
    const title = screen.getByText("見出し").element();
    expect(title.tagName).toBe("H2");
    expect(title.classList.contains("sui_popover_title")).toBe(true);
  });
});

describe("PopoverDescription", () => {
  test("説明文要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover(<PopoverDescription>説明</PopoverDescription>);

    // 検証
    const description = screen.getByText("説明").element();
    expect(description.tagName).toBe("P");
    expect(description.classList.contains("sui_popover_description")).toBe(true);
  });
});

describe("PopoverClose", () => {
  test("押すとポップアップを閉じる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen trigger={<button>開く</button>}>
        <PopoverClose>
          <button>閉じる</button>
        </PopoverClose>
      </Popover>,
    );
    await screen.getByRole("button", { name: "閉じる" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByRole("dialog").query()).toBe(null);
    });
  });
});

describe("PopoverViewport", () => {
  test("内容の切り替え領域を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover(<PopoverViewport>内容</PopoverViewport>);

    // 検証
    const viewport = screen.getByClassName("sui_popover_viewport").element();
    expect(viewport.tagName).toBe("DIV");
    expect(viewport.textContent).toBe("内容");
  });

  test("内容を縦に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await renderPopover(<PopoverViewport>内容</PopoverViewport>);

    // 検証
    const style = getComputedStyle(screen.getByClassName("sui_popover_viewport").element());
    expect(style.display).toBe("flex");
    expect(style.flexDirection).toBe("column");
  });
});

describe("アクセシビリティー", () => {
  test("見出しと説明をポップアップへ関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Popover defaultOpen trigger={<button>開く</button>}>
        <PopoverTitle>見出し</PopoverTitle>
        <PopoverDescription>説明</PopoverDescription>
      </Popover>,
    );

    // 検証
    const dialog = screen.getByRole("dialog").element();
    const title = screen.getByText("見出し").element();
    const description = screen.getByText("説明").element();
    expect(dialog.getAttribute("aria-labelledby")).toBe(title.id);
    expect(dialog.getAttribute("aria-describedby")).toBe(description.id);
  });
});
