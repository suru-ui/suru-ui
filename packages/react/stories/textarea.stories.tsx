import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Field } from "../src/field/index.js";
import { Textarea } from "../src/textarea/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Textarea",
  component: Textarea,
});

export default meta;

const ctrl = controls(Textarea, {
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
  rows: {
    control: "number",
  },
  size: {
    options: SIZES,
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
    rows: undefined,
    placeholder: "問い合わせ内容",
  }),
  render(props) {
    return <Textarea {...props} className="w-64" />;
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
          <Textarea
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

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "grey",
    size: "md",
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
            <Textarea {...props} variant={variant} outlined className="w-64" />
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
