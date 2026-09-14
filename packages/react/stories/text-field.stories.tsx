import * as theme from "@suru-ui/theme";
import { LinkIcon, PenToolIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Field } from "../src/field/index.js";
import { TextField } from "../src/text-field/index.js";

const COLORS: readonly TextField.Color[] = theme.COLORS;
const SIZES: readonly TextField.Size[] = theme.SIZES;
const RADII: readonly TextField.Radius[] = ["none", ...SIZES, "full"];
const TYPES = [
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
] as const;
const VARIANTS: readonly TextField.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "TextField",
  component: TextField,
});

export default meta;

const ctrl = controls(TextField, {
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
    return <TextField {...props} className="w-[320px]" />;
  },
});

export const WidhAddons = meta.story({
  name: "アドオン付き",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "example.com",
    type: "text",
  }),
  render(props) {
    return (
      <TextField
        {...props}
        className="w-[320px]"
        endAddons={[<LinkIcon key={0} />]}
        startAddons={["https://"]}
      />
    );
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
    placeholder: "example.com",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <TextField
              {...props}
              variant={variant}
              className="w-[320px]"
              endAddons={[<LinkIcon key={0} />]}
              startAddons={["https://"]}
            />
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
          <TextField
            {...props}
            key={color}
            color={color}
            className="w-64"
            endAddons={[<PenToolIcon key={0} />]}
            startAddons={["色"]}
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

export const Radii = meta.story({
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
            <TextField {...props} radius={radius} className="w-[320px]" />
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
            <TextField {...props} variant={variant} outlined className="w-[320px]" />
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
    placeholder: "example.com",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <TextField
              {...props}
              size={size}
              className="w-[320px]"
              endAddons={[<LinkIcon key={0} />]}
              startAddons={["https://"]}
            />
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
      <div className="flex flex-col gap-3">
        <Field invalid>
          <TextField
            {...props}
            className="w-[320px]"
            endAddons={[<LinkIcon key={0} />]}
            startAddons={["https://"]}
            defaultValue="不正な値"
          />
        </Field>
      </div>
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
            <TextField
              {...props}
              variant={variant}
              disabled
              className="w-[320px]"
              endAddons={[<LinkIcon key={0} />]}
              startAddons={["https://"]}
              defaultValue="入力値"
            />
            <TextField
              {...props}
              variant={variant}
              disabled
              className="w-[320px]"
              endAddons={[<LinkIcon key={0} />]}
              placeholder="プレースホルダー"
              startAddons={["https://"]}
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
    const [value, setValue] = React.useState("田中 太郎");
    return (
      <div className="flex flex-col gap-2">
        <TextField {...props} value={value} className="w-[320px]" onValueChange={setValue} />
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
    placeholder: "田中 太郎",
    type: "text",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <TextField {...props} readOnly className="w-[320px]" defaultValue="読み取り専用の値" />
        <TextField {...props} readOnly className="w-[320px]" placeholder="プレースホルダー" />
      </div>
    );
  },
});

export const EmptyAndLong = meta.story({
  name: "空と長い入力値",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    type: "text",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <TextField {...props} placeholder="空の入力欄" />
        <TextField
          {...props}
          defaultValue="とても長い入力値がどのように表示されるかを確認するためのテキストです"
        />
        <TextField {...props} radius="full" defaultValue="角丸の入力欄" />
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
    type: "text",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field label="氏名" description="本名を入力します。">
          <TextField {...props} className="w-[320px]" placeholder="田中 太郎" />
        </Field>
        <Field label="サイト" invalid description="正しい住所を入力します。">
          <TextField
            {...props}
            className="w-[320px]"
            startAddons={["https://"]}
            defaultValue="不正な値"
          />
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
    placeholder: "田中 太郎",
    type: "text",
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3">
        <Field label="氏名" description="空のまま送信すると枠線が赤くなります。">
          <TextField
            {...props}
            required
            className="w-[320px]"
            slotProps={{ input: { minLength: 2 } }}
          />
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    type: "text",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-2">
        <TextField
          {...props}
          slotProps={{ input: { "aria-label": "氏名" } }}
          startAddons={["https://"]}
          defaultValue="example.com"
        />
        <p>Tab キーで入力欄へ移動します。枠線の余白を選んでも入力欄へ焦点が移ります。</p>
      </div>
    );
  },
});
