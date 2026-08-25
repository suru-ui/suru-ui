import { SIZES, COLORS } from "@suru-ui/theme";
import { JapaneseYenIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Field } from "../src/field/index.js";
import { NumberField } from "../src/number-field/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / NumberField",
  component: NumberField,
});

export default meta;

const ctrl = controls(NumberField, {
  color: {
    options: COLORS,
    control: "select",
  },
  decrement: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
  increment: {
    control: "boolean",
  },
  max: {
    control: "number",
  },
  min: {
    control: "number",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    options: RADII,
    control: "select",
  },
  scrubArea: {
    control: "text",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  step: {
    control: "number",
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
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return <NumberField {...props} className="w-[320px]" defaultValue={100} />;
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
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              variant={variant}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
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
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <NumberField
            {...props}
            key={color}
            color={color}
            className="w-[320px]"
            placeholder={color}
            startAddons={[<JapaneseYenIcon key={0} />]}
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
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <NumberField
              {...props}
              radius={radius}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
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
    scrubArea: undefined,
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              variant={variant}
              outlined
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
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
    outlined: false,
    disabled: false,
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <NumberField
              {...props}
              size={size}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
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
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Field invalid>
          <NumberField
            {...props}
            className="w-[320px]"
            startAddons={[<JapaneseYenIcon key={0} />]}
            defaultValue={100}
          />
        </Field>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              disabled
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
            <NumberField
              {...props}
              disabled
              className="w-[320px]"
              placeholder="プレースホルダー"
              startAddons={[<JapaneseYenIcon key={0} />]}
            />
          </div>
        ))}
      </div>
    );
  },
});
