import "@suru-ui/theme/suru.css";
import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { usePaginationContext } from "./pagination.root.context.js";
import { PaginationRoot } from "./pagination.root.jsx";
import "../../../tests/src/_locators.js";

/** 現在のページと総ページ数を描画して、非制御の状態変化を検証できるようにします。 */
function PageProbe() {
  const ctx = usePaginationContext();

  return (
    <span>
      {ctx.page}/{ctx.totalPages}
    </span>
  );
}

describe("PaginationRoot", () => {
  test("nav を既定の要素にして既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PaginationRoot totalPages={5} />);

    // 検証。
    const root = screen.getByRole("navigation", { name: "ページネーション" }).element();
    expect(root.tagName).toBe("NAV");
    expect(root.classList.contains("sui_pagination")).toBe(true);
    expect(root.classList.contains("sui_pagination-size_md")).toBe(true);
    expect(root.classList.contains("sui_pagination-color_grey")).toBe(true);
    expect(root.classList.contains("sui_pagination-radius_md")).toBe(true);
    expect(root.classList.contains("sui_pagination-disabled")).toBe(false);
  });

  test("指定した大きさと配色と角丸のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot size="lg" color="blue" radius="full" totalPages={5} />,
    );

    // 検証。
    const root = screen.getByRole("navigation").element();
    expect(root.classList.contains("sui_pagination-size_lg")).toBe(true);
    expect(root.classList.contains("sui_pagination-color_blue")).toBe(true);
    expect(root.classList.contains("sui_pagination-radius_full")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <PaginationRoot id="sm" size="sm" totalPages={5} aria-label="小" />
        <PaginationRoot id="lg" size="lg" totalPages={5} aria-label="大" />
      </>,
    );

    // 検証。
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_pagination-radius_sm")).toBe(true);

    const lg = screen.container.querySelector<HTMLElement>("#lg")!;
    expect(lg.classList.contains("sui_pagination-radius_lg")).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PaginationRoot totalPages={5} />);

    // 検証。
    expect(screen.getByRole("navigation").element().getAttribute("data-scope")).toBe("");
  });

  test("無効クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PaginationRoot disabled totalPages={5} />);

    // 検証。
    expect(
      screen.getByRole("navigation").element().classList.contains("sui_pagination-disabled"),
    ).toBe(true);
  });

  test("ページを範囲内へ丸める", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot totalPages={5.9} defaultPage={99}>
        <PageProbe />
      </PaginationRoot>,
    );

    // 検証。
    expect(screen.getByText("5/5").query()?.textContent).toBe("5/5");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PaginationRoot className="custom" totalPages={5} />);

    // 検証。
    expect(screen.getByRole("navigation").element().classList.contains("custom")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot
        size="lg"
        color="blue"
        radius="full"
        render={(props, state) => (
          <nav
            {...props}
            data-probe={`${state.size}/${state.color}/${state.radius}/${state.page}/${state.totalPages}/${String(state.disabled)}`}
          />
        )}
        totalPages={10}
        defaultPage={3}
      />,
    );

    // 検証。
    const root = screen.getByClassName("sui_pagination").element();
    expect(root.tagName).toBe("NAV");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/full/3/10/false");
  });

  test("className と style の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PaginationRoot
        size="lg"
        style={(state) => ({ opacity: state.disabled ? "0.5" : "1" })}
        disabled
        className={(state) => `probe-size_${state.size}`}
        totalPages={5}
      />,
    );

    // 検証。
    const root = screen.getByRole("navigation").element();
    expect(root.classList.contains("probe-size_lg")).toBe(true);
    expect(root.style.opacity).toBe("0.5");
  });
});
