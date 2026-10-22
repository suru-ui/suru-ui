import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Field } from "../field/index.js";
import { Textarea } from "./index.js";

const COLORS: readonly Textarea.Color[] = theme.COLORS;
const SIZES: readonly Textarea.Size[] = theme.SIZES;
const RADII: readonly Textarea.Radius[] = ["none", ...SIZES];
const VARIANTS: readonly Textarea.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Textarea",
  component: Textarea,
});

export default meta;

const ctrl = controls(Textarea, {
  rows: {
    control: "number",
  },
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
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    rows: undefined,
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return <Textarea {...props} className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Textarea {...props} variant={variant} className="w-64" />
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
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "色",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Textarea
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
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Textarea {...props} radius={radius} className="w-64" />
          </div>
        ))}
      </div>
    );
  },
});

export const WithoutOutline = meta.story({
  name: "枠線なし",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    disabled: false,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Textarea {...props} variant={variant} outlined={false} className="w-64" />
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
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3 w-64">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Textarea {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Rows = meta.story({
  name: "行数",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3 w-64">
        {[2, 4, 6].map((rows) => (
          <div key={rows} className="flex flex-col gap-2">
            <span>{rows}</span>
            <Textarea {...props} rows={rows} />
          </div>
        ))}
      </div>
    );
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return (
      <Field invalid>
        <Textarea {...props} className="w-64" defaultValue="不正な値" />
      </Field>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Textarea
              {...props}
              variant={variant}
              disabled
              className="w-64"
              defaultValue="入力値"
            />
            <Textarea
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

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    const [value, setValue] = React.useState("初期の問い合わせ内容");
    return (
      <div className="flex flex-col gap-2">
        <Textarea {...props} value={value} className="w-64" onValueChange={setValue} />
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
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Textarea {...props} readOnly className="w-64" defaultValue="読み取り専用の値" />
        <Textarea {...props} readOnly className="w-64" placeholder="プレースホルダー" />
      </div>
    );
  },
});

export const Empty = meta.story({
  name: "空と長い入力値",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-64 flex-col gap-3">
        <Textarea {...props} placeholder="空の入力欄" />
        <Textarea
          {...props}
          defaultValue="とても長い入力値がどのように表示されるかを確認するためのテキストです。複数行にわたる場合の折り返しと高さを確認します。"
        />
        <Textarea {...props} maxLength={10} placeholder="最大10文字" defaultValue="1234567890" />
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
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field label="問い合わせ内容" description="できるだけ詳しく入力します。">
          <Textarea {...props} className="w-64" placeholder="問い合わせ内容" />
        </Field>
        <Field label="問い合わせ内容" invalid description="10文字以上で入力します。">
          <Textarea {...props} className="w-64" defaultValue="短い" />
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
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3">
        <Field label="問い合わせ内容" description="空のまま送信すると枠線が赤くなります。">
          <Textarea {...props} required className="w-64" minLength={10} placeholder="10文字以上" />
        </Field>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    );
  },
});

export const ContactForm = meta.story({
  name: "実践例: 問い合わせ",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "naked",
    disabled: false,
    outlined: true,
  }),
  render(props) {
    const [submitted, setSubmitted] = React.useState<string | null>(null);
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const message = data.get("message");
          setSubmitted(typeof message === "string" ? message : "");
        }}
        className="flex w-64 flex-col gap-3"
      >
        <Field label="問い合わせ内容">
          <Textarea {...props} name="message" rows={4} placeholder="問い合わせ内容" />
        </Field>
        <div>
          <button type="submit">送信</button>
        </div>
        {submitted !== null && (
          <span>{submitted === "" ? "(空)" : submitted} を受け付けました。</span>
        )}
      </form>
    );
  },
});
