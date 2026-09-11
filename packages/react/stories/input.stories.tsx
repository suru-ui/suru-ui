import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Field } from "../src/field/index.js";
import { Input } from "../src/input/index.js";

const COLORS: readonly Input.Color[] = theme.COLORS;
const SIZES: readonly Input.Size[] = theme.SIZES;
const RADII: readonly Input.Radius[] = ["none", ...theme.SIZES, "full"];
const TYPES: readonly Input.Type[] = [
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "month",
  "number",
  "password",
  "search",
  "tel",
  "text",
  "time",
  "url",
  "week",
];
const VARIANTS: readonly Input.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Input",
  component: Input,
});

export default meta;

const ctrl = controls(Input, {
  color: {
    control: "select",
    options: COLORS,
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
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  type: {
    control: "select",
    options: TYPES,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
    type: "text",
  }),
  render(props) {
    return <Input {...props} className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Input {...props} variant={variant} className="w-64" />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    placeholder: "色",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Input
            {...props}
            key={color}
            color={color}
            className="w-64"
            defaultValue={
              {
                grey: "grey グレー",
                blue: "blue ブルー",
                purple: "purple パープル",
                magenta: "magenta マゼンタ",
                red: "red レッド",
                orange: "orange オレンジ",
                yellow: "yellow イエロー",
                green: "green グリーン",
              }[color]
            }
          />
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Input {...props} radius={radius} className="w-64" />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Input {...props} variant={variant} outlined className="w-64" />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Input {...props} size={size} className="w-64" />
          </div>
        ))}
      </div>
    );
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    return (
      <Field invalid>
        <Input {...props} className="w-64" defaultValue="不正な値" />
      </Field>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Input {...props} variant={variant} disabled className="w-64" defaultValue="入力値" />
            <Input
              {...props}
              variant={variant}
              disabled
              className="w-64"
              placeholder="プレースホルダー"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Types = meta.story({
  name: "入力項目の種類",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const items = [
      { type: "email", label: "email", placeholder: "taro@example.com" },
      { type: "password", label: "password", placeholder: "パスワード" },
      { type: "search", label: "search", placeholder: "検索キーワード" },
      { type: "tel", label: "tel", placeholder: "090-1234-5678" },
      { type: "url", label: "url", placeholder: "https://example.com" },
      { type: "number", label: "number", placeholder: "123" },
      { type: "date", label: "date", placeholder: undefined },
      { type: "time", label: "time", placeholder: undefined },
    ] as const;
    return (
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.type} className="flex flex-col gap-2">
            <span>{item.label}</span>
            <Input {...props} type={item.type} className="w-64" placeholder={item.placeholder} />
          </div>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "田中 太郎",
  }),
  render(props) {
    const [value, setValue] = React.useState("田中 太郎");
    return (
      <div className="flex flex-col gap-2">
        <Input {...props} value={value} className="w-64" onValueChange={setValue} />
        <span>
          入力値:
          {value === "" ? "(空)" : value}
        </span>
        <div>
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Input {...props} readOnly className="w-64" defaultValue="読み取り専用の値" />
        <Input {...props} readOnly className="w-64" placeholder="プレースホルダー" />
      </div>
    );
  },
});

export const Empty = meta.story({
  name: "空と長い入力値",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-64 flex-col gap-3">
        <Input {...props} placeholder="空の入力欄" />
        <Input
          {...props}
          defaultValue="とても長い入力値がどのように表示されるかを確認するためのテキストです"
        />
        <Input {...props} maxLength={10} placeholder="最大10文字" defaultValue="1234567890" />
      </div>
    );
  },
});

export const WithField = meta.story({
  name: "ラベルと説明",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field label="氏名" description="本名を入力します。">
          <Input {...props} className="w-64" placeholder="田中 太郎" />
        </Field>
        <Field label="メールアドレス" invalid description="確認メールを送信します。">
          <Input {...props} type="email" className="w-64" defaultValue="不正な値" />
        </Field>
      </div>
    );
  },
});

export const Required = meta.story({
  name: "必須と検証",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3">
        <Field label="氏名" description="空のまま送信すると枠線が赤くなります。">
          <Input {...props} required className="w-64" minLength={2} placeholder="田中 太郎" />
        </Field>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    );
  },
});

export const LoginForm = meta.story({
  name: "実践例: ログイン",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const email = data.get("email");
          setSubmitted(typeof email === "string" ? email : "");
        }}
        className="flex w-64 flex-col gap-3"
      >
        <Field label="メールアドレス">
          <Input
            {...props}
            name="email"
            type="email"
            placeholder="taro@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="パスワード">
          <Input
            {...props}
            name="password"
            type="password"
            placeholder="パスワード"
            autoComplete="current-password"
          />
        </Field>
        <div>
          <button type="submit">ログイン</button>
        </div>
        {submitted !== null && <span>{submitted} でログインしました。</span>}
      </form>
    );
  },
});

export const Search = meta.story({
  name: "実践例: 検索",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: "full",
    outlined: false,
    disabled: false,
  }),
  render(props) {
    const [query, setQuery] = React.useState("");
    return (
      <search>
        <form onSubmit={(event) => event.preventDefault()} className="flex w-80 gap-2">
          <Input
            {...props}
            type="search"
            value={query}
            className="flex-1"
            placeholder="キーワードで検索"
            onValueChange={setQuery}
            aria-label="サイト内検索"
          />
          <div>
            <button type="submit">検索</button>
          </div>
        </form>
      </search>
    );
  },
});
