import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/password-field/password-field.parts.js";
import {
  PasswordField,
  PasswordFieldAPI,
  usePasswordFieldAPI,
} from "../../../src/password-field/password-field.jsx";
import { PasswordFieldRoot } from "../../../src/password-field/root/password-field.root.jsx";
import "../_locators.js";

describe("PasswordFieldAPI", () => {
  test("ルートへ入力欄の props を渡さない", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({
      defaultValue: "secret",
      disabled: true,
      name: "password",
      placeholder: "パスワード",
      readOnly: true,
      required: true,
      slotProps: {},
      value: "secret",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("defaultValue");
    expect(rootProps).not.toHaveProperty("disabled");
    expect(rootProps).not.toHaveProperty("name");
    expect(rootProps).not.toHaveProperty("placeholder");
    expect(rootProps).not.toHaveProperty("required");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps).not.toHaveProperty("value");
  });

  test("入力欄の props をまとめる", ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string, details: unknown) => void>();
    const api = new PasswordFieldAPI({
      defaultValue: "secret",
      disabled: true,
      name: "password",
      onValueChange,
      placeholder: "パスワード",
      readOnly: true,
      required: true,
      value: "secret",
    });

    // 実行
    const props = api.getInputProps();

    // 検証
    expect(props.defaultValue).toBe("secret");
    expect(props.disabled).toBe(true);
    expect(props.name).toBe("password");
    expect(props.onValueChange).toBe(onValueChange);
    expect(props.placeholder).toBe("パスワード");
    expect(props.readOnly).toBe(true);
    expect(props.required).toBe(true);
    expect(props.value).toBe("secret");
  });

  test("slotProps の入力欄 props を優先する", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({
      placeholder: "パスワード",
      value: "secret",
      slotProps: { input: { placeholder: "合言葉" } },
    });

    // 検証
    expect(api.getInputProps().placeholder).toBe("合言葉");
  });

  test("既定では表示切替ボタンを表示する", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({});

    // 検証
    expect(api.getToggleButtonProps()).not.toBe(null);
  });

  test("visibilityToggle が false なら表示切替ボタンを表示しない", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({ visibilityToggle: false });

    // 検証
    expect(api.getToggleButtonProps()).toBe(null);
  });

  test("slotProps だけでも表示切替ボタンを表示する", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({
      visibilityToggle: false,
      slotProps: { toggle: { id: "toggle" } },
    });

    // 検証
    expect(api.getToggleButtonProps()).toStrictEqual({ disabled: undefined, id: "toggle" });
  });

  test("無効状態を入力欄と表示切替ボタンへ伝える", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({ disabled: true });

    // 検証
    expect(api.getInputProps().disabled).toBe(true);
    expect(api.getToggleButtonProps()?.disabled).toBe(true);
  });

  test("先頭と末尾の Addon へ props を配る", ({ expect }) => {
    // 準備と実行
    const api = new PasswordFieldAPI({
      endAddons: ["8 文字以上"],
      slotProps: { addon: { id: "addon" } },
      startAddons: ["🔒"],
    });

    // 検証
    expect([...api.mapStartAddons((addon) => api.getAddonProps(addon))]).toStrictEqual([
      { id: "addon", children: "🔒" },
    ]);
    expect([...api.mapEndAddons((addon) => api.getAddonProps(addon))]).toStrictEqual([
      { id: "addon", children: "8 文字以上" },
    ]);
  });
});

describe("usePasswordFieldAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = usePasswordFieldAPI({ placeholder: "パスワード" });

      return (
        <span>{`${api.getInputProps().placeholder}/${api.getToggleButtonProps() !== null}`}</span>
      );
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("パスワード/true").query()?.textContent).toBe("パスワード/true");
  });
});

describe("PasswordField", () => {
  test("入力欄と表示切替ボタンを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordField slotProps={{ input: { "aria-label": "パスワード" } }} />,
    );

    // 検証
    expect(screen.getByClassName("sui_password_field").query()).not.toBe(null);
    const input = screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement;
    expect(input.type).toBe("password");
    const toggle = screen.getByRole("button", { name: "パスワードを表示" }).element();
    expect(toggle.classList.contains("sui_password_field_toggle")).toBe(true);
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
  });

  test("表示切替ボタンで入力項目とラベルを切り替える", async ({ expect }) => {
    // 準備
    const screen = await render(
      <PasswordField slotProps={{ input: { "aria-label": "パスワード" } }} />,
    );
    const input = screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement;

    // 実行
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証
    expect(input.type).toBe("text");
    const shown = screen.getByRole("button", { name: "パスワードを隠す" }).element();
    expect(shown.getAttribute("aria-pressed")).toBe("true");

    // 実行
    await screen.getByRole("button", { name: "パスワードを隠す" }).click();

    // 検証
    expect(input.type).toBe("password");
    expect(
      screen
        .getByRole("button", { name: "パスワードを表示" })
        .element()
        .getAttribute("aria-pressed"),
    ).toBe("false");
  });

  test("visible を指定すると表示状態を制御できる", async ({ expect }) => {
    // 準備
    const onVisibleChange = vi.fn<(visible: boolean) => void>();
    const screen = await render(
      <PasswordField
        slotProps={{ input: { "aria-label": "パスワード" } }}
        visible
        onVisibleChange={onVisibleChange}
      />,
    );
    const input = screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement;

    // 実行
    await screen.getByRole("button", { name: "パスワードを隠す" }).click();

    // 検証
    expect(input.type).toBe("text");
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });

  test("defaultVisible で初期表示状態を指定できる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordField defaultVisible slotProps={{ input: { "aria-label": "パスワード" } }} />,
    );

    // 検証
    expect(
      (screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement).type,
    ).toBe("text");
  });

  test("onVisibleChange で表示状態の変更を通知する", async ({ expect }) => {
    // 準備
    const onVisibleChange = vi.fn<(visible: boolean) => void>();
    const screen = await render(
      <PasswordField
        slotProps={{ input: { "aria-label": "パスワード" } }}
        onVisibleChange={onVisibleChange}
      />,
    );

    // 実行
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  test("visibilityToggle が false なら表示切替ボタンを表示しない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordField visibilityToggle={false} />);

    // 検証
    expect(screen.getByRole("button").query()).toBe(null);
  });

  test("無効状態では表示切替ボタンの無効クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordField disabled slotProps={{ input: { "aria-label": "パスワード" } }} />,
    );

    // 検証
    const toggle = screen.getByRole("button", { name: "パスワードを表示" }).element();
    expect(toggle.classList.contains("sui_password_field_toggle-disabled")).toBe(true);
  });

  test("先頭と末尾の Addon を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordField endAddons={["8 文字以上"]} startAddons={["🔒"]} />);

    // 検証
    expect(screen.getByText("🔒").query()).not.toBe(null);
    expect(screen.getByText("8 文字以上").query()).not.toBe(null);
  });

  test("利用者の props をルートと入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordField className="custom" name="password" />);

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect((screen.getByRole("textbox").element() as HTMLInputElement).name).toBe("password");
  });

  test("render の関数へ表示状態とスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordField
        color="blue"
        size="lg"
        visible
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${String(state.visible)}/${state.size}/${state.color}`}
          />
        )}
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("true/lg/blue");
  });

  test("useContext でコンテキストを読み取る", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = PasswordField.useContext();

      return <span>{ctx.visible ? "表示" : "非表示"}</span>;
    }

    // 実行
    const screen = await render(
      <PasswordFieldRoot visible>
        <Probe />
      </PasswordFieldRoot>,
    );

    // 検証
    expect(screen.getByText("表示").query()?.textContent).toBe("表示");
  });
});
