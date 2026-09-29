import "@suru-ui/theme/suru.css";
import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/card/card.parts.js";
import { CardAction } from "../../../src/card/card.action.jsx";
import { CardContent } from "../../../src/card/card.content.jsx";
import { CardDescription } from "../../../src/card/card.description.jsx";
import { CardFooter } from "../../../src/card/card.footer.jsx";
import { CardHeader } from "../../../src/card/card.header.jsx";
import { CardRoot } from "../../../src/card/card.root.jsx";
import { CardTitle } from "../../../src/card/card.title.jsx";
import "../_locators.js";
import supportsCustomFunctions from "./_supports-custom-functions.js";

describe("CardRoot の配置", () => {
  test("ヘッダーのタイトルと操作要素を横に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CardRoot>
        <CardHeader>
          <CardTitle>定期レポート</CardTitle>
          <CardDescription>毎週のスナップショットを共有します。</CardDescription>
          <CardAction>
            <button type="button">設定</button>
          </CardAction>
        </CardHeader>
      </CardRoot>,
    );

    // 検証
    const title = screen.getByText("定期レポート").element().getBoundingClientRect();
    const description = screen
      .getByText("毎週のスナップショットを共有します。")
      .element()
      .getBoundingClientRect();
    const action = screen.getByRole("button", { name: "設定" }).element().getBoundingClientRect();
    expect(title.left).toBeLessThan(action.left);
    expect(title.top).toBeLessThan(description.top);
    expect(action.top).toBeCloseTo(title.top, 1);
  });

  test.skipIf(!supportsCustomFunctions())("大きさごとの余白と間隔を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CardRoot id="sm" size="sm">
          <CardContent>小の本文</CardContent>
        </CardRoot>
        <CardRoot id="md" size="md">
          <CardContent>中の本文</CardContent>
        </CardRoot>
        <CardRoot id="lg" size="lg">
          <CardContent>大の本文</CardContent>
        </CardRoot>
      </>,
    );

    // 検証
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.gap).toBe("12px");
    expect(sm.paddingBlockStart).toBe("12px");
    const smContent = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm .sui_card_content")!,
    );
    expect(smContent.paddingInlineStart).toBe("12px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.gap).toBe("16px");
    expect(md.paddingBlockStart).toBe("16px");
    const mdContent = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md .sui_card_content")!,
    );
    expect(mdContent.paddingInlineStart).toBe("16px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.gap).toBe("20px");
    expect(lg.paddingBlockStart).toBe("20px");
    const lgContent = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg .sui_card_content")!,
    );
    expect(lgContent.paddingInlineStart).toBe("20px");
  });

  test.skipIf(!supportsCustomFunctions())(
    "フッターがあるときは下端の余白を詰める",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <CardRoot id="plain">
            <CardContent>本文</CardContent>
          </CardRoot>
          <CardRoot id="with-footer">
            <CardContent>本文</CardContent>
            <CardFooter>フッター</CardFooter>
          </CardRoot>
        </>,
      );

      // 検証
      const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
      expect(plain.paddingBlockEnd).toBe("16px");
      const withFooter = getComputedStyle(
        screen.container.querySelector<HTMLElement>("#with-footer")!,
      );
      expect(withFooter.paddingBlockEnd).toBe("0px");
    },
  );

  test.skipIf(!supportsCustomFunctions())(
    "先頭の画像では上端の余白を詰める",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <CardRoot id="with-image">
          <img alt="" />
          <CardContent>本文</CardContent>
        </CardRoot>,
      );

      // 検証
      const root = getComputedStyle(screen.container.querySelector<HTMLElement>("#with-image")!);
      expect(root.paddingBlockStart).toBe("0px");
    },
  );

  test.skipIf(!supportsCustomFunctions())("指定した角丸で切り抜く", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CardRoot id="none" radius="none" />
        <CardRoot id="sm" radius="sm" />
        <CardRoot id="md" radius="md" />
        <CardRoot id="lg" radius="lg" />
      </>,
    );

    // 検証
    const none = getComputedStyle(screen.container.querySelector<HTMLElement>("#none")!);
    expect(none.borderTopLeftRadius).toBe("0px");
    const sm = getComputedStyle(screen.container.querySelector<HTMLElement>("#sm")!);
    expect(sm.borderTopLeftRadius).toBe("8px");
    const md = getComputedStyle(screen.container.querySelector<HTMLElement>("#md")!);
    expect(md.borderTopLeftRadius).toBe("12px");
    const lg = getComputedStyle(screen.container.querySelector<HTMLElement>("#lg")!);
    expect(lg.borderTopLeftRadius).toBe("16px");
  });

  test.skipIf(!supportsCustomFunctions())("枠線を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CardRoot id="plain" outlined={false} />
        <CardRoot id="outlined" />
      </>,
    );

    // 検証
    const plain = getComputedStyle(screen.container.querySelector<HTMLElement>("#plain")!);
    expect(plain.borderTopWidth).toBe("0px");
    const outlined = getComputedStyle(screen.container.querySelector<HTMLElement>("#outlined")!);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeGreaterThan(0.5);
    expect(Number.parseFloat(outlined.borderTopWidth)).toBeLessThan(1.5);
  });

  test.skipIf(!supportsCustomFunctions())(
    "フッターに区切り線と背景を付ける",
    async ({ expect }) => {
      // 準備と実行
      const screen = await render(
        <>
          <span style={{ backgroundColor: "var(--sui-canvas-2)" }}>背景の基準</span>
          <CardRoot id="with-footer">
            <CardFooter>フッター</CardFooter>
          </CardRoot>
        </>,
      );

      // 検証
      const expected = getComputedStyle(screen.getByText("背景の基準").element());
      const footer = getComputedStyle(
        screen.container.querySelector<HTMLElement>("#with-footer .sui_card_footer")!,
      );
      expect(Number.parseFloat(footer.borderBlockStartWidth)).toBeGreaterThan(0.5);
      expect(footer.backgroundColor).toBe(expected.backgroundColor);
    },
  );

  test("活字を大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <span style={{ color: "var(--sui-canvas_text-2)" }}>説明の基準</span>
        <span style={{ color: "var(--sui-canvas_text-1)" }}>本文の基準</span>
        <CardRoot id="sm" size="sm">
          <CardHeader>
            <CardTitle>小のタイトル</CardTitle>
            <CardDescription>小の説明</CardDescription>
          </CardHeader>
          <CardContent>小の本文</CardContent>
        </CardRoot>
        <CardRoot id="md" size="md">
          <CardHeader>
            <CardTitle>中のタイトル</CardTitle>
          </CardHeader>
        </CardRoot>
        <CardRoot id="lg" size="lg">
          <CardHeader>
            <CardTitle>大のタイトル</CardTitle>
          </CardHeader>
        </CardRoot>
      </>,
    );

    // 検証
    const expectedDescription = getComputedStyle(screen.getByText("説明の基準").element());
    const expectedContent = getComputedStyle(screen.getByText("本文の基準").element());
    const smTitle = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm .sui_card_title")!,
    );
    expect(smTitle.fontSize).toBe("12px");
    expect(smTitle.fontWeight).toBe("700");
    const smDescription = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm .sui_card_description")!,
    );
    expect(smDescription.fontSize).toBe("12px");
    expect(smDescription.color).toBe(expectedDescription.color);
    const smContent = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#sm .sui_card_content")!,
    );
    expect(smContent.color).toBe(expectedContent.color);
    const mdTitle = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#md .sui_card_title")!,
    );
    expect(mdTitle.fontSize).toBe("14px");
    expect(mdTitle.fontWeight).toBe("700");
    const lgTitle = getComputedStyle(
      screen.container.querySelector<HTMLElement>("#lg .sui_card_title")!,
    );
    expect(lgTitle.fontSize).toBe("17px");
    expect(lgTitle.fontWeight).toBe("700");
  });

  test.skipIf(!supportsCustomFunctions())("公開変数で余白を上書きできる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CardRoot id="custom" />);
    const root = screen.container.querySelector<HTMLElement>("#custom")!;
    root.style.setProperty("--sui_card-padding_block_start", "40px");

    // 検証
    expect(getComputedStyle(root).paddingBlockStart).toBe("40px");
  });
});
