import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ActionGroupRoot } from "../../../src/action-group/action-group.root.jsx";
import { ButtonRoot } from "../../../src/button/button.root.jsx";
import "../_locators.js";

describe("ButtonRoot", () => {
  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot color="blue" size="lg" variant="naked" />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-radius_lg")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <ButtonRoot id="sm" size="sm" />
        <ButtonRoot id="full" radius="full" size="lg" />
      </>,
    );

    // 検証
    const sm = screen.container.querySelector<HTMLElement>("#sm")!;
    expect(sm.classList.contains("sui_button-radius_sm")).toBe(true);
    const full = screen.container.querySelector<HTMLElement>("#full")!;
    expect(full.classList.contains("sui_button-radius_full")).toBe(true);
  });

  test("修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot item muted outlined squared />);

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-item")).toBe(true);
    expect(button.classList.contains("sui_button-muted")).toBe(true);
    expect(button.classList.contains("sui_button-outlined")).toBe(true);
    expect(button.classList.contains("sui_button-squared")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot />);

    // 検証
    expect(screen.getByClassName("sui_button").element().getAttribute("data-scope")).toBe("");
  });

  test("無効時は状態クラスと disabled 属性を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot disabled />);

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.classList.contains("sui_button-disabled")).toBe(true);
    expect(button.disabled).toBe(true);
  });

  test("保留中は無効化しつつフォーカスを維持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot pending />);

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.classList.contains("sui_button-pending")).toBe(true);
    expect(button.classList.contains("sui_button-disabled")).toBe(false);
    expect(button.getAttribute("aria-disabled")).toBe("true");
    expect(button.disabled).toBe(false);
    expect(button.tabIndex).toBe(0);
  });

  test("無効と保留中が重なるときは無効化を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<ButtonRoot disabled pending />);

    // 検証
    const button = screen.getByClassName("sui_button").element() as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-disabled")).toBe(null);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ButtonRoot nativeButton={false} render={<a aria-label="ドキュメント" href="/docs" />}>
        ドキュメント
      </ButtonRoot>,
    );

    // 検証
    const link = screen.getByRole("button").element();
    expect(link.tagName).toBe("A");
    expect(link.classList.contains("sui_button")).toBe(true);
  });

  test("ActionGroup のスタイルを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <ActionGroupRoot color="blue" outlined size="lg" variant="naked">
        <ButtonRoot>実行</ButtonRoot>
      </ActionGroupRoot>,
    );

    // 検証
    const button = screen.getByClassName("sui_button").element();
    expect(button.classList.contains("sui_button-size_lg")).toBe(true);
    expect(button.classList.contains("sui_button-color_blue")).toBe(true);
    expect(button.classList.contains("sui_button-variant_naked")).toBe(true);
    expect(button.classList.contains("sui_button-outlined")).toBe(true);
  });

  test("押下時にクリックを受け取る", async ({ expect }) => {
    // 準備
    let clicked = 0;
    const handleClick = () => {
      clicked++;
    };

    // 実行
    const screen = await render(<ButtonRoot onClick={handleClick}>実行</ButtonRoot>);
    await screen.getByRole("button", { name: "実行" }).click();

    // 検証
    expect(clicked).toBe(1);
  });
});
