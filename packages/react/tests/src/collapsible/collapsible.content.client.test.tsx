import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { CollapsibleContent } from "../../../src/collapsible/content/collapsible.content.jsx";
import { CollapsibleRoot } from "../../../src/collapsible/root/collapsible.root.jsx";
import {
  type CollapsibleTriggerProps,
  CollapsibleTrigger,
} from "../../../src/collapsible/trigger/collapsible.trigger.jsx";
import "../_locators.js";

function renderTrigger(): CollapsibleTriggerProps["children"] {
  return (props) => (
    <button type="button" {...props}>
      開閉
    </button>
  );
}

describe("CollapsibleContent", () => {
  test("開いたときに内容を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent>内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_collapsible_content").element();
    expect(content.tagName).toBe("DIV");
    expect(content.textContent).toBe("内容");
    expect(content.hasAttribute("hidden")).toBe(false);
  });

  test("閉じているときは DOM に残さない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent>内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_collapsible_content").query()).toBe(null);
  });

  test("keepMounted で閉じても DOM に保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent keepMounted>内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_collapsible_content").element();
    expect(content.hasAttribute("hidden")).toBe(true);
  });

  test("hiddenUntilFound で検索可能な非表示にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent hiddenUntilFound>内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_collapsible_content").element().getAttribute("hidden")).toBe(
      "until-found",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent className="custom">内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_collapsible_content").element();
    expect(content.classList.contains("custom")).toBe(true);
    expect(content.classList.contains("sui_collapsible_content")).toBe(true);
  });

  test("render に指定した要素へ描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot defaultOpen>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent render={<section />}>内容</CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_collapsible_content").element().tagName).toBe("SECTION");
  });

  test("render の関数へルートの状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CollapsibleRoot size="lg" defaultOpen>
        <CollapsibleTrigger>{renderTrigger()}</CollapsibleTrigger>
        <CollapsibleContent
          render={(props, state) => (
            <section {...props} data-probe={`${state.size}/${String(state.open)}`} />
          )}
        >
          内容
        </CollapsibleContent>
      </CollapsibleRoot>,
    );

    // 検証
    const content = screen.getByClassName("sui_collapsible_content").element();
    expect(content.tagName).toBe("SECTION");
    expect(content.getAttribute("data-probe")).toBe("lg/true");
  });
});
