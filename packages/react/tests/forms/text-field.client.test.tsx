import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";

import "@suru-ui/theme/suru.css";
import { TextField } from "../../src/forms/text-field/index.js";
import { clickElement } from "../_click.js";

describe("TextField", () => {
  test("Base UI の入力欄と Addon をレンダリングする", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Addon>https://</TextField.Addon>
        <TextField.Input placeholder="example.com" />
      </TextField>,
    );

    // 検証
    await expect
      .element(screen.getByPlaceholder("example.com"))
      .toHaveClass("sui_text_field_input");
    await expect.element(screen.getByText("https://")).toHaveClass("sui_text_field_addon");
  });

  test("Root の既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Input />
      </TextField>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_text_field");

    await expect.element(root).toHaveClass("sui_text_field-color_grey");
    await expect.element(root).toHaveClass("sui_text_field-size_md");
    await expect.element(root).toHaveClass("sui_text_field-radius_md");
    await expect.element(root).toHaveClass("sui_text_field-variant_liquid");
  });

  test("color・size・radius・variant を Root に指定できる", async () => {
    // 実行
    const screen = await render(
      <TextField color="blue" size="lg" radius="full" variant="naked">
        <TextField.Input />
      </TextField>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_text_field");

    await expect.element(root).toHaveClass("sui_text_field-color_blue");
    await expect.element(root).toHaveClass("sui_text_field-size_lg");
    await expect.element(root).toHaveClass("sui_text_field-radius_full");
    await expect.element(root).toHaveClass("sui_text_field-variant_naked");
  });

  test("枠線を Root の after に描画する", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Input />
      </TextField>,
    );
    const root = screen.container.querySelector<HTMLElement>(".sui_text_field");

    if (root === null) {
      throw new Error("Expected a TextField root.");
    }

    // 検証
    expect(getComputedStyle(root).borderWidth).toBe("0px");
    expect(getComputedStyle(root, "::after").position).toBe("absolute");
    expect(getComputedStyle(root, "::after").content).toBe('""');
  });

  test("入力欄を操作できる", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Input defaultValue="初期値" />
      </TextField>,
    );
    const input = screen.getByRole("textbox");
    await input.fill("変更後");

    // 検証
    await expect.element(input).toHaveValue("変更後");
  });

  test("Input 以外の領域をクリックすると入力欄にフォーカスする", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Addon>前</TextField.Addon>
        <TextField.Input />
      </TextField>,
    );
    const input = screen.getByRole("textbox");

    clickElement(screen.getByText("前"));

    // 検証
    await expect.element(input).toHaveFocus();
  });

  test("Addon の disableFocusOnClick を true にすると入力欄へフォーカスしない", async () => {
    // 準備
    const screen = await render(
      <>
        <button type="button">別のボタン</button>
        <TextField>
          <TextField.Addon disableFocusOnClick>前</TextField.Addon>
          <TextField.Input />
        </TextField>
      </>,
    );
    const button = screen.getByRole("button", { name: "別のボタン" });
    (button.element() as HTMLElement).focus();
    const input = screen.getByRole("textbox");

    // 実行
    clickElement(screen.getByText("前"));

    // 検証
    await expect.element(input).not.toHaveFocus();
    await expect.element(button).toHaveFocus();
  });

  test("Addon と Input を指定した順番で表示する", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Addon>前</TextField.Addon>
        <TextField.Input />
        <TextField.Addon>後</TextField.Addon>
      </TextField>,
    );

    // 検証
    const root = screen.container.querySelector<HTMLElement>(".sui_text_field");
    const children = root ? Array.from(root.children) : [];

    expect(children[0]).toHaveClass("sui_text_field_addon");
    expect(children[1]).toHaveClass("sui_text_field_input");
    expect(children[2]).toHaveClass("sui_text_field_addon");
  });

  test("disabled を指定すると入力欄が無効化される", async () => {
    // 実行
    const screen = await render(
      <TextField>
        <TextField.Input disabled />
      </TextField>,
    );

    // 検証
    const input = screen.getByRole("textbox");

    await expect.element(input).toBeDisabled();
    await expect.element(input).toHaveClass("sui_text_field_input-disabled");
  });

  test("slot の className を各パーツへ適用する", async () => {
    // 実行
    const screen = await render(
      <TextField className="my-root">
        <TextField.Addon className="my-addon">https://</TextField.Addon>
        <TextField.Input className="my-input" />
      </TextField>,
    );

    // 検証
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-root"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-addon"))
      .toBeInTheDocument();
    await expect
      .element(screen.container.querySelector<HTMLElement>(".my-input"))
      .toBeInTheDocument();
  });
});
