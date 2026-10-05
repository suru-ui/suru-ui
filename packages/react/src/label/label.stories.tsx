import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Checkbox } from "../checkbox/index.js";
import { Input } from "../input/index.js";
import { Label } from "./index.js";

const COLORS: readonly Label.Color[] = theme.COLORS;
const SIZES: readonly Label.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Label",
  component: Label,
});

export default meta;

const ctrl = controls(Label, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  htmlFor: {
    control: "text",
  },
  children: {
    control: "text",
  },
  disabled: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    htmlFor: undefined,
    children: "メールアドレス",
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
    size: "md",
    htmlFor: undefined,
    children: "名前",
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
    htmlFor: undefined,
    children: "ラベル",
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

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    color: "grey",
    htmlFor: undefined,
    children: "ラベル",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col gap-2">
            <span>{color}</span>
            <Label {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const WithInputSizes = meta.story({
  name: "入力との大きさ合わせ",
  ...ctrl({
    htmlFor: undefined,
    children: "メールアドレス",
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
    size: "md",
    htmlFor: undefined,
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

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    htmlFor: undefined,
    children: "メールアドレス",
    disabled: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label {...props} htmlFor="label-disabled-input" />
          <Input id="label-disabled-input" disabled placeholder="suru@example.com" />
        </div>
        <Label {...props}>無効なラベル</Label>
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
    size: "md",
    htmlFor: undefined,
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
    size: "md",
    htmlFor: undefined,
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
    size: "md",
    htmlFor: undefined,
    children: "押すと入力欄に移動します",
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
