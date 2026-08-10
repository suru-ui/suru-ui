import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Combobox } from "../../src/forms/combobox/index.js";

const meta = preview.meta({
  title: "Forms / Combobox",
  component: Combobox,
});

export default meta;

const ctrl = controls(Combobox, {
  accentColor: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  multiple: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  placeholder: {
    control: "text",
  },
  radius: {
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];
const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: fruits,
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return <Combobox {...props} label="果物" className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    items: fruits,
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Combobox {...props} variant="naked" className="w-64" />
        <Combobox {...props} variant="liquid" className="w-64" />
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    items: ["TypeScript", "Rust", "Go", "Python"],
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: true,
    placeholder: "言語を追加",
  }),
  render(props) {
    const { multiple: _multiple, value: _value, ...rest } = props;

    return (
      <Combobox
        {...rest}
        items={["TypeScript", "Rust", "Go", "Python"]}
        multiple
        defaultValue={["TypeScript"]}
        label="言語"
        placeholder="言語を追加"
        className="w-80"
      />
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "食材を選択",
  }),
  render(props) {
    return (
      <Combobox
        {...props}
        label="食材"
        className="w-80"
        items={[
          { label: "果物", items: ["りんご", "ばなな", "みかん"] },
          { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
        ]}
        placeholder="食材を選択"
      />
    );
  },
});

export const ManyItems = meta.story({
  name: "項目が多い場合",
  ...ctrl({
    items: manyItems,
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "候補を検索",
  }),
  render(props) {
    return <Combobox {...props} className="w-64" />;
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    items: fruits,
    variant: "naked",
    accentColor: "grey",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <Combobox {...props} items={fruits} size={size} className="w-64" />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const AccentColors = meta.story({
  name: "アクセントカラー",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Combobox {...props} key={color} items={fruits} accentColor={color} className="w-64" />
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    items: fruits,
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Combobox {...props} items={fruits} disabled defaultValue="りんご" className="w-64" />
        <Combobox {...props} items={fruits} disabled placeholder="選択" className="w-64" />
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    items: fruits,
    variant: "naked",
    accentColor: "grey",
    size: "md",
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <div key={radius}>
            <Combobox {...props} radius={radius} className="w-64" />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});
