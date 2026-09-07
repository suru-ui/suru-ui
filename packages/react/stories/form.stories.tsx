import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Field } from "../src/field/index.js";
import { Fieldset } from "../src/fieldset/index.js";
import { Form, Root as FormPartsRoot, useAPI as useFormAPI } from "../src/form/index.js";
import { Input } from "../src/input/index.js";
import { TextField } from "../src/text-field/index.js";
import { Textarea } from "../src/textarea/index.js";

const VALIDATION_MODES = ["onSubmit", "onBlur", "onChange"] as const;

const meta = preview.meta({
  title: "Form",
  component: Form,
});

export default meta;

const ctrl = controls(Form, {
  validationMode: {
    options: [...VALIDATION_MODES],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const [errors, setErrors] = React.useState<React.ComponentProps<typeof Form>["errors"]>({});

    return (
      <Form
        {...props}
        errors={errors}
        className="flex w-80 flex-col items-start gap-4"
        onFormSubmit={(formValues) => {
          setErrors(validateUrl(formValues["url"]));
        }}
      >
        <Field name="url" label="ホームページ">
          <Input
            type="url"
            pattern="https?://.*"
            required
            className="w-full"
            placeholder="https://example.com"
            defaultValue="https://example.com"
          />
        </Field>
        <Button type="submit">送信</Button>
      </Form>
    );
  },
});

export const ValidationModes = meta.story({
  name: "検証タイミング",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VALIDATION_MODES.map((validationMode) => (
          <Form
            key={validationMode}
            {...props}
            onSubmit={(event) => event.preventDefault()}
            className="flex w-80 flex-col items-start gap-2"
            validationMode={validationMode}
          >
            <span className="text-sm font-bold">{validationMode}</span>
            <Field
              name={`sui:name:${validationMode}`}
              label="名前"
              errorMatches={{ valueMissing: "名前を入力してください。" }}
            >
              <TextField required className="w-full" placeholder="田中 太郎" />
            </Field>
            <Button size="sm" type="submit">
              送信
            </Button>
          </Form>
        ))}
      </div>
    );
  },
});

export const ServerErrors = meta.story({
  name: "サーバーエラー",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const [errors, setErrors] = React.useState<React.ComponentProps<typeof Form>["errors"]>({});

    return (
      <Form
        {...props}
        errors={errors}
        className="flex w-80 flex-col items-start gap-4"
        onFormSubmit={(formValues) => {
          setErrors(validateLogin(formValues));
        }}
      >
        <Field
          name="email"
          label="メールアドレス"
          errorMatches={{ valueMissing: "メールアドレスを入力してください。" }}
        >
          <TextField type="email" required className="w-full" placeholder="you@example.com" />
        </Field>
        <Button type="submit">送信</Button>
      </Form>
    );
  },
});

export const ActionsRef = meta.story({
  name: "命令的検証",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const actionsRef = React.useRef<Form.Actions>(null);

    return (
      <div className="flex flex-col gap-4">
        <Form {...props} className="flex w-80 flex-col items-start gap-4" actionsRef={actionsRef}>
          <Field
            name="sui:nickname"
            label="ニックネーム"
            errorMatches={{ valueMissing: "ニックネームを入力してください。" }}
          >
            <TextField required className="w-full" placeholder="すーるー" />
          </Field>
          <Button type="submit">送信</Button>
        </Form>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => actionsRef.current?.validate()} variant="liquid">
            すべて検証
          </Button>
          <Button
            size="sm"
            onClick={() => actionsRef.current?.validate("sui:nickname")}
            variant="liquid"
          >
            1件のみ検証
          </Button>
        </div>
      </div>
    );
  },
});

export const SubmitValues = meta.story({
  name: "送信値の受け取り",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const [values, setValues] = React.useState<Record<string, unknown> | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <Form
          {...props}
          className="flex w-80 flex-col items-start gap-4"
          onFormSubmit={(formValues) => {
            setValues(formValues);
          }}
        >
          <Field name="sui:company" label="会社名">
            <Input className="w-full" placeholder="例: Suru UI 株式会社" defaultValue="Suru UI" />
          </Field>
          <Field
            name="sui:email"
            label="メールアドレス"
            errorMatches={{ valueMissing: "メールアドレスを入力してください。" }}
          >
            <TextField type="email" required className="w-full" placeholder="you@example.com" />
          </Field>
          <Button type="submit">送信</Button>
        </Form>
        {values && <pre className="text-sm">{JSON.stringify(values, null, 2)}</pre>}
      </div>
    );
  },
});

export const WithFieldset = meta.story({
  name: "フィールドセット",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form {...props} onSubmit={(event) => event.preventDefault()} className="w-96">
        <Fieldset legend="お届け先">
          <Field name="sui:name" label="氏名">
            <Input required placeholder="例: 山田 太郎" />
          </Field>
          <Field name="sui:address" label="住所">
            <Input required placeholder="例: 東京都千代田区" />
          </Field>
          <Button type="submit">送信</Button>
        </Fieldset>
      </Form>
    );
  },
});

export const Parts = meta.story({
  name: "パーツで組み立てる",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <FormPartsRoot {...props} className="flex w-80 flex-col items-start gap-4">
        <Field name="sui:partsName" label="名前">
          <TextField required className="w-full" placeholder="田中 太郎" />
        </Field>
        <Button type="submit">送信</Button>
      </FormPartsRoot>
    );
  },
});

export const WithAPI = meta.story({
  name: "APIで組み立てる",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    const api = useFormAPI(props);

    return (
      <FormPartsRoot {...api.getRootProps()} className="flex w-80 flex-col items-start gap-4">
        <Field name="sui:apiName" label="名前">
          <TextField required className="w-full" placeholder="田中 太郎" />
        </Field>
        <Button type="submit">送信</Button>
      </FormPartsRoot>
    );
  },
});

export const LoginForm = meta.story({
  name: "実践例：ログイン",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form
        {...props}
        onSubmit={(event) => event.preventDefault()}
        className="flex w-80 flex-col gap-4 rounded border p-4"
      >
        <Field
          name="sui:loginEmail"
          label="メールアドレス"
          errorMatches={{
            typeMismatch: "有効なメールアドレスを入力してください。",
            valueMissing: "メールアドレスを入力してください。",
          }}
        >
          <TextField type="email" required className="w-full" placeholder="you@example.com" />
        </Field>
        <Field
          name="sui:loginPassword"
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

export const ContactForm = meta.story({
  name: "実践例：問い合わせ",
  ...ctrl({
    validationMode: "onSubmit",
  }),
  render(props) {
    return (
      <Form
        {...props}
        onSubmit={(event) => event.preventDefault()}
        className="flex w-96 flex-col gap-4 rounded border p-4"
      >
        <Fieldset legend="お問い合わせ内容">
          <Field name="sui:contactName" label="お名前">
            <TextField required placeholder="例: 山田 太郎" />
          </Field>
          <Field name="sui:contactEmail" label="メールアドレス">
            <TextField type="email" required placeholder="you@example.com" />
          </Field>
          <Field name="sui:contactBody" label="内容">
            <Textarea rows={4} required placeholder="お問い合わせ内容を入力してください。" />
          </Field>
          <Button type="submit">送信する</Button>
        </Fieldset>
      </Form>
    );
  },
});

function validateUrl(value: unknown): React.ComponentProps<typeof Form>["errors"] {
  const stringValue = typeof value === "string" ? value : "";

  try {
    const url = new URL(stringValue);

    if (url.hostname.endsWith("example.com")) {
      return { url: "example.com ドメインは使用できません" };
    }
  } catch {
    return { url: "有効な URL ではありません" };
  }

  return {};
}

function validateLogin(
  values: Record<string, unknown>,
): React.ComponentProps<typeof Form>["errors"] {
  if (values["email"] === "taken@example.com") {
    return { email: "このメールアドレスは既に使用されています。" };
  }

  return {};
}
