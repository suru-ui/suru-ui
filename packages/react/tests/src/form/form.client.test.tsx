import "@suru-ui/theme/suru.css";
import * as React from "react";
import * as v from "valibot";
import { describe, expectTypeOf, test, vi } from "vitest";
import { render } from "vitest-browser-react";

import "../../../src/button/button.parts.js";
import { Button } from "../../../src/button/button.jsx";
import "../../../src/field/field.parts.js";
import { Field } from "../../../src/field/field.jsx";
import "../../../src/form/form.parts.js";
import { Form, FormAPI, useFormAPI } from "../../../src/form/form.jsx";
import "../../../src/input/input.parts.js";
import { Input } from "../../../src/input/input.jsx";
import "../_locators.js";

/**
 * 名前が 3 文字以上であることを検証するスキーマです。
 * 非同期の検証とエラーメッセージの表示を検証するために使用します。
 */
const NAME_SCHEMA = v.pipe(v.string(), v.minLength(3, "3文字以上で入力してください。"));

/**
 * valibot の検証結果を待ってからエラーメッセージを返します。
 * 非同期の `validate` がフォームの状態へ反映されることを検証するために使用します。
 */
async function validateName(value: unknown): Promise<string | null> {
  await new Promise((resolve) => {
    setTimeout(resolve, 10);
  });

  const result = v.safeParse(NAME_SCHEMA, value);

  return result.success ? null : (result.issues[0]?.message ?? "入力内容を確認してください。");
}

describe("FormAPI", () => {
  test("getRootProps は渡した props を返す", ({ expect }) => {
    // 準備と実行
    const api = new FormAPI({ name: "sui:form", validationMode: "onBlur" });
    const rootProps = api.getRootProps();

    // 検証
    expect(rootProps.name).toBe("sui:form");
    expect(rootProps.validationMode).toBe("onBlur");
  });

  test("onFormSubmit から入力値の型を推論する", () => {
    // 準備と実行
    const api = new FormAPI({
      onFormSubmit: (values: { url: string }) => {
        expectTypeOf(values).toEqualTypeOf<{ url: string }>();
      },
    });

    // 検証
    expectTypeOf(api).toEqualTypeOf<FormAPI<{ url: string }>>();
  });
});

describe("useFormAPI", () => {
  test("API を作成する", async ({ expect }) => {
    // 準備
    function Probe() {
      const api = useFormAPI({ name: "sui:form" });
      return <span>{api.getRootProps().name}</span>;
    }

    // 実行
    const screen = await render(<Probe />);

    // 検証
    expect(screen.getByText("sui:form").query()?.textContent).toBe("sui:form");
  });
});

describe("Form", () => {
  test("フォームとラベルと入力欄を関連付ける", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Form aria-label="お問い合わせ">
        <Field name="url" label="ホームページ">
          <Input />
        </Field>
      </Form>,
    );

    // 検証
    const form = screen.getByRole("form", { name: "お問い合わせ" }).element();
    expect(form.classList.contains("sui_form")).toBe(true);
    expect(screen.getByRole("textbox", { name: "ホームページ" }).query()).not.toBe(null);
  });

  test("検証に成功すると入力値を通知する", async ({ expect }) => {
    // 準備
    const handleFormSubmit =
      vi.fn<(values: Record<string, any>, details: Form.SubmitEventDetails) => void>();

    // 実行
    const screen = await render(
      <Form onFormSubmit={handleFormSubmit}>
        <Field name="url" label="ホームページ">
          <Input />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );
    await screen.getByRole("textbox", { name: "ホームページ" }).fill("https://example.com");
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(handleFormSubmit).toHaveBeenCalledWith(
        { url: "https://example.com" },
        expect.anything(),
      );
    });
  });

  test("検証に失敗すると送信せずエラーを表示する", async ({ expect }) => {
    // 準備
    const handleFormSubmit =
      vi.fn<(values: Record<string, any>, details: Form.SubmitEventDetails) => void>();

    // 実行
    const screen = await render(
      <Form onFormSubmit={handleFormSubmit}>
        <Field name="name" label="名前" errorMatches={{ valueMissing: "名前を入力してください。" }}>
          <Input required />
        </Field>
        <Button type="submit">送信</Button>
      </Form>,
    );
    await screen.getByRole("button", { name: "送信" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("名前を入力してください。").query()).not.toBe(null);
    });
    expect(handleFormSubmit).not.toHaveBeenCalled();
  });

  test("外部から渡したエラーを対応するフィールドへ表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Form errors={{ name: "この名前は既に使用されています。" }}>
        <Field name="name" label="名前">
          <Input />
        </Field>
      </Form>,
    );

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("この名前は既に使用されています。").query()).not.toBe(null);
    });
  });

  test("非同期の検証結果を表示する", async ({ expect }) => {
    // 準備と実行
    const screen = await render(
      <Form validationMode="onChange">
        <Field name="name" label="名前" validate={validateName}>
          <Input />
        </Field>
      </Form>,
    );
    const input = screen.getByRole("textbox", { name: "名前" });

    // 実行
    await input.fill("ab");

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("3文字以上で入力してください。").query()).not.toBe(null);
    });

    // 実行
    await input.fill("すーるー");

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("3文字以上で入力してください。").query()).toBe(null);
    });
  });

  test("actionsRef ですべてのフィールドを命令的に検証する", async ({ expect }) => {
    // 準備
    function Probe() {
      const actionsRef = React.useRef<Form.Actions>(null);

      return (
        <>
          <Form actionsRef={actionsRef}>
            <Field
              name="name"
              label="名前"
              validate={(value) => (value ? null : "名前を入力してください。")}
            >
              <Input />
            </Field>
          </Form>
          <button type="button" onClick={() => actionsRef.current?.validate()}>
            すべて検証
          </button>
        </>
      );
    }

    // 実行
    const screen = await render(<Probe />);
    await screen.getByRole("button", { name: "すべて検証" }).click();

    // 検証
    await vi.waitFor(() => {
      expect(screen.getByText("名前を入力してください。").query()).not.toBe(null);
    });
  });
});
