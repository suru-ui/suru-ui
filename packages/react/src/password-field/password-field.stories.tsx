import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Field } from "../field/index.js";
import { PasswordField } from "./index.js";

const COLORS: readonly PasswordField.Color[] = theme.COLORS;
const RADII: readonly PasswordField.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly PasswordField.Size[] = theme.SIZES;
const VARIANTS: readonly PasswordField.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "PasswordField",
  component: PasswordField,
});

export default meta;

const ctrl = controls(PasswordField, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  placeholder: {
    control: "text",
  },
  visibilityToggle: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return <PasswordField {...props} className="w-[320px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <PasswordField {...props} variant={variant} className="w-[320px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: true,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <PasswordField
            {...props}
            key={color}
            color={color}
            className="w-64"
            defaultValue={
              {
                red: "red レッド",
                blue: "blue ブルー",
                grey: "grey グレー",
                green: "green グリーン",
                orange: "orange オレンジ",
                purple: "purple パープル",
                yellow: "yellow イエロー",
                magenta: "magenta マゼンタ",
              }[color]
            }
          />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <PasswordField {...props} radius={radius} className="w-[320px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <PasswordField {...props} variant={variant} outlined className="w-[320px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <PasswordField {...props} size={size} className="w-[320px]" />
          </div>
        ))}
      </div>
    );
  },
});

export const WithoutVisibilityToggle = meta.story({
  name: "表示切替ボタンなし",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
  }),
  render(props) {
    return <PasswordField {...props} className="w-[320px]" visibilityToggle={false} />;
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Field invalid>
          <PasswordField {...props} required className="w-[320px]" defaultValue="不正な値" />
        </Field>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    outlined: false,
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <PasswordField
              {...props}
              variant={variant}
              disabled
              className="w-[320px]"
              defaultValue="パスワード"
            />
            <PasswordField
              {...props}
              variant={variant}
              disabled
              className="w-[320px]"
              placeholder="プレースホルダー"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const ControlledVisibility = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    const [value, setValue] = React.useState("secret123");
    const [visible, setVisible] = React.useState(false);
    return (
      <div className="flex flex-col gap-2">
        <PasswordField
          {...props}
          value={value}
          visible={visible}
          className="w-[320px]"
          onValueChange={(next) => setValue(next)}
          onVisibleChange={setVisible}
        />
        <span>{visible ? "表示中" : "非表示中"}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => setVisible((prev) => !prev)}>
            表示を切り替える
          </button>
          <button type="button" onClick={() => setValue("")}>
            クリア
          </button>
        </div>
      </div>
    );
  },
});

export const ReadOnly = meta.story({
  name: "読み取り専用",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <PasswordField {...props} readOnly className="w-[320px]" defaultValue="secret123" />
        <PasswordField {...props} readOnly className="w-[320px]" placeholder="プレースホルダー" />
      </div>
    );
  },
});

export const EmptyAndLong = meta.story({
  name: "空と長い入力値",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <PasswordField {...props} placeholder="空の入力欄" />
        <PasswordField {...props} defaultValue={"とても長いパスワード".repeat(10)} />
        <PasswordField {...props} radius="full" defaultValue="secret123" />
      </div>
    );
  },
});

export const Addons = meta.story({
  name: "接頭辞と接尾辞",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <PasswordField {...props} startAddons={["🔒"]} defaultValue="secret123" />
        <PasswordField
          {...props}
          endAddons={["8 文字以上"]}
          defaultValue="secret123"
          visibilityToggle={false}
        />
        <PasswordField
          {...props}
          endAddons={["8 文字以上"]}
          startAddons={["🔒"]}
          defaultValue="secret123"
        />
      </div>
    );
  },
});

export const WithField = meta.story({
  name: "ラベルと説明",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field label="パスワード" description="8 文字以上で入力します。">
          <PasswordField {...props} className="w-[320px]" defaultValue="secret123" />
        </Field>
        <Field label="パスワード" invalid description="8 文字以上で入力します。">
          <PasswordField {...props} required className="w-[320px]" defaultValue="short" />
        </Field>
      </div>
    );
  },
});

export const Required = meta.story({
  name: "必須と検証",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: true,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3">
        <Field label="パスワード" description="空のまま送信すると枠線が赤くなります。">
          <PasswordField {...props} required className="w-[320px]" />
        </Field>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-2">
        <PasswordField
          {...props}
          slotProps={{ input: { "aria-label": "パスワード" } }}
          defaultValue="secret123"
        />
        <p>
          Tab キーで入力欄と表示切替ボタンへ移動し、ボタン上で Enter キーや Space
          キーで表示を切り替えます。
        </p>
      </div>
    );
  },
});

export const LoginForm = meta.story({
  name: "実践例: ログインフォーム",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    placeholder: "パスワード",
    visibilityToggle: true,
  }),
  render(props) {
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const password = data.get("password");
          setSubmitted(typeof password === "string" ? password : null);
        }}
        className="flex w-[320px] flex-col gap-3"
      >
        <Field label="パスワード" description="8 文字以上で入力します。">
          <PasswordField
            {...props}
            name="password"
            required
            slotProps={{ input: { minLength: 8 } }}
          />
        </Field>
        <div>
          <button type="submit">ログイン</button>
        </div>
        {submitted !== null && <span>{submitted.length} 文字で送信しました。</span>}
      </form>
    );
  },
});
