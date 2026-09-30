import * as React from "react";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { SelectArrow } from "../../../src/select/select.arrow.jsx";
import { SelectBackdrop } from "../../../src/select/select.backdrop.jsx";
import { SelectContent } from "../../../src/select/select.content.jsx";
import { SelectGroupLabel } from "../../../src/select/select.group-label.jsx";
import { SelectGroup } from "../../../src/select/select.group.jsx";
import { SelectIcon } from "../../../src/select/select.icon.jsx";
import { SelectItemIndicator } from "../../../src/select/select.item-indicator.jsx";
import { SelectItemText } from "../../../src/select/select.item-text.jsx";
import { SelectItem } from "../../../src/select/select.item.jsx";
import { SelectLabel } from "../../../src/select/select.label.jsx";
import { SelectList } from "../../../src/select/select.list.jsx";
import { SelectPortal } from "../../../src/select/select.portal.jsx";
import { SelectPositioner } from "../../../src/select/select.positioner.jsx";
import { SelectRoot } from "../../../src/select/select.root.jsx";
import { SelectScrollDownArrow } from "../../../src/select/select.scroll-down-arrow.jsx";
import { SelectScrollUpArrow } from "../../../src/select/select.scroll-up-arrow.jsx";
import { SelectSeparator } from "../../../src/select/select.separator.jsx";
import { SelectTrigger } from "../../../src/select/select.trigger.jsx";
import { SelectValue } from "../../../src/select/select.value.jsx";
import "../../../src/select/select.parts.js";
import "../_locators.js";

const fruits = ["りんご", "ばなな"];

/**
 * 全パーツを直接組み立てた Select を描画します。
 * ポップアップ系のパーツは Base UI のルートコンテキストを必要とするため、単体では描画できません。
 */
function renderParts(children?: React.ReactNode) {
  return render(
    <SelectRoot defaultOpen items={fruits}>
      <SelectLabel>果物</SelectLabel>
      <SelectTrigger aria-label="果物">
        <SelectValue />
        <SelectIcon />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectPositioner>
          <SelectContent>
            <SelectScrollUpArrow keepMounted />
            <SelectArrow />
            <SelectList>
              {children ?? (
                <>
                  <SelectGroup>
                    <SelectGroupLabel>果物の一覧</SelectGroupLabel>
                    <SelectItem value="りんご">
                      <SelectItemText>りんご</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                </>
              )}
            </SelectList>
            <SelectScrollDownArrow keepMounted />
          </SelectContent>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>,
  );
}

/**
 * スタイル情報を持つ Root の下で、各パーツの render へ検証用の属性を付けた Select を描画します。
 */
function renderStateProbes() {
  return render(
    <SelectRoot defaultOpen items={fruits} outlined radius="sm" size="lg" variant="naked">
      <SelectLabel
        render={(props, state) => (
          <div
            {...props}
            data-probe={`label/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      >
        果物
      </SelectLabel>
      <SelectTrigger
        aria-label="果物"
        render={(props, state) => (
          <div
            {...props}
            data-probe={`trigger/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      >
        <SelectValue
          placeholder="選択"
          render={(props, state) => (
            <span
              {...props}
              data-probe={`value/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
            />
          )}
        />
        <SelectIcon
          render={(props, state) => (
            <span
              {...props}
              data-probe={`icon/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
            />
          )}
        />
      </SelectTrigger>
      <SelectPortal
        render={(props, state) => (
          <div
            {...props}
            data-probe={`portal/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
          />
        )}
      >
        <SelectBackdrop
          render={(props, state) => (
            <div
              {...props}
              data-probe={`backdrop/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
            />
          )}
        />
        <SelectPositioner
          render={(props, state) => (
            <div
              {...props}
              data-probe={`positioner/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
            />
          )}
        >
          <SelectContent
            render={(props, state) => (
              <div
                {...props}
                data-probe={`content/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
              />
            )}
          >
            <SelectScrollUpArrow
              keepMounted
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`scrollUp/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                />
              )}
            />
            <SelectArrow
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`arrow/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                />
              )}
            />
            <SelectList
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`list/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                />
              )}
            >
              <SelectGroup
                render={(props, state) => (
                  <div
                    {...props}
                    data-probe={`group/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                  />
                )}
              >
                <SelectGroupLabel
                  render={(props, state) => (
                    <div
                      {...props}
                      data-probe={`groupLabel/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                    />
                  )}
                >
                  果物の一覧
                </SelectGroupLabel>
                <SelectItem
                  value="りんご"
                  render={(props, state) => (
                    <div
                      {...props}
                      data-probe={`item/${state.size}/${state.selected}/${state.highlighted}`}
                    />
                  )}
                >
                  <SelectItemText
                    render={(props, state) => (
                      <div
                        {...props}
                        data-probe={`itemText/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                      />
                    )}
                  >
                    りんご
                  </SelectItemText>
                  <SelectItemIndicator
                    render={(props, state) => (
                      <span
                        {...props}
                        data-probe={`itemIndicator/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                      />
                    )}
                  />
                </SelectItem>
              </SelectGroup>
              <SelectSeparator
                render={(props, state) => (
                  <div
                    {...props}
                    data-probe={`separator/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                  />
                )}
              />
            </SelectList>
            <SelectScrollDownArrow
              keepMounted
              render={(props, state) => (
                <div
                  {...props}
                  data-probe={`scrollDown/${state.size}/${state.radius}/${state.variant}/${state.outlined}`}
                />
              )}
            />
          </SelectContent>
        </SelectPositioner>
      </SelectPortal>
    </SelectRoot>,
  );
}

describe("SelectRoot", () => {
  test("自身の HTML 要素を描画しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<SelectRoot items={fruits} />);

    // 検証
    expect(screen.container.querySelector("[data-scope]")).toBe(null);
  });
});

describe("SelectLabel", () => {
  test("ラベル要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    const label = screen.getByText("果物", { exact: true }).element();
    expect(label.classList.contains("sui_select_label")).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByText("果物", { exact: true }).element().getAttribute("data-probe")).toBe(
      "label/lg/sm/naked/true",
    );
  });
});

describe("SelectTrigger", () => {
  test("スタイル起点として修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SelectRoot items={fruits} size="lg" radius="sm" variant="naked" outlined>
        <SelectTrigger aria-label="果物" />
      </SelectRoot>,
    );

    // 検証
    const trigger = screen.getByRole("combobox", { name: "果物" }).element();
    expect(trigger.tagName).toBe("BUTTON");
    expect(trigger.classList.contains("sui_select")).toBe(true);
    expect(trigger.classList.contains("sui_select-size_lg")).toBe(true);
    expect(trigger.classList.contains("sui_select-radius_sm")).toBe(true);
    expect(trigger.classList.contains("sui_select-variant_naked")).toBe(true);
    expect(trigger.classList.contains("sui_select-outlined")).toBe(true);
    expect(trigger.getAttribute("data-scope")).toBe("");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByRole("combobox", { name: "果物" }).element().getAttribute("data-probe"),
    ).toBe("trigger/lg/sm/naked/true");
  });
});

describe("SelectValue", () => {
  test("プレースホルダーを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SelectRoot items={fruits}>
        <SelectTrigger aria-label="果物">
          <SelectValue placeholder="選択" />
        </SelectTrigger>
      </SelectRoot>,
    );

    // 検証
    const value = screen.getByText("選択").element();
    expect(value.classList.contains("sui_select_value")).toBe(true);
    expect(value.classList.contains("sui_select_value-placeholder")).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByText("選択").element().getAttribute("data-probe")).toBe(
      "value/lg/sm/naked/true",
    );
  });
});

describe("SelectIcon", () => {
  test("アイコンのラッパーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_icon").element().tagName).toBe("SPAN");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_icon").element().getAttribute("data-probe")).toBe(
      "icon/lg/sm/naked/true",
    );
  });
});

describe("SelectPortal", () => {
  test("ポータル要素にスコープを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    const portal = screen.getByClassName("sui_select_portal").element();
    expect(portal.getAttribute("data-scope")).toBe("");
  });

  test("Root の外ではエラーを投げる", async ({ expect }) => {
    // 実行と検証
    await expect(render(<SelectPortal />)).rejects.toThrow(ContextMissingError);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_portal").element().getAttribute("data-probe")).toBe(
      "portal/lg/sm/naked/true",
    );
  });
});

describe("SelectBackdrop", () => {
  test("オーバーレイを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_backdrop").element().tagName).toBe("DIV");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_backdrop").element().getAttribute("data-probe")).toBe(
      "backdrop/lg/sm/naked/true",
    );
  });
});

describe("SelectPositioner", () => {
  test("配置コンテナーを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_positioner").element().tagName).toBe("DIV");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByClassName("sui_select_positioner").element().getAttribute("data-probe"),
    ).toBe("positioner/lg/sm/naked/true");
  });
});

describe("SelectContent", () => {
  test("ポップアップの内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_content").element().tagName).toBe("DIV");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_content").element().getAttribute("data-probe")).toBe(
      "content/lg/sm/naked/true",
    );
  });
});

describe("SelectList", () => {
  test("リスト要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByRole("listbox").element().classList.contains("sui_select_list")).toBe(true);
  });

  test("Root の items を既定の見た目で描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <SelectRoot items={fruits} defaultOpen>
        <SelectTrigger aria-label="果物">
          <SelectValue placeholder="選択" />
        </SelectTrigger>
        <SelectPortal>
          <SelectPositioner>
            <SelectContent>
              <SelectList />
            </SelectContent>
          </SelectPositioner>
        </SelectPortal>
      </SelectRoot>,
    );

    // 検証
    expect(screen.getByRole("option", { name: "りんご" }).query()).not.toBe(null);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByRole("listbox").element().getAttribute("data-probe")).toBe(
      "list/lg/sm/naked/true",
    );
  });
});

describe("SelectGroup", () => {
  test("グループ要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByRole("group").element().classList.contains("sui_select_group")).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByRole("group").element().getAttribute("data-probe")).toBe(
      "group/lg/sm/naked/true",
    );
  });
});

describe("SelectGroupLabel", () => {
  test("見出し要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    const label = screen.getByClassName("sui_select_group_label").element();
    expect(label.textContent).toBe("果物の一覧");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByClassName("sui_select_group_label").element().getAttribute("data-probe"),
    ).toBe("groupLabel/lg/sm/naked/true");
  });
});

describe("SelectItem", () => {
  test("項目要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    const item = screen.getByRole("option", { name: "りんご" }).element();
    expect(item.classList.contains("sui_select_item")).toBe(true);
    expect(item.classList.contains("sui_button-item")).toBe(true);
  });

  test("render の関数へスタイル情報と項目の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByRole("option", { name: "りんご" }).element().getAttribute("data-probe"),
    ).toBe("item/lg/false/false");
  });
});

describe("SelectItemText", () => {
  test("項目の表示テキストを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_item_text").element().textContent).toBe("りんご");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_item_text").element().getAttribute("data-probe")).toBe(
      "itemText/lg/sm/naked/true",
    );
  });
});

describe("SelectItemIndicator", () => {
  test("選択状態を DOM に維持する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_item_indicator").query()).not.toBe(null);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByClassName("sui_select_item_indicator").element().getAttribute("data-probe"),
    ).toBe("itemIndicator/lg/sm/naked/true");
  });
});

describe("SelectSeparator", () => {
  test("区切り要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_separator").element().tagName).toBe("DIV");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_separator").element().getAttribute("data-probe")).toBe(
      "separator/lg/sm/naked/true",
    );
  });
});

describe("SelectScrollUpArrow", () => {
  test("上方向のスクロール要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_scroll_up_arrow").query()).not.toBe(null);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByClassName("sui_select_scroll_up_arrow").element().getAttribute("data-probe"),
    ).toBe("scrollUp/lg/sm/naked/true");
  });
});

describe("SelectScrollDownArrow", () => {
  test("下方向のスクロール要素を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_scroll_down_arrow").query()).not.toBe(null);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(
      screen.getByClassName("sui_select_scroll_down_arrow").element().getAttribute("data-probe"),
    ).toBe("scrollDown/lg/sm/naked/true");
  });
});

describe("SelectArrow", () => {
  test("矢印要素として描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await renderParts();

    // 検証
    expect(screen.getByClassName("sui_select_arrow").element().tagName).toBe("DIV");
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await renderStateProbes();

    // 検証
    expect(screen.getByClassName("sui_select_arrow").element().getAttribute("data-probe")).toBe(
      "arrow/lg/sm/naked/true",
    );
  });
});
