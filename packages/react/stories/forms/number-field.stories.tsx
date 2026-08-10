import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { NumberField } from "../../src/forms/number-field/index.js";

const meta = preview.meta({
  title: "Forms / NumberField",
  component: NumberField,
});

export default meta;

const ctrl = controls(NumberField, {
  accentColor: {
    options: COLORS,
    control: "select",
  },
  disabled: {
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
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  step: {
    control: "number",
  },
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return <NumberField {...props} defaultValue={100} className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <NumberField {...props} variant="naked" defaultValue={100} className="w-64" />
        <NumberField {...props} variant="liquid" defaultValue={100} className="w-64" />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: true,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <NumberField {...props} variant="naked" defaultValue={100} className="w-64" />
        <NumberField {...props} variant="liquid" defaultValue={100} className="w-64" />
      </div>
    );
  },
});

export const AccentColors = meta.story({
  name: "アクセントカラー",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <NumberField
            key={color}
            {...props}
            accentColor={color}
            defaultValue={100}
            className="w-64"
          />
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <NumberField {...props} size={size} defaultValue={100} className="w-64" />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <div key={radius}>
            <NumberField {...props} radius={radius} defaultValue={100} className="w-64" />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Step = meta.story({
  name: "刻み",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-64 flex-col items-start gap-2">
        <NumberField {...props} min={0} max={100} step={5} defaultValue={25} />
        <p className="text-sm opacity-80">増減ボタンは 5 ずつ動きます</p>
      </div>
    );
  },
});

export const ScrubArea = meta.story({
  name: "ドラッグ調整",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-64 flex-col items-start gap-2">
        <NumberField
          {...props}
          defaultValue={100}
          slotProps={{ scrubArea: { children: "100%" } }}
        />
        <p className="text-sm opacity-80">ラベルをドラッグすると数値を変更できます</p>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    const [value, setValue] = React.useState<number | null>(100);

    return (
      <div className="flex w-64 flex-col items-start gap-2">
        <NumberField {...props} value={value} onValueChange={setValue} />
        <p className="text-sm opacity-80">現在値: {value ?? "空"}</p>
      </div>
    );
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
  }),
  render(props) {
    return (
      <form className="flex w-64 flex-col items-start gap-2">
        <NumberField {...props} required className="w-64" />
        <button type="submit" className="underline">
          送信
        </button>
        <p className="text-sm opacity-80">送信を試みると検証が適用されます</p>
      </form>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <NumberField {...props} disabled defaultValue={100} className="w-64" />
        <NumberField {...props} disabled defaultValue={100} className="w-64" />
      </div>
    );
  },
});
