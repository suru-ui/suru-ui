import "@suru-ui/theme/suru.css";
import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import "./pagination.parts.js";
import { PaginationEllipsis } from "./ellipsis/pagination.ellipsis.jsx";
import { PaginationItem } from "./item/pagination.item.jsx";
import { PaginationNextButton } from "./next-button/pagination.next-button.jsx";
import { PaginationPreviousButton } from "./previous-button/pagination.previous-button.jsx";
import "../../tests/src/_locators.js";
import { PaginationRoot } from "./root/pagination.root.jsx";

describe("PaginationRoot の配置", () => {
  test("公開パーツをすべて描画して余白を持たない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={20} defaultPage={5}>
        <PaginationPreviousButton />
        <PaginationItem page={1} />
        <PaginationEllipsis end={4} start={2} />
        <PaginationItem page={5} selected />
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_pagination").query()).not.toBe(null);
    expect(screen.getByClassName("sui_pagination_previous").query()).not.toBe(null);
    expect(screen.container.querySelectorAll(".sui_pagination_item").length).toBe(2);
    expect(screen.container.querySelectorAll(".sui_pagination_item-selected").length).toBe(1);
    expect(screen.getByClassName("sui_pagination_ellipsis").query()).not.toBe(null);
    expect(screen.getByClassName("sui_pagination_next").query()).not.toBe(null);

    for (const element of screen.container.querySelectorAll<HTMLElement>(".sui_pagination *")) {
      const style = getComputedStyle(element);
      expect(style.marginTop).toBe("0px");
      expect(style.marginInlineStart).toBe("0px");
    }
  });

  test("項目を隙間なく横一列に並べる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={20} defaultPage={5}>
        <PaginationPreviousButton />
        <PaginationItem page={5} selected />
        <PaginationNextButton />
      </PaginationRoot>,
    );

    // 検証
    const root = screen.getByRole("navigation").element();
    const style = getComputedStyle(root);
    expect(style.display).toBe("flex");
    expect(style.alignItems).toBe("center");
    const previous = screen
      .getByRole("button", { name: "前のページへ" })
      .element()
      .getBoundingClientRect();
    const item = screen.getByRole("button", { name: "5" }).element().getBoundingClientRect();
    const next = screen
      .getByRole("button", { name: "次のページへ" })
      .element()
      .getBoundingClientRect();
    expect(item.top).toBeCloseTo(previous.top, 1);
    expect(next.left).toBeGreaterThanOrEqual(item.right);
  });

  test("大きさに応じた間隔を持つ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <PaginationRoot id="sm" size="sm" totalPages={5} aria-label="小" />
        <PaginationRoot id="md" size="md" totalPages={5} aria-label="中" />
        <PaginationRoot id="lg" size="lg" totalPages={5} aria-label="大" />
      </>,
    );

    // 検証
    expect(getComputedStyle(screen.container.querySelector("#sm")!).gap).toBe("2px");
    expect(getComputedStyle(screen.container.querySelector("#md")!).gap).toBe("2px");
    expect(getComputedStyle(screen.container.querySelector("#lg")!).gap).toBe("4px");
  });

  test("角丸 full は高さの半分にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot radius="full" totalPages={5}>
        <PaginationItem page={1} />
      </PaginationRoot>,
    );

    // 検証
    const style = getComputedStyle(screen.getByRole("button", { name: "1" }).element());
    expect(style.borderTopLeftRadius).toBe("16px");
  });

  test("正方形のページ番号ボタンを表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot totalPages={5}>
        <PaginationItem page={1} />
      </PaginationRoot>,
    );

    // 検証
    const rect = screen.getByRole("button", { name: "1" }).element().getBoundingClientRect();
    expect(rect.width).toBeCloseTo(32, 1);
    expect(rect.height).toBeCloseTo(32, 1);
  });

  test("無効なときは操作できない見た目にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PaginationRoot disabled totalPages={5}>
        <PaginationItem page={1} />
      </PaginationRoot>,
    );

    // 検証
    expect(getComputedStyle(screen.getByRole("navigation").element()).cursor).toBe("not-allowed");
  });
});

describe("焦点リング", () => {
  test("ページ番号ボタンはフォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <PaginationRoot totalPages={20}>
        <PaginationItem page={1} />
      </PaginationRoot>,
    );
    const button = screen.getByRole("button", { name: "1" }).element();

    // 実行
    button.focus({ focusVisible: true });

    // 検証
    expect(Number.parseFloat(getComputedStyle(button).outlineWidth)).toBeGreaterThan(0);
  });

  test("選択中のページ番号ボタンも焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <PaginationRoot totalPages={20}>
        <PaginationItem page={1} selected />
      </PaginationRoot>,
    );
    const button = screen.getByRole("button", { name: "1" }).element();

    // 実行
    button.focus({ focusVisible: true });

    // 検証
    expect(Number.parseFloat(getComputedStyle(button).outlineWidth)).toBeGreaterThan(0);
  });

  test("前後の移動ボタンはフォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <PaginationRoot totalPages={20} defaultPage={2}>
        <PaginationPreviousButton />
        <PaginationNextButton />
      </PaginationRoot>,
    );
    const previous = screen.getByRole("button", { name: "前のページへ" }).element();
    const next = screen.getByRole("button", { name: "次のページへ" }).element();

    // 実行と検証
    previous.focus({ focusVisible: true });
    expect(Number.parseFloat(getComputedStyle(previous).outlineWidth)).toBeGreaterThan(0);
    next.focus({ focusVisible: true });
    expect(Number.parseFloat(getComputedStyle(next).outlineWidth)).toBeGreaterThan(0);
  });

  test("省略記号ボタンはフォーカス時に焦点リングを表示する", async ({ expect }) => {
    // 準備
    const screen = await render(
      <PaginationRoot totalPages={20}>
        <PaginationEllipsis end={4} start={2} />
      </PaginationRoot>,
    );
    const button = screen.getByRole("button", { name: "2〜4ページへ移動" }).element();

    // 実行
    button.focus({ focusVisible: true });

    // 検証
    expect(Number.parseFloat(getComputedStyle(button).outlineWidth)).toBeGreaterThan(0);
  });
});
