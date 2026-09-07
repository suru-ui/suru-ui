import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Checkbox } from "../src/checkbox/index.js";
import * as FieldParts from "../src/field/index.js";
import { Field } from "../src/field/index.js";
import { Form } from "../src/form/index.js";
import { TextField } from "../src/text-field/index.js";

const VALIDATION_MODES = ["onSubmit", "onBlur", "onChange"] as const;

const meta = preview.meta({
  title: "Field",
  component: Field,
});

export default meta;

const ctrl = controls(Field, {
  description: {
    control: "text",
  },
  disabled: {
    control: "boolean",
  },
  invalid: {
    control: "boolean",
  },
  label: {
    control: "text",
  },
  validationMode: {
    options: VALIDATION_MODES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    label: "名前",
    description: "プロフィールに表示されます。",
    validationMode: "onSubmit",
    disabled: false,
    invalid: undefined,
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()} className="grid grid-rows-[100px_auto]">
        <Field
          {...props}
          name="sui:email"
          errorMatches={{
            typeMismatch: "有効なメールアドレスを入力してください。",
            valueMissing: "メールアドレスを入力してください。",
          }}
        >
          <TextField type="email" required className="w-[320px]" placeholder="you@example.com" />
        </Field>
        <div className="flex">
          <Button type="submit" className="ml-auto">
            送信
          </Button>
        </div>
      </Form>
    );
  },
});

export const Error = meta.story({
  name: "エラー",
  ...ctrl({
    label: "名前",
    description: "プロフィールに表示されます。",
    validationMode: "onSubmit",
    disabled: false,
    invalid: undefined,
  }),
  render(props) {
    const actionsRef = React.useRef<Form.Actions>(null);

    React.useEffect(() => {
      actionsRef.current?.validate("sui:name");
    }, []);

    return (
      <Form className="grid grid-rows-[100px_auto]" actionsRef={actionsRef}>
        <Field
          {...props}
          name="sui:name"
          errorMatches={{
            valueMissing: "名前を入力してください。",
          }}
        >
          <TextField required className="w-[320px]" placeholder="田中 太郎" />
        </Field>
      </Form>
    );
  },
});

export const ValidationModes = meta.story({
  name: "検証タイミング",
  ...ctrl({
    label: "名前",
    description: "検証のタイミングを切り替えます。",
    disabled: false,
    invalid: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VALIDATION_MODES.map((validationMode) => (
          <Form
            key={validationMode}
            onSubmit={(evt) => evt.preventDefault()}
            className="flex flex-col gap-2"
          >
            <span>{validationMode}</span>
            <Field
              {...props}
              name={`sui:name:${validationMode}`}
              errorMatches={{ valueMissing: "名前を入力してください。" }}
              validationMode={validationMode}
            >
              <TextField required className="w-[320px]" placeholder="田中 太郎" />
            </Field>
            <div className="flex">
              <Button size="sm" type="submit">
                送信
              </Button>
            </div>
          </Form>
        ))}
      </div>
    );
  },
});

export const ErrorMatches = meta.story({
  name: "エラーメッセージ",
  ...ctrl({
    label: "パスワード",
    description: "8文字以上で入力してください。",
    disabled: false,
    invalid: undefined,
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()} className="flex flex-col gap-6">
        <Field
          {...props}
          name="sui:password:object"
          errorMatches={{
            tooShort: "8文字以上で入力してください。",
            valueMissing: "パスワードを入力してください。",
          }}
        >
          <Field.Control
            type="password"
            required
            className="w-[320px] rounded border px-3 py-2 text-sm"
            minLength={8}
          />
        </Field>
        <Field
          name="sui:postal"
          label="郵便番号"
          description="配列で複数条件を指定します。"
          errorMatches={["patternMismatch", "valueMissing"]}
        >
          <Field.Control
            pattern="\d{3}-\d{4}"
            required
            className="w-[320px] rounded border px-3 py-2 text-sm"
            placeholder="100-0001"
          />
        </Field>
        <Field
          name="sui:note"
          label="備考"
          description="既定メッセージを表示します。"
          errorMatches="valueMissing"
        >
          <TextField required className="w-[320px]" placeholder="入力してください" />
        </Field>
        <div className="flex">
          <Button type="submit" className="ml-auto">
            送信
          </Button>
        </div>
      </Form>
    );
  },
});

export const CustomValidate = meta.story({
  name: "独自検証",
  ...ctrl({
    label: "ユーザー名",
    description: "admin は使用できません。",
    disabled: false,
    invalid: undefined,
    validationMode: "onChange",
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()}>
        <Field
          {...props}
          name="sui:username"
          validate={(value) =>
            typeof value === "string" && value.toLowerCase() === "admin"
              ? "この名前は使用できません。"
              : null
          }
        >
          <TextField required className="w-[320px]" placeholder="suru-taro" />
        </Field>
      </Form>
    );
  },
});

export const Validity = meta.story({
  name: "検証状態",
  ...ctrl({
    label: "メールアドレス",
    description: "入力内容に応じて件数を表示します。",
    disabled: false,
    invalid: undefined,
    validationMode: "onChange",
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()}>
        <Field
          {...props}
          name="sui:email:validity"
          validity={(state) =>
            state.validity.valid === false ? (
              <span className="text-sm text-red-600">{state.errors.join("、")}</span>
            ) : state.validity.valid === true ? (
              <span className="text-sm text-green-600">有効なメールアドレスです。</span>
            ) : null
          }
          errorMatches={false}
        >
          <TextField type="email" required className="w-[320px]" placeholder="you@example.com" />
        </Field>
      </Form>
    );
  },
});

export const NativeControl = meta.story({
  name: "ネイティブ入力",
  ...ctrl({
    label: "電話番号",
    description: "Field.Control で検証と関連付けます。",
    disabled: false,
    invalid: undefined,
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form onSubmit={(evt) => evt.preventDefault()}>
        <Field
          {...props}
          name="sui:tel"
          errorMatches={{ valueMissing: "電話番号を入力してください。" }}
        >
          <Field.Control
            type="tel"
            required
            className="w-[320px] rounded border px-3 py-2 text-sm"
            placeholder="03-1234-5678"
          />
        </Field>
      </Form>
    );
  },
});

export const WithCheckbox = meta.story({
  name: "チェックボックス",
  ...ctrl({
    label: undefined,
    description: "当てはまる項目を選択してください。",
    disabled: false,
    invalid: undefined,
    validationMode: "onSubmit",
  }),
  render(props) {
    const Parts = FieldParts;

    return (
      <Form onSubmit={(evt) => evt.preventDefault()} className="flex flex-col gap-3">
        <Field {...props} name="sui:interest" errorMatches={{ valueMissing: "選択してください。" }}>
          <div className="flex flex-col gap-2">
            <Field.Item className="flex flex-row items-center gap-2">
              <Checkbox value="design" required />
              <Parts.Label>デザイン</Parts.Label>
            </Field.Item>
            <Field.Item className="flex flex-row items-center gap-2">
              <Checkbox value="engineering" />
              <Parts.Label>エンジニアリング</Parts.Label>
            </Field.Item>
          </div>
        </Field>
        <div className="flex">
          <Button size="sm" type="submit">
            送信
          </Button>
        </div>
      </Form>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    label: "名前",
    description: "無効状態では入力できません。",
    validationMode: "onSubmit",
    invalid: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field {...props} name="sui:name:disabled" disabled>
          <TextField disabled className="w-[320px]" defaultValue="田中 太郎" />
        </Field>
        <Field {...props} name="sui:name:disabled-empty">
          <TextField disabled className="w-[320px]" placeholder="入力できません" />
        </Field>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ構成",
  ...ctrl({
    description: undefined,
    disabled: false,
    invalid: undefined,
    label: undefined,
    validationMode: "onSubmit",
  }),
  render(props) {
    const Field = FieldParts;

    return (
      <Form onSubmit={(evt) => evt.preventDefault()}>
        <Field.Root {...props} name="sui:nickname">
          <Field.Label>ニックネーム</Field.Label>
          <TextField required className="w-[320px]" placeholder="すーるー" />
          <Field.Description>ほかの利用者に公開されます。</Field.Description>
          <Field.Error match="valueMissing">ニックネームを入力してください。</Field.Error>
        </Field.Root>
      </Form>
    );
  },
});

export const LoginForm = meta.story({
  name: "実践例",
  ...ctrl({
    description: undefined,
    disabled: false,
    invalid: undefined,
    label: undefined,
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form
        onSubmit={(evt) => evt.preventDefault()}
        className="flex w-[320px] flex-col gap-4 rounded border p-4"
      >
        <Field
          {...props}
          name="sui:login-email"
          label="メールアドレス"
          errorMatches={{
            typeMismatch: "有効なメールアドレスを入力してください。",
            valueMissing: "メールアドレスを入力してください。",
          }}
        >
          <TextField type="email" required className="w-full" placeholder="you@example.com" />
        </Field>
        <Field
          {...props}
          name="sui:login-password"
          label="パスワード"
          description="8文字以上で入力してください。"
          errorMatches={{
            tooShort: "8文字以上で入力してください。",
            valueMissing: "パスワードを入力してください。",
          }}
        >
          <Field.Control
            type="password"
            required
            className="w-full rounded border px-3 py-2 text-sm"
            minLength={8}
          />
        </Field>
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </Form>
    );
  },
});
