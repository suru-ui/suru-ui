import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { Card, CardAPI, useCardAPI } from "./card.jsx";
import "../../tests/src/_locators.js";

describe("CardAPI", () => {
  test("getRootProps はカード固有の props を除いたルートの props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      size: "lg",
      title: "定期レポート",
      action: "設定",
      footer: "閉じる",
      children: "本文",
      description: "毎週のスナップショットを自動で共有します。",
    });
    const rootProps = api.getRootProps();

    // 検証。
    expect(rootProps).toStrictEqual({ size: "lg" });
  });

  test("getTitleProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({});

    // 検証。
    expect(api.getTitleProps()).toBe(null);
  });

  test("getTitleProps はタイトルを子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ title: "定期レポート" });

    // 検証。
    expect(api.getTitleProps()).toStrictEqual({ children: "定期レポート" });
  });

  test("getTitleProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      title: "定期レポート",
      slotProps: { title: { id: "title" } },
    });

    // 検証。
    expect(api.getTitleProps()).toStrictEqual({
      id: "title",
      children: "定期レポート",
    });
  });

  test("getDescriptionProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({});

    // 検証。
    expect(api.getDescriptionProps()).toBe(null);
  });

  test("getDescriptionProps は説明を子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ description: "毎週のスナップショットを自動で共有します。" });

    // 検証。
    expect(api.getDescriptionProps()).toStrictEqual({
      children: "毎週のスナップショットを自動で共有します。",
    });
  });

  test("getActionProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({});

    // 検証。
    expect(api.getActionProps()).toBe(null);
  });

  test.for([null, undefined, false])(
    "getActionProps は非表示の操作要素 (%s) で null を返す",
    (action, { expect }) => {
      // 準備と実行。
      const api = new CardAPI({ action });

      // 検証。
      expect(api.getActionProps()).toBe(null);
    },
  );

  test("getActionProps は操作要素を子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ action: "設定" });

    // 検証。
    expect(api.getActionProps()).toStrictEqual({ children: "設定" });
  });

  test("getActionProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      action: "設定",
      slotProps: { action: { id: "action" } },
    });

    // 検証。
    expect(api.getActionProps()).toStrictEqual({
      id: "action",
      children: "設定",
    });
  });

  test("getContentProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({});

    // 検証。
    expect(api.getContentProps()).toBe(null);
  });

  test.for([null, undefined, false])(
    "getContentProps は非表示の本文 (%s) で null を返す",
    (children, { expect }) => {
      // 準備と実行。
      const api = new CardAPI({ children });

      // 検証。
      expect(api.getContentProps()).toBe(null);
    },
  );

  test("getContentProps は本文を子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ children: "本文" });

    // 検証。
    expect(api.getContentProps()).toStrictEqual({ children: "本文" });
  });

  test("getContentProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      children: "本文",
      slotProps: { content: { id: "content" } },
    });

    // 検証。
    expect(api.getContentProps()).toStrictEqual({
      id: "content",
      children: "本文",
    });
  });

  test("getFooterProps は未指定のとき null を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({});

    // 検証。
    expect(api.getFooterProps()).toBe(null);
  });

  test("getFooterProps はフッターを子要素にして返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ footer: "閉じる" });

    // 検証。
    expect(api.getFooterProps()).toStrictEqual({ children: "閉じる" });
  });

  test("getFooterProps は slotProps の指定を子要素に重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      footer: "閉じる",
      slotProps: { footer: { id: "footer" } },
    });

    // 検証。
    expect(api.getFooterProps()).toStrictEqual({
      id: "footer",
      children: "閉じる",
    });
  });

  test("getHeaderProps はタイトル・説明・操作要素のいずれも未指定のとき null を返す", ({
    expect,
  }) => {
    // 準備と実行。
    const api = new CardAPI({ children: "本文" });

    // 検証。
    expect(api.getHeaderProps()).toBe(null);
  });

  test("getHeaderProps はタイトルがあるときヘッダーの props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ title: "定期レポート" });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は操作要素だけでもヘッダーの props を返す", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({ action: "設定" });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({});
  });

  test("getHeaderProps は slotProps の指定を重ねる", ({ expect }) => {
    // 準備と実行。
    const api = new CardAPI({
      slotProps: { header: { id: "header" } },
      description: "説明",
    });

    // 検証。
    expect(api.getHeaderProps()).toStrictEqual({ id: "header" });
  });
});

describe("useCardAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備。
    function Probe() {
      const api = useCardAPI({ title: "定期レポート" });

      return <span>{api.getTitleProps()?.children}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("定期レポート").query()?.textContent).toBe("定期レポート");
  });
});

describe("Card", () => {
  test("ヘッダー・本文・フッターを描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Card
        size="lg"
        title="定期レポート"
        action="設定"
        footer="閉じる"
        description="毎週のスナップショットを自動で共有します。"
        aria-label="定期レポート"
      >
        本文
      </Card>,
    );

    // 検証。
    const root = screen.getByClassName("sui_card").element();
    expect(root.classList.contains("sui_card")).toBe(true);
    expect(root.classList.contains("sui_card-size_lg")).toBe(true);
    expect(screen.getByText("定期レポート").query()).not.toBe(null);
    expect(screen.getByText("毎週のスナップショットを自動で共有します。").query()).not.toBe(null);
    expect(screen.getByClassName("sui_card_action").query()).not.toBe(null);
    expect(screen.getByText("本文").query()).not.toBe(null);
    expect(screen.getByText("閉じる").query()).not.toBe(null);
  });

  test("本文だけでも描画する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Card aria-label="カード">本文</Card>);

    // 検証。
    expect(screen.getByClassName("sui_card").query()).not.toBe(null);
    expect(screen.getByText("本文").query()).not.toBe(null);
  });

  test("指定しないパーツを描画しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<Card aria-label="カード">本文</Card>);

    // 検証。
    expect(screen.getByClassName("sui_card_header").query()).toBe(null);
    expect(screen.getByClassName("sui_card_footer").query()).toBe(null);
  });

  test("slotProps を各パーツへ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Card
        title="定期レポート"
        action="設定"
        footer="閉じる"
        slotProps={{
          title: { id: "title" },
          action: { id: "action" },
          footer: { id: "footer" },
          header: { id: "header" },
          content: { id: "content" },
          description: { id: "description" },
        }}
        description="説明"
        aria-label="定期レポート"
      >
        本文
      </Card>,
    );

    // 検証。
    expect(screen.getByClassName("sui_card_header").element().id).toBe("header");
    expect(screen.getByClassName("sui_card_title").element().id).toBe("title");
    expect(screen.getByClassName("sui_card_description").element().id).toBe("description");
    expect(screen.getByClassName("sui_card_action").element().id).toBe("action");
    expect(screen.getByClassName("sui_card_content").element().id).toBe("content");
    expect(screen.getByClassName("sui_card_footer").element().id).toBe("footer");
  });

  test("本文が非表示のときコンテンツを描画しない", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <Card title="定期レポート" aria-label="カード">
        {null}
      </Card>,
    );

    // 検証。
    expect(screen.getByText("定期レポート").query()).not.toBe(null);
    expect(screen.getByClassName("sui_card_content").query()).toBe(null);
  });
});
