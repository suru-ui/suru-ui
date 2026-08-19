import { SIZES, COLORS } from "@suru-ui/theme";
import { LinkIcon, PenToolIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Field } from "../../src/forms/field/index.js";
import { TextField } from "../../src/forms/text-field/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
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
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / TextField",
  component: TextField,
});

export default meta;

const ctrl = controls(TextField, {
  color: {
    options: COLORS,
    control: "select",
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
    options: RADII,
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  type: {
    options: TYPES,
    control: "select",
  },
  variant: {
    options: VARIANTS,
    control: "select",
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
  name: "バリエーション",
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
            <span className="text-sm">{variant}</span>
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
            className="w-64"
            endAddons={[<PenToolIcon key={0} />]}
            startAddons={["色"]}
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
            <span className="text-sm">{radius}</span>
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
            <span className="text-sm">{variant}</span>
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
            <span className="text-sm">{size}</span>
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
            <span className="text-sm">{variant}</span>
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
              startAddons={["https://"]}
              placeholder="プレースホルダー"
            />
          </div>
        ))}
      </div>
    );
  },
});
