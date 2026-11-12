import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import {
  type CollapsibleProps,
  Collapsible,
  CollapsibleAPI,
  useCollapsibleAPI,
} from "./collapsible.jsx";
import { CollapsibleIndicator } from "./indicator/collapsible.indicator.jsx";
import "../../tests/src/_locators.js";

function renderTrigger(label = "開閉"): CollapsibleProps["trigger"] {
  return (props) => (
    <button type="button" {...props}>
      {label}
    </button>
  );
}

describe("CollapsibleAPI", () => {
  test("ルートの props から API 専用の props を除く", ({ expect }) => {
    // 準備と実行。
    const api = new CollapsibleAPI({
      size: "lg",
      children: "内容",
      defaultOpen: true,
    });

    // 検証。
    expect(api.getRootProps()).toStrictEqual({
      size: "lg",
      defaultOpen: true,
    });
  });

  test("トリガーを指定しないときは null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CollapsibleAPI({ children: "内容" });

    // 検証。
    expect(api.getTriggerProps()).toBe(null);
  });

  test("トリガーの内容と個別の props を結合する", ({ expect }) => {
    // 準備。
    const trigger = renderTrigger();
    const api = new CollapsibleAPI({
      trigger,
      slotProps: { trigger: { id: "trigger" } },
    });

    // 実行と検証。
    expect(api.getTriggerProps()).toStrictEqual({
      id: "trigger",
      children: trigger,
    });
  });

  test.for([null, undefined, false])(
    "表示しない子では null を返す (%s)",
    (children, { expect }) => {
      // 準備と実行。
      const api = new CollapsibleAPI({ children });

      // 検証。
      expect(api.getContentProps()).toBe(null);
    },
  );

  test("空文字の子ではコンテンツを返す", ({ expect }) => {
    // 準備と実行。
    const api = new CollapsibleAPI({ children: "" });

    // 検証。
    expect(api.getContentProps()).toStrictEqual({ children: "" });
  });

  test("コンテンツの子と個別の props を結合する", ({ expect }) => {
    // 準備。
    const api = new CollapsibleAPI({
      children: "内容",
      slotProps: { content: { id: "content" } },
    });

    // 実行と検証。
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      children: "内容",
    });
  });
});

describe("useCollapsibleAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useCollapsibleAPI({ children: "内容" });

      return <span>{api.getContentProps()?.children}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("内容").query()?.textContent).toBe("内容");
  });
});

describe("Collapsible", () => {
  test("トリガーとコンテンツを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Collapsible trigger={renderTrigger()} defaultOpen>
        内容
      </Collapsible>,
    );

    // 検証。
    const trigger = screen.getByRole("button", { name: "開閉" }).element();
    expect(trigger.classList.contains("sui_collapsible_trigger")).toBe(true);
    expect(screen.getByClassName("sui_collapsible").element().tagName).toBe("DIV");
    expect(screen.getByText("内容").query()).not.toBe(null);
  });

  test("トリガーに要素を渡せる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Collapsible
        trigger={
          <button type="button">
            開閉
            <Collapsible.Indicator />
          </button>
        }
        defaultOpen
      >
        内容
      </Collapsible>,
    );

    // 検証。
    const trigger = screen.getByRole("button", { name: "開閉" }).element();
    expect(trigger.classList.contains("sui_collapsible_trigger")).toBe(true);
    expect(screen.getByClassName("sui_collapsible_indicator").query()).not.toBe(null);
  });

  test("指定した大きさの修飾クラスをルートに付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Collapsible size="lg" trigger={renderTrigger()} />);

    // 検証。
    expect(screen.getByClassName("sui_collapsible-size_lg").query()).not.toBe(null);
  });

  test("コンテンツがないときは内容を描画しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Collapsible trigger={renderTrigger()} />);

    // 検証。
    expect(screen.getByClassName("sui_collapsible_content").query()).toBe(null);
  });

  test("Collapsible.Indicator でインジケーターを公開する", ({ expect }) => {
    // 準備と実行と検証。
    expect(Collapsible.Indicator).toBe(CollapsibleIndicator);
  });
});
