import { test, describe } from "vite-plus/test";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../errors.js";
import { PasswordFieldAddon } from "./addon/password-field.addon.jsx";
import { PasswordFieldInput } from "./input/password-field.input.jsx";
import {
  PasswordFieldContext,
  usePasswordFieldContext,
} from "./root/password-field.root.context.js";
import { PasswordFieldRoot } from "./root/password-field.root.jsx";
import { PasswordFieldToggleButton } from "./toggle-button/password-field.toggle-button.jsx";
import "./password-field.parts.js";
import "../../tests/src/_locators.js";

describe("PasswordFieldRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PasswordFieldRoot />);

    // 検証。
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_password_field")).toBe(true);
    expect(root.classList.contains("sui_password_field-size_md")).toBe(true);
    expect(root.classList.contains("sui_password_field-color_grey")).toBe(true);
    expect(root.classList.contains("sui_password_field-radius_md")).toBe(true);
    expect(root.classList.contains("sui_password_field-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_password_field-outlined")).toBe(true);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot size="lg" color="blue" variant="naked" outlined />,
    );

    // 検証。
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.classList.contains("sui_password_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_password_field-color_blue")).toBe(true);
    expect(root.classList.contains("sui_password_field-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_password_field-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_password_field-outlined")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <>
        <div id="sm">
          <PasswordFieldRoot size="sm" />
        </div>
        <div id="full">
          <PasswordFieldRoot size="lg" radius="full" />
        </div>
      </>,
    );

    // 検証。
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
    // 準備と実行。
    const screen = await render(<PasswordFieldRoot />);

    // 検証。
    expect(screen.getByClassName("sui_password_field").element().getAttribute("data-scope")).toBe(
      "",
    );
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PasswordFieldRoot className="custom" />);

    // 検証。
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_password_field")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(<PasswordFieldRoot render={<section />} />);

    // 検証。
    expect(screen.getByClassName("sui_password_field").element().tagName).toBe("SECTION");
  });

  test("render の関数へ表示状態とスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot
        size="lg"
        color="blue"
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${String(state.visible)}/${state.size}/${state.color}/${String(state.outlined)}/${String("setVisible" in state)}`}
          />
        )}
        visible
        outlined
      />,
    );

    // 検証。
    const root = screen.getByClassName("sui_password_field").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("true/lg/blue/true/false");
  });
});

describe("PasswordFieldInput", () => {
  test("既定ではパスワード入力欄を表示する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 検証。
    const input = screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement;
    expect(input.type).toBe("password");
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("コンテキストの表示状態に応じて入力項目を切り替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldInput aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(
      (screen.getByRole("textbox", { name: "パスワード" }).element() as HTMLInputElement).type,
    ).toBe("text");
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput name="password" required placeholder="パスワード" autoComplete="off" />
      </PasswordFieldRoot>,
    );

    // 検証。
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.name).toBe("password");
    expect(input.placeholder).toBe("パスワード");
    expect(input.getAttribute("autocomplete")).toBe("off");
    expect(input.required).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldInput className="custom" aria-label="パスワード" />
      </PasswordFieldRoot>,
    );

    // 検証。
    const input = screen.getByRole("textbox", { name: "パスワード" }).element();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("render の関数へ表示状態とスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot size="lg" color="blue" visible>
        <PasswordFieldInput
          render={(props, state) => (
            <input
              {...props}
              data-probe={`${String(state.visible)}/${state.size}/${state.color}`}
            />
          )}
          aria-label="パスワード"
        />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_text_field_input").element().getAttribute("data-probe")).toBe(
      "true/lg/blue",
    );
  });
});

describe("PasswordFieldAddon", () => {
  test("span で表示して修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldAddon>🔒</PasswordFieldAddon>
      </PasswordFieldRoot>,
    );

    // 検証。
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("SPAN");
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
    expect(addon.classList.contains("sui_text_field_addon")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldAddon className="custom">🔒</PasswordFieldAddon>
      </PasswordFieldRoot>,
    );

    // 検証。
    const addon = screen.getByText("🔒").element();
    expect(addon.classList.contains("custom")).toBe(true);
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldAddon render={<b />}>🔒</PasswordFieldAddon>
      </PasswordFieldRoot>,
    );

    // 検証。
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("B");
    expect(addon.classList.contains("sui_password_field_addon")).toBe(true);
  });

  test("render の関数へ表示状態とスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot size="lg" color="blue" visible>
        <PasswordFieldAddon
          render={(props, state) => (
            <span {...props} data-probe={`${String(state.visible)}/${state.size}/${state.color}`} />
          )}
        >
          🔒
        </PasswordFieldAddon>
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_password_field_addon").element().getAttribute("data-probe"),
    ).toBe("true/lg/blue");
  });
});

describe("PasswordFieldToggleButton", () => {
  test("既定のラベルと押下状態を付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton />
      </PasswordFieldRoot>,
    );

    // 検証。
    const toggle = screen.getByRole("button", { name: "パスワードを表示" }).element();
    expect(toggle.tagName).toBe("BUTTON");
    expect(toggle.getAttribute("type")).toBe("button");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(toggle.classList.contains("sui_password_field_toggle")).toBe(true);
  });

  test("コンテキストの表示状態でアイコンとラベルを切り替える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldToggleButton />
      </PasswordFieldRoot>,
    );

    // 検証。
    const toggle = screen.getByRole("button", { name: "パスワードを隠す" }).element();
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    expect(toggle.querySelector("svg")).not.toBe(null);
  });

  test("利用者の aria-label を優先する", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton aria-label="表示を切り替える" />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(screen.getByRole("button", { name: "表示を切り替える" }).query()).not.toBe(null);
  });

  test("無効状態では無効クラスを付ける", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton disabled />
      </PasswordFieldRoot>,
    );

    // 検証。
    const toggle = screen.getByRole("button").element();
    expect(toggle.classList.contains("sui_password_field_toggle-disabled")).toBe(true);
  });

  test("クリックで表示状態を更新する", async ({ expect }) => {
    // 準備。
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

    // 実行。
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証。
    expect(screen.getByText("表示").query()?.textContent).toBe("表示");
  });

  test("onClick で既定の動作を取り消せる", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{ctx.visible ? "表示" : "非表示"}</span>;
    }

    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton
          onClick={(event) => {
            event.preventDefault();
          }}
        />
        <Probe />
      </PasswordFieldRoot>,
    );

    // 実行。
    await screen.getByRole("button", { name: "パスワードを表示" }).click();

    // 検証。
    expect(screen.getByText("非表示").query()?.textContent).toBe("非表示");
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot>
        <PasswordFieldToggleButton render={<span />} />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(screen.getByClassName("sui_password_field_toggle").element().tagName).toBe("SPAN");
  });

  test("render の関数へ表示状態とボタンの状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldToggleButton
          render={(props, state) => (
            <button {...props} data-probe={`${String(state.visible)}/${String(state.disabled)}`} />
          )}
          disabled
        />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(
      screen.getByClassName("sui_password_field_toggle").element().getAttribute("data-probe"),
    ).toBe("true/true");
  });

  test("className の関数へ表示状態を渡す", async ({ expect }) => {
    // 準備と実行。
    const screen = await render(
      <PasswordFieldRoot visible>
        <PasswordFieldToggleButton
          className={(state) => (state.visible ? "probe-visible" : "probe-hidden")}
        />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(
      screen
        .getByClassName("sui_password_field_toggle")
        .element()
        .classList.contains("probe-visible"),
    ).toBe(true);
  });
});

describe("usePasswordFieldContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{`${String(ctx.visible)}/${typeof ctx.setVisible}`}</span>;
    }

    // 実行。
    const screen = await render(
      <PasswordFieldRoot visible>
        <Probe />
      </PasswordFieldRoot>,
    );

    // 検証。
    expect(screen.getByText("true/function").query()?.textContent).toBe("true/function");
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備。
    function Probe() {
      usePasswordFieldContext();

      return null;
    }

    // 実行と検証。
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備。
    function Probe() {
      const ctx = usePasswordFieldContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行。
    const screen = await render(<Probe />);

    // 検証。
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備。
    const provided = {
      visible: true,
      setVisible: () => {},
    } as const;

    function Probe() {
      const ctx = usePasswordFieldContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行。
    const screen = await render(
      <PasswordFieldContext value={provided}>
        <Probe />
      </PasswordFieldContext>,
    );

    // 検証。
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
