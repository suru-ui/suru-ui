import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Checkbox } from "../src/checkbox/index.js";
import { Input } from "../src/input/index.js";
import { Label } from "../src/label/index.js";

const SIZES: readonly Label.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Label",
  component: Label,
});

export default meta;

const ctrl = controls(Label, {
  children: {
    control: "text",
  },
  htmlFor: {
    control: "text",
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "メールアドレス",
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <Label {...props} htmlFor="label-usage-input" />
        <Input id="label-usage-input" placeholder="suru@example.com" />
      </div>
    );
  },
});

export const NestingControl = meta.story({
  name: "コントロールを子に置く",
  ...ctrl({
    children: "名前",
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <Label {...props}>
        <Input placeholder="山田太郎" />
      </Label>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "ラベル",
    htmlFor: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Label {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const WithInputSizes = meta.story({
  name: "入力との大きさ合わせ",
  ...ctrl({
    children: "メールアドレス",
    htmlFor: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <Label {...props} size={size} htmlFor={`label-input-size-${size}`}>
              {props.children} ({size})
            </Label>
            <Input id={`label-input-size-${size}`} size={size} placeholder="suru@example.com" />
          </div>
        ))}
      </div>
    );
  },
});

export const Required = meta.story({
  name: "必須と任意",
  ...ctrl({
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label {...props} htmlFor="label-required-input">
            メールアドレス
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          </Label>
          <Input id="label-required-input" required placeholder="suru@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label {...props} htmlFor="label-optional-input">
            ニックネーム
            <span className="ml-2 text-sm opacity-70">任意</span>
          </Label>
          <Input id="label-optional-input" placeholder="すーるー" />
        </div>
      </div>
    );
  },
});

export const WithCheckbox = meta.story({
  name: "チェックボックス付き",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Label {...props} className="flex items-center gap-2">
          <Checkbox />
          利用規約に同意する
        </Label>
        <Label {...props} className="flex items-center gap-2">
          <Checkbox defaultChecked />
          メールを受け取る
        </Label>
      </div>
    );
  },
});

export const LongContent = meta.story({
  name: "長い内容",
  ...ctrl({
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex max-w-64 flex-col gap-2">
        <Label {...props} htmlFor="label-long-input">
          とても長いラベルテキストが折り返されても読みやすく表示されることを確認するための例です。利用規約や説明文をそのまま見出しにする場合は短く言い換えます。
        </Label>
        <Input id="label-long-input" placeholder="入力" />
      </div>
    );
  },
});

export const LoginForm = meta.story({
  name: "実フォーム例",
  ...ctrl({
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex max-w-80 flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label {...props} htmlFor="label-login-email">
            メールアドレス
          </Label>
          <Input
            id="label-login-email"
            type="email"
            placeholder="suru@example.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label {...props} htmlFor="label-login-password">
            パスワード
          </Label>
          <Input id="label-login-password" type="password" autoComplete="current-password" />
        </div>
        <Label {...props} className="flex items-center gap-2">
          <Checkbox />
          ログイン状態を保持する
        </Label>
      </form>
    );
  },
});

export const ClickToFocus = meta.story({
  name: "押下で移動",
  ...ctrl({
    children: "押すと入力欄に移動します",
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    const [focused, setFocused] = React.useState(false);

    return (
      <div className="flex flex-col gap-2">
        <Label {...props} htmlFor="label-focus-input" />
        <Input
          id="label-focus-input"
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholder="ここに移動します"
        />
        <span className="text-sm opacity-70" aria-live="polite">
          {focused ? "入力欄に移動しました" : "ラベルを押してみます"}
        </span>
      </div>
    );
  },
});
