import "@suru-ui/theme/suru.css";
import * as React from "react";
import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/checkbox/checkbox.parts.js";
import { CheckboxGroupRoot } from "../../../src/checkbox-group/checkbox-group.root.jsx";
import { CheckboxRoot } from "../../../src/checkbox/checkbox.root.jsx";
import "../_locators.js";

describe("CheckboxRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox")).toBe(true);
    expect(root.classList.contains("sui_checkbox-size_md")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_grey")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_md")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(false);
  });

  test("指定した修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxRoot outlined color="blue" radius="lg" size="sm" variant="naked" />,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_sm")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <CheckboxRoot data-testid="sm" size="sm" />
        <CheckboxRoot data-testid="full" radius="full" size="lg" />
      </>,
    );

    // 検証
    const sm = screen.getByTestId("sm").element();
    expect(sm.classList.contains("sui_checkbox-radius_sm")).toBe(true);
    const full = screen.getByTestId("full").element();
    expect(full.classList.contains("sui_checkbox-radius_full")).toBe(true);
  });

  test("スコープの始点になる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot />);

    // 検証
    expect(screen.getByClassName("sui_checkbox").element().getAttribute("data-scope")).toBe("");
  });

  test("チェック状態を状態クラスと aria 属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot defaultChecked />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-checked")).toBe(true);
    expect(root.getAttribute("aria-checked")).toBe("true");
  });

  test("中間状態を状態クラスと aria 属性へ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot indeterminate />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-indeterminate")).toBe(true);
    expect(root.getAttribute("aria-checked")).toBe("mixed");
  });

  test("クリックで状態を変更して onCheckedChange を受け取る", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(<CheckboxRoot onCheckedChange={onCheckedChange} />);

    // 実行
    await screen.getByRole("checkbox").click();

    // 検証
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole("checkbox").element().getAttribute("aria-checked")).toBe("true");
  });

  test("label のクリックで状態を変更する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <label>
        <CheckboxRoot />
        設定を有効にする
      </label>,
    );
    await screen.getByText("設定を有効にする").click();

    // 検証
    expect(screen.getByRole("checkbox").element().getAttribute("aria-checked")).toBe("true");
  });

  test("無効時は状態クラスを付け操作を受け付けない", async ({ expect }) => {
    // 準備
    const onCheckedChange = vi.fn<(checked: boolean) => void>();
    const screen = await render(<CheckboxRoot disabled onCheckedChange={onCheckedChange} />);

    // 実行
    await screen.getByRole("checkbox").click({ force: true });

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-disabled")).toBe(true);
    expect(root.getAttribute("aria-disabled")).toBe("true");
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test("CheckboxGroup のスタイルを引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot color="blue" outlined size="lg" variant="naked">
        <CheckboxRoot />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_checkbox-outlined")).toBe(true);
  });

  test("個別の指定より CheckboxGroup の指定を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot color="blue" size="lg" variant="naked">
        <CheckboxRoot color="red" size="sm" variant="liquid" />
      </CheckboxGroupRoot>,
    );

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.classList.contains("sui_checkbox-size_lg")).toBe(true);
    expect(root.classList.contains("sui_checkbox-color_blue")).toBe(true);
    expect(root.classList.contains("sui_checkbox-variant_naked")).toBe(true);
  });

  test("render の関数へグループと自身の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot color="blue" size="lg" variant="naked" outlined orientation="horizontal">
        <CheckboxRoot
          render={(props, state) => (
            <span
              {...props}
              data-probe={`${state.size}/${String(state.color)}/${state.variant}/${String(state.outlined)}/${state.orientation}`}
            />
          )}
        />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_checkbox").element().getAttribute("data-probe")).toBe(
      "lg/blue/naked/true/horizontal",
    );
  });

  test("CheckboxGroup の無効を引き継ぐ", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <CheckboxGroupRoot disabled>
        <CheckboxRoot />
      </CheckboxGroupRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_checkbox").element().getAttribute("aria-disabled")).toBe(
      "true",
    );
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<CheckboxRoot render={<div />} />);

    // 検証
    const root = screen.getByClassName("sui_checkbox").element();
    expect(root.tagName).toBe("DIV");
  });

  test("フォームへ値を送信する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <CheckboxRoot defaultChecked name="accept" value="yes" />
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("accept")).toBe("yes");
  });

  test("未チェックではフォームへ値を送信しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <form>
        <CheckboxRoot name="accept" value="yes" />
      </form>,
    );

    // 検証
    const form = screen.container.querySelector("form")!;
    expect(new FormData(form).get("accept")).toBe(null);
  });
});
