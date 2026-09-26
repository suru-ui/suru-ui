import { describe, test } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../../../src/errors.js";
import { PasswordFieldAddon } from "../../../src/password-field/password-field.addon.jsx";
import {
  PasswordFieldContext,
  usePasswordFieldContext,
} from "../../../src/password-field/password-field.context.js";
import { PasswordFieldInput } from "../../../src/password-field/password-field.input.jsx";
import { PasswordFieldRoot } from "../../../src/password-field/password-field.root.jsx";
import { PasswordFieldToggleButton } from "../../../src/password-field/password-field.toggle-button.jsx";
import "../../../src/password-field/password-field.parts.js";
import "../_locators.js";

describe("PasswordFieldRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldRoot />);

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_password_field")).toBe(true);
    expect(root.classList.contains("sui_password_field-size_md")).toBe(true);
    expect(root.classList.contains("sui_password_field-color_grey")).toBe(true);
    expect(root.classList.contains("sui_password_field-radius_md")).toBe(true);
    expect(root.classList.contains("sui_password_field-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_password_field-outlined")).toBe(false);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot color="blue" outlined size="lg" variant="naked" />,
    );

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.classList.contains("sui_password_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_password_field-color_blue")).toBe(true);
    expect(root.classList.contains("sui_password_field-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_password_field-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_password_field-outlined")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <div id="sm">
          <PasswordFieldRoot size="sm" />
        </div>
        <div id="full">
          <PasswordFieldRoot radius="full" size="lg" />
        </div>
      </>,
    );

    // 検証
    expect(
      screen.container
        .querySelector("#sm .sui_password_field")
        ?.classList.contains("sui_password_field-radius_sm"),
    ).toBe(true);
    expect(
      screen.container
        .querySelector("#full .sui_password_field")
        ?.classList.contains("sui_password_field-radius_full"),
    ).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldRoot />);

    // 検証
    expect(screen.getByClassName("sui_password_field").element().getAttribute("data-scope")).toBe(
      "",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_password_field")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_password_field").element().tagName).toBe("SECTION");
  });
});

describe("PasswordFieldInput", () => {
  test("既定ではパスワード入力欄を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement;
    expect(input.type).toBe("password");
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("コンテキストの表示状態に応じて入力項目を切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldInput aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 検証
    expect(
      (screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement).type,
    ).toBe("text");
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput autoComplete="off" name="password" placeholder="パスワード" required />
      </PasswordFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.name).toBe("password");
    expect(input.placeholder).toBe("パスワード");
    expect(input.getAttribute("autocomplete")).toBe("off");
    expect(input.required).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput aria-label="パスワード" className="custom" />
      </PasswordFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "パスワード" }).element();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });
});

describe("PasswordFieldAddon", () => {
  test("span で表示して修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldAddon>🔒</PasswordFieldAddon>);

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("SPAN");
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
    expect(addon.classList.contains("sui_text_field_addon")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldAddon className="custom">🔒</PasswordFieldAddon>);

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.classList.contains("custom")).toBe(true);
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<PasswordFieldAddon render={<b />}>🔒</PasswordFieldAddon>);

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("B");
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
  });

  test("disableFocusOnClick では入力欄へフォーカスしない", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldAddon disableFocusOnClick>🔒</PasswordFieldAddon>
        <PasswordFieldInput aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 実行
    await screen.getByText("🔒").click();

    // 検証
    expect(document.activeElement?.tagName).not.toBe("INPUT");
  });
});

describe("PasswordFieldToggleButton", () => {
  test("既定のラベルと押下状態を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton />
      </PasswordFieldRoot>,
    );

    // 検証
    const toggle = screen.getByRole("button", { name: "パスワードを表示" }).element();
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle.getAttribute("type")).toBe("button");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(toggle.classList.contains("sui_password_field_toggle")).toBe(true);
  });

  test("コンテキストの表示状態でアイコンとラベルを切り替える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldToggleButton />
      </PasswordFieldRoot>,
    );

    // 検証
    const toggle = screen.getByRole("button", { name: "パスワードを隠す" }).element();
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    expect(toggle.querySelector("svg")).not.toBe(null);
  });

  test("利用者の aria-label を優先する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton aria-label="表示を切り替える" />
      </PasswordFieldRoot>,
    );

    // 検証
    expect(screen.getByRole("button", { name: "表示を切り替える" }).query()).not.toBe(null);
  });

  test("無効状態では無効クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton disabled />
      </PasswordFieldRoot>,
    );

    // 検証
    const toggle = screen.getByRole("button").element() as HTMLButtonElement;
    expect(toggle.disabled).toBe(true);
    expect(toggle.classList.contains("sui_password_field_toggle-disabled")).toBe(true);
  });

  test("クリックで表示状態を更新する", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{ctx.visible ? "表示" : "非表示"}</span>;
    }
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton />
        <Probe />
      </PasswordFieldRoot>,
    );

    // 実行
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証
    expect(screen.getByText("表示").query()?.textContent).toBe("表示");
  });

  test("onClick で既定の動作を取り消せる", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{ctx.visible ? "表示" : "非表示"}</span>;
    }
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton onClick={(event) => event.preventDefault()} />
        <Probe />
      </PasswordFieldRoot>,
    );

    // 実行
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証
    expect(screen.getByText("非表示").query()?.textContent).toBe("非表示");
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton render={<span />} />
      </PasswordFieldRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_password_field_toggle").element().tagName).toBe("SPAN");
  });
});

describe("usePasswordFieldContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{`${String(ctx.visible)}/${typeof ctx.setVisible}`}</span>;
    }

    // 実行
    const screen = await render(
      <PasswordFieldRoot visible>
        <Probe />
      </PasswordFieldRoot>,
    );

    // 検証
    expect(screen.getByText("true/function").query()?.textContent).toBe("true/function");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      usePasswordFieldContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = usePasswordFieldContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided = { visible: true, setVisible: () => {} } as const;
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <PasswordFieldContext value={provided}>
        <Probe />
      </PasswordFieldContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
