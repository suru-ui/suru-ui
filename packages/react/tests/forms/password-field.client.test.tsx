import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import "@suru-ui/theme/suru.css";
import {
  Input as PasswordFieldPartsInput,
  PasswordField,
  Root as PasswordFieldPartsRoot,
  ToggleButton as PasswordFieldPartsToggleButton,
} from "../../src/forms/password-field/index.js";

function getRoot(screen: { container: HTMLElement }): HTMLDivElement | null {
  return screen.container.querySelector<HTMLDivElement>("div.sui_password_field");
}

function getInput(screen: { container: HTMLElement }): HTMLInputElement | null {
  return screen.container.querySelector<HTMLInputElement>("input.sui_text_field_input");
}

function getToggle(screen: { container: HTMLElement }): HTMLButtonElement | null {
  return screen.container.querySelector<HTMLButtonElement>("button.sui_password_field_toggle");
}

describe("PasswordField", () => {
  test("パスワード入力欄を描画する", async () => {
    // 実行
    const screen = await render(<PasswordField />);

    // 検証
    const root = getRoot(screen);
    const input = getInput(screen);
    const toggle = getToggle(screen);

    expect(root).not.toBeNull();
    expect(input).not.toBeNull();
    expect(input!.type).toBe("password");
    expect(toggle).not.toBeNull();
  });

  test("既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<PasswordField />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_password_field");
    await expect.element(root).toHaveClass("sui_text_field-size_md");
    await expect.element(root).toHaveClass("sui_text_field-color_grey");
    await expect.element(root).toHaveClass("sui_text_field-radius_md");
    await expect.element(root).toHaveClass("sui_text_field-variant_liquid");
    expect(root!.classList.contains("sui_text_field-outlined")).toBe(false);
  });

  test("スタイルプロパティーでクラスを上書きできる", async () => {
    // 実行
    const screen = await render(
      <PasswordField size="lg" color="red" radius="full" variant="naked" outlined />,
    );

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_text_field-size_lg");
    await expect.element(root).toHaveClass("sui_text_field-color_red");
    await expect.element(root).toHaveClass("sui_text_field-radius_full");
    await expect.element(root).toHaveClass("sui_text_field-variant_naked");
    await expect.element(root).toHaveClass("sui_text_field-outlined");
  });

  test("利用者のクラス名を合成する", async () => {
    // 実行
    const screen = await render(<PasswordField className="my-password-field" />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("my-password-field");
    await expect.element(root).toHaveClass("sui_password_field");
  });

  test("パスワードを入力できる", async () => {
    // 準備
    const screen = await render(<PasswordField placeholder="パスワード" />);

    // 実行
    await userEvent.click(screen.getByPlaceholder("パスワード"));
    await userEvent.keyboard("password123");

    // 検証
    const input = getInput(screen);

    expect(input).not.toBeNull();
    expect(input!.value).toBe("password123");
  });

  test("表示切替ボタンで入力項目を text へ切り替える", async () => {
    // 準備
    const screen = await render(<PasswordField />);

    // 実行
    await userEvent.click(getToggle(screen)!);

    // 検証
    const input = getInput(screen);
    const toggle = getToggle(screen);

    expect(input!.type).toBe("text");
    expect(toggle!.getAttribute("aria-pressed")).toBe("true");
    expect(toggle!.getAttribute("aria-label")).toBe("パスワードを隠す");

    // 実行
    await userEvent.click(toggle!);

    // 検証
    expect(input!.type).toBe("password");
    expect(toggle!.getAttribute("aria-pressed")).toBe("false");
    expect(toggle!.getAttribute("aria-label")).toBe("パスワードを表示");
  });

  test("visibilityToggle に false を指定すると表示切替ボタンを表示しない", async () => {
    // 実行
    const screen = await render(<PasswordField visibilityToggle={false} />);

    // 検証
    const toggle = getToggle(screen);

    expect(toggle).toBeNull();
  });

  test("visible プロパティーで表示状態を制御できる", async () => {
    // 実行
    const screen = await render(<PasswordField visible />);

    // 検証
    const input = getInput(screen);

    expect(input!.type).toBe("text");

    // 実行
    await userEvent.click(getToggle(screen)!);

    // 検証
    expect(input!.type).toBe("text");
  });

  test("onVisibleChange で表示状態の変更を通知する", async () => {
    // 準備
    let visible = false;
    const screen = await render(
      <PasswordField
        onVisibleChange={(next) => {
          visible = next;
        }}
      />,
    );

    // 実行
    await userEvent.click(getToggle(screen)!);

    // 検証
    expect(visible).toBe(true);
  });

  test("defaultVisible で初期表示状態を指定できる", async () => {
    // 実行
    const screen = await render(<PasswordField defaultVisible />);

    // 検証
    const input = getInput(screen);

    expect(input!.type).toBe("text");
  });

  test("無効状態で入力と切替ができない", async () => {
    // 実行
    const screen = await render(<PasswordField disabled />);

    // 検証
    const input = getInput(screen);
    const toggle = getToggle(screen);

    await expect.element(input).toBeDisabled();
    await expect.element(toggle).toBeDisabled();
  });

  test("slotProps を各パーツへ適用する", async () => {
    // 実行
    const screen = await render(
      <PasswordField
        startAddons={["https://"]}
        endAddons={["@example.com"]}
        slotProps={{
          addon: {
            className: "my-addon",
          },
          input: {
            "aria-label": "合言葉",
          },
          toggle: {
            className: "my-toggle",
          },
        }}
      />,
    );

    // 検証
    const input = getInput(screen);
    const toggle = getToggle(screen);
    const addons = screen.container.querySelectorAll<HTMLElement>(".sui_text_field_addon");

    expect(input!.getAttribute("aria-label")).toBe("合言葉");
    await expect.element(toggle).toHaveClass("my-toggle");
    expect(addons.length).toBe(3);
    for (const addon of addons) {
      await expect.element(addon).toHaveClass("my-addon");
    }
  });
});

describe("PasswordFieldParts.Root", () => {
  test("div 要素へ既定のスタイルクラスを適用する", async () => {
    // 実行
    const screen = await render(<PasswordFieldPartsRoot />);

    // 検証
    const root = getRoot(screen);

    expect(root).not.toBeNull();
    await expect.element(root).toHaveClass("sui_password_field");
    await expect.element(root).toHaveClass("sui_text_field-size_md");
  });

  test("visible プロパティーで子パーツの入力項目を text へ切り替える", async () => {
    // 実行
    const screen = await render(
      <PasswordFieldPartsRoot visible>
        <PasswordFieldPartsInput />
      </PasswordFieldPartsRoot>,
    );

    // 検証
    const input = getInput(screen);

    expect(input).not.toBeNull();
    expect(input!.type).toBe("text");
  });

  test("コンテキストの表示状態で子パーツのボタンを切り替える", async () => {
    // 実行
    const screen = await render(
      <PasswordFieldPartsRoot visible>
        <PasswordFieldPartsToggleButton />
      </PasswordFieldPartsRoot>,
    );

    // 検証
    const toggle = getToggle(screen);

    expect(toggle).not.toBeNull();
    expect(toggle!.getAttribute("aria-pressed")).toBe("true");
    expect(toggle!.getAttribute("aria-label")).toBe("パスワードを隠す");
  });
});
