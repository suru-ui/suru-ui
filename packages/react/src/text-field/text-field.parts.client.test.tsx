import { test, describe } from "vitest";
import { render } from "vitest-browser-react";

import { ContextMissingError } from "../errors.js";
import { FieldRoot } from "../field/root/field.root.jsx";
import { TextFieldAddon } from "./addon/text-field.addon.jsx";
import { TextFieldInput } from "./input/text-field.input.jsx";
import { TextFieldContext, useTextFieldContext } from "./root/text-field.root.context.js";
import { TextFieldRoot } from "./root/text-field.root.jsx";
import "./text-field.parts.js";
import "../../tests/src/_locators.js";

describe("TextFieldRoot", () => {
  test("既定の修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextFieldRoot />);

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.tagName).toBe("DIV");
    expect(root.classList.contains("sui_text_field-size_md")).toBe(true);
    expect(root.classList.contains("sui_text_field-color_grey")).toBe(true);
    expect(root.classList.contains("sui_text_field-radius_md")).toBe(true);
    expect(root.classList.contains("sui_text_field-variant_liquid")).toBe(true);
    expect(root.classList.contains("sui_text_field-outlined")).toBe(false);
  });

  test("指定した大きさと配色と角丸と外観のクラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextFieldRoot size="lg" color="blue" variant="naked" outlined />);

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.classList.contains("sui_text_field-size_lg")).toBe(true);
    expect(root.classList.contains("sui_text_field-color_blue")).toBe(true);
    expect(root.classList.contains("sui_text_field-radius_lg")).toBe(true);
    expect(root.classList.contains("sui_text_field-variant_naked")).toBe(true);
    expect(root.classList.contains("sui_text_field-outlined")).toBe(true);
  });

  test("角丸を指定しないときは大きさに追従させる", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <div id="sm">
          <TextFieldRoot size="sm" />
        </div>
        <div id="full">
          <TextFieldRoot size="lg" radius="full" />
        </div>
      </>,
    );

    // 検証
    expect(
      screen.container
        .querySelector("#sm .sui_text_field")
        ?.classList.contains("sui_text_field-radius_sm"),
    ).toBe(true);
    expect(
      screen.container
        .querySelector("#full .sui_text_field")
        ?.classList.contains("sui_text_field-radius_full"),
    ).toBe(true);
  });

  test("スタイル起点として data-scope を付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextFieldRoot />);

    // 検証
    expect(screen.getByClassName("sui_text_field").element().getAttribute("data-scope")).toBe("");
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextFieldRoot className="custom" />);

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.classList.contains("custom")).toBe(true);
    expect(root.classList.contains("sui_text_field")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(<TextFieldRoot render={<section />} />);

    // 検証
    expect(screen.getByClassName("sui_text_field").element().tagName).toBe("SECTION");
  });

  test("render の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot
        size="lg"
        color="blue"
        radius="none"
        render={(props, state) => (
          <section
            {...props}
            data-probe={`${state.size}/${state.color}/${state.radius}/${state.variant}/${String(state.outlined)}`}
          />
        )}
        variant="naked"
        outlined
      />,
    );

    // 検証
    const root = screen.getByClassName("sui_text_field").element();
    expect(root.tagName).toBe("SECTION");
    expect(root.getAttribute("data-probe")).toBe("lg/blue/none/naked/true");
  });

  test("className の関数へ状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot
        size="lg"
        color="blue"
        className={(state) => `probe-size_${state.size}-color_${state.color}`}
      />,
    );

    // 検証
    expect(
      screen
        .getByClassName("sui_text_field")
        .element()
        .classList.contains("probe-size_lg-color_blue"),
    ).toBe(true);
  });
});

describe("TextFieldInput", () => {
  test("既定では text の入力欄を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput aria-label="名前" />
      </TextFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element() as HTMLInputElement;
    expect(input.tagName).toBe("INPUT");
    expect(input.type).toBe("text");
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("指定した入力項目を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput type="email" aria-label="メール" />
      </TextFieldRoot>,
    );

    // 検証
    expect(
      (screen.getByRole("textbox", { name: "メール" }).element() as HTMLInputElement).type,
    ).toBe("email");
  });

  test("利用者の props を入力欄へ渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput name="name" required placeholder="田中 太郎" autoComplete="off" />
      </TextFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox").element() as HTMLInputElement;
    expect(input.name).toBe("name");
    expect(input.placeholder).toBe("田中 太郎");
    expect(input.getAttribute("autocomplete")).toBe("off");
    expect(input.required).toBe(true);
  });

  test("無効時は状態クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput disabled aria-label="名前" />
      </TextFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.classList.contains("sui_text_field_input-disabled")).toBe(true);
  });

  test("Field の検証状態をクラスへ反映する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <>
        <TextFieldRoot>
          <FieldRoot invalid>
            <TextFieldInput aria-label="不正" />
          </FieldRoot>
        </TextFieldRoot>
        <TextFieldRoot>
          <FieldRoot>
            <TextFieldInput aria-label="未検証" />
          </FieldRoot>
        </TextFieldRoot>
      </>,
    );

    // 検証
    expect(
      screen
        .getByRole("textbox", { name: "不正" })
        .element()
        .classList.contains("sui_text_field_input-invalid"),
    ).toBe(true);
    expect(
      screen
        .getByRole("textbox", { name: "未検証" })
        .element()
        .classList.contains("sui_text_field_input-unverified"),
    ).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput className="custom" aria-label="名前" />
      </TextFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.classList.contains("custom")).toBe(true);
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldInput render={<textarea />} aria-label="名前" />
      </TextFieldRoot>,
    );

    // 検証
    const input = screen.getByRole("textbox", { name: "名前" }).element();
    expect(input.tagName).toBe("TEXTAREA");
    expect(input.classList.contains("sui_text_field_input")).toBe(true);
  });

  test("render の関数へスタイル情報と入力欄の状態を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot size="lg" color="blue" outlined>
        <TextFieldInput
          render={(props, state) => (
            <input
              {...props}
              data-probe={`${state.size}/${state.color}/${String(state.outlined)}/${String(state.disabled)}`}
            />
          )}
          disabled
          aria-label="名前"
        />
      </TextFieldRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_text_field_input").element().getAttribute("data-probe")).toBe(
      "lg/blue/true/true",
    );
  });
});

describe("TextFieldAddon", () => {
  test("span で表示して修飾クラスを付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldAddon>🔒</TextFieldAddon>
      </TextFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("SPAN");
    expect(addon.classList.contains("sui_text_field_addon")).toBe(true);
  });

  test("利用者の className を保持する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldAddon className="custom">🔒</TextFieldAddon>
      </TextFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.classList.contains("custom")).toBe(true);
    expect(addon.classList.contains("sui_text_field_addon")).toBe(true);
  });

  test("render で要素を置き換える", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot>
        <TextFieldAddon render={<b />}>🔒</TextFieldAddon>
      </TextFieldRoot>,
    );

    // 検証
    const addon = screen.getByText("🔒").element();
    expect(addon.tagName).toBe("B");
    expect(addon.classList.contains("sui_text_field_addon")).toBe(true);
  });

  test("render の関数へスタイル情報を渡す", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <TextFieldRoot size="lg" color="blue">
        <TextFieldAddon
          render={(props, state) => <span {...props} data-probe={`${state.size}/${state.color}`} />}
        >
          🔒
        </TextFieldAddon>
      </TextFieldRoot>,
    );

    // 検証
    expect(screen.getByClassName("sui_text_field_addon").element().getAttribute("data-probe")).toBe(
      "lg/blue",
    );
  });
});

describe("useTextFieldContext", () => {
  test("提供された値を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTextFieldContext();

      return (
        <span>{`${ctx.size}/${ctx.color}/${ctx.radius}/${ctx.variant}/${String(ctx.outlined)}`}</span>
      );
    }

    // 実行
    const screen = await render(
      <TextFieldRoot size="lg" color="blue" radius="full" variant="naked" outlined>
        <Probe />
      </TextFieldRoot>,
    );

    // 検証
    expect(screen.getByText("lg/blue/full/naked/true").query()?.textContent).toBe(
      "lg/blue/full/naked/true",
    );
  });

  test("提供がないときはエラーを投げる", async ({ expect }) => {
    // 準備
    function Probe() {
      useTextFieldContext();
      return null;
    }

    // 実行と検証
    await expect(render(<Probe />)).rejects.toThrow(ContextMissingError);
  });

  test("任意指定では提供がないときに null を返す", async ({ expect }) => {
    // 準備
    function Probe() {
      const ctx = useTextFieldContext(true);

      return <span>{ctx === null ? "なし" : "あり"}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("なし").query()?.textContent).toBe("なし");
  });

  test("直接提供した値を返す", async ({ expect }) => {
    // 準備
    const provided = {
      size: "md",
      color: "grey",
      radius: "md",
      variant: "liquid",
      outlined: false,
    } as const;
    function Probe() {
      const ctx = useTextFieldContext();

      return <span>{ctx === provided ? "同一" : "別物"}</span>;
    }

    // 実行
    const screen = await render(
      <TextFieldContext value={provided}>
        <Probe />
      </TextFieldContext>,
    );

    // 検証
    expect(screen.getByText("同一").query()?.textContent).toBe("同一");
  });
});
