import { describe, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/text-field/text-field.parts.js";
import { TextField, TextFieldAPI, useTextFieldAPI } from "../../../src/text-field/text-field.jsx";
import { TextFieldRoot } from "../../../src/text-field/text-field.root.jsx";
import "../_locators.js";

describe("TextFieldAPI", () => {
  test("ルートへ入力欄の props を渡さない", ({ expect }) => {
    // 準備と実行
    const api = new TextFieldAPI({
      defaultValue: "入力値",
      disabled: true,
      name: "name",
      placeholder: "田中 太郎",
      readOnly: true,
      required: true,
      slotProps: {},
      type: "text",
      value: "入力値",
    });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps).not.toHaveProperty("defaultValue");
    expect(rootProps).not.toHaveProperty("disabled");
    expect(rootProps).not.toHaveProperty("name");
    expect(rootProps).not.toHaveProperty("placeholder");
    expect(rootProps).not.toHaveProperty("readOnly");
    expect(rootProps).not.toHaveProperty("required");
    expect(rootProps).not.toHaveProperty("slotProps");
    expect(rootProps).not.toHaveProperty("type");
    expect(rootProps).not.toHaveProperty("value");
  });

  test("入力欄の props をまとめる", ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string, details: unknown) => void>();
    const api = new TextFieldAPI({
      defaultValue: "入力値",
      disabled: true,
      name: "name",
      onValueChange,
      placeholder: "田中 太郎",
      readOnly: true,
      required: true,
      type: "email",
      value: "入力値",
    });

    // 実行
    const props = api.getInputProps();

    // 検証
    expect(props.defaultValue).toBe("入力値");
    expect(props.disabled).toBe(true);
    expect(props.name).toBe("name");
    expect(props.onValueChange).toBe(onValueChange);
    expect(props.placeholder).toBe("田中 太郎");
    expect(props.readOnly).toBe(true);
    expect(props.required).toBe(true);
    expect(props.type).toBe("email");
    expect(props.value).toBe("入力値");
  });

  test("slotProps の入力欄 props を優先する", ({ expect }) => {
    // 準備と実行
    const api = new TextFieldAPI({
      placeholder: "田中 太郎",
      type: "text",
      slotProps: { input: { placeholder: "山田 花子", type: "email" } },
    });

    // 検証
    expect(api.getInputProps().placeholder).toBe("山田 花子");
    expect(api.getInputProps().type).toBe("email");
  });

  test("ルートの props をそのまま返す", ({ expect }) => {
    // 準備と実行
    const api = new TextFieldAPI({ color: "blue", outlined: true, size: "lg" });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.color).toBe("blue");
    expect(rootProps.outlined).toBe(true);
    expect(rootProps.size).toBe("lg");
  });

  test("先頭と末尾の Addon へ props を配る", ({ expect }) => {
    // 準備と実行
    const api = new TextFieldAPI({
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

describe("useTextFieldAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useTextFieldAPI({ placeholder: "田中 太郎", startAddons: ["🔒"] });
      const startAddons = [...api.mapStartAddons((addon) => addon)];

      return <span>{`${api.getInputProps().placeholder}/${startAddons.length}`}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("田中 太郎/1").query()?.textContent).toBe("田中 太郎/1");
  });
});

describe("TextField", () => {
  test("入力欄と修飾クラスを描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField color="blue" size="lg" slotProps={{ input: { "aria-label": "名前" } }} />,
    );

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.classList.contains("sui_text_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_text_field-color_blue")).toBe(true);
    expect(screen.getByRole("textbox", { name: "名前" }).query()).not.toBe(null);
  });

  test("先頭と末尾の Addon を描画する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextField endAddons={["8 文字以上"]} startAddons={["🔒"]} />);

    // 検証
    expect(screen.getByText("🔒").query()).not.toBe(null);
    expect(screen.getByText("8 文字以上").query()).not.toBe(null);
  });

  test("利用者の props をルートと入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField className="custom" name="name" placeholder="田中 太郎" />,
    );

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.name).toBe("name");
    expect(input.placeholder).toBe("田中 太郎");
  });

  test("入力値の変更を通知する", async ({ expect }) => {
    // 準備
    const onValueChange = vi.fn<(value: string) => void>();
    const screen = await render(
      <TextField onValueChange={onValueChange} slotProps={{ input: { "aria-label": "名前" } }} />,
    );

    // 実行
    await screen.getByRole("textbox", { name: "名前" }).fill("すーるー");

    // 検証
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("すーるー", expect.anything());
  });

  test("ルートのクリックで入力欄へフォーカスする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField slotProps={{ input: { "aria-label": "名前" } }} startAddons={["🔒"]} />,
    );

    // 実行
    await screen.getByText("🔒").click();

    // 検証
    expect(document.activeElement?.tagName).toBe("INPUT");
  });

  test("disableFocusOnClick の Addon では入力欄へフォーカスしない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField
        slotProps={{ addon: { disableFocusOnClick: true }, input: { "aria-label": "名前" } }}
        startAddons={["🔒"]}
      />,
    );

    // 実行
    await screen.getByText("🔒").click();

    // 検証
    expect(document.activeElement?.tagName).not.toBe("INPUT");
  });

  test("無効時は入力欄を無効にする", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField disabled slotProps={{ input: { "aria-label": "名前" } }} />,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element() as HTMLInputElement;
    expect(input.disabled).toBe(true);
    expect(input.classList.contains("sui_text_field_input-disabled")).toBe(true);
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextField
        color="blue"
        size="lg"
        render={(props, state) => (
          <section {...props} data-probe={`${state.size}/${state.color}`} />
        )}
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue");
  });

  test("useContext でコンテキストを読み取る", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = TextField.useContext();

      return <span>{`${ctx.size}/${ctx.variant}`}</span>;
    }

    // 実行
    const screen = await render(
      <TextFieldRoot size="lg" variant="naked">
        <Probe />
      </TextFieldRoot>,
    );

    // 検証
    expect(screen.getByText("lg/naked").query()?.textContent).toBe("lg/naked");
  });
});
