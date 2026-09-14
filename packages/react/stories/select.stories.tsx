import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Select } from "../src/select/index.js";

const RADII: readonly Select.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Select.Size[] = theme.SIZES;
const VARIANTS: readonly Select.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Select",
  component: Select<string, boolean>,
});

export default meta;

const ctrl = controls(Select<string, boolean>, {
  disabled: {
    control: "boolean",
  },
  items: {
    control: "object",
  },
  label: {
    control: "text",
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
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    label: "果物",
    placeholder: "果物を選択",
    items: fruits,
  }),
  render(props) {
    return <Select {...props} className="w-[200px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    label: undefined,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <Select
            {...props}
            key={variant}
            label={variant}
            variant={variant}
            className="w-[200px]"
          />
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <Select {...props} key={size} size={size} label={size} className="w-[200px]" />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    size: "md",
    outlined: false,
    disabled: false,
    placeholder: "選択",
    items: fruits,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <Select {...props} key={radius} label={radius} radius={radius} className="w-[200px]" />
        ))}
      </div>
    );
  },
});

export const ObjectItems = meta.story({
  name: "オブジェクトの項目",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    label: "言語",
    placeholder: "言語を選択",
    items: {
      ts: "TypeScript",
      rs: "Rust",
      go: "Go",
    },
  }),
  render(props: {}) {
    const [value, setValue] = React.useState<string | null>(null);

    return (
      <div className="flex flex-col gap-3">
        <Select {...props} value={value} className="w-[200px]" onValueChange={setValue} />
        <div>選択状態: {value ?? "未選択"}</div>
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    items: ["TypeScript", "Rust", "Go", "Python"],
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    label: "言語",
    placeholder: "言語を選択",
  }),
  render(props: {}) {
    return (
      <Select
        {...props}
        items={["TypeScript", "Rust", "Go", "Python"]}
        multiple
        className="w-[200px]"
        defaultValue={["TypeScript"]}
      />
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    label: "食材",
    placeholder: "食材を選択",
    items: [
      { label: "果物", items: ["りんご", "ばなな", "みかん"] },
      { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
    ],
  }),
  render(props) {
    return <Select {...props} className="w-[200px]" />;
  },
});

export const ManyItems = meta.story({
  name: "項目が多い場合",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    label: "食材",
    placeholder: "候補を選択",
  }),
  render(props) {
    return (
      <Select
        {...props}
        items={Array.from({ length: 100 }, (_, index) => `=== 候補 (${index + 1}) ===`)}
        className="w-[200px]"
      />
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: false,
    label: "食材",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Select {...props} items={fruits} disabled className="w-[200px]" defaultValue="りんご" />
        <Select {...props} items={fruits} disabled className="w-[200px]" placeholder="選択" />
      </div>
    );
  },
});
