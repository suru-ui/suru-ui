import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Select } from "../src/select/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Select",
  component: Select,
});

export default meta;

const ctrl = controls(Select, {
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
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return <Select {...props} label="果物" className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    items: fruits,
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Select {...props} variant="naked" className="w-64" />
        <Select {...props} variant="liquid" className="w-64" />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    items: fruits,
    variant: "naked",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <Select {...props} key={size} size={size} items={fruits} label={size} className="w-64" />
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    outlined: undefined,
    disabled: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius}>
            <Select {...props} items={fruits} radius={radius} className="w-64" />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御された選択",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    const [value, setValue] = React.useState<string | null>(fruits[0] ?? null);

    return (
      <div className="flex flex-col gap-3">
        <Select
          {...props}
          items={fruits}
          label="果物"
          value={value}
          className="w-64"
          onValueChange={(next) => {
            if (typeof next === "string" || next === null) {
              setValue(next);
            }
          }}
        />
        <div>選択値: {value ?? "未選択"}</div>
      </div>
    );
  },
});

export const Uncontrolled = meta.story({
  name: "制御されていない選択",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return (
      <Select
        {...props}
        items={fruits}
        label="果物"
        className="w-64"
        defaultValue={fruits[1]}
        onValueChange={(value) => console.log(value)}
      />
    );
  },
});

export const ObjectItems = meta.story({
  name: "オブジェクトの項目",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "言語を選択",
  }),
  render(props) {
    return (
      <Select
        {...props}
        items={[
          { label: "TypeScript", value: "ts" },
          { label: "Rust", value: "rs" },
          { label: "Go", value: "go" },
        ]}
        label="言語"
        className="w-64"
      />
    );
  },
});

export const CustomRenderer = meta.story({
  name: "描画の上書き",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return (
      <Select {...props} items={fruits} label="果物" className="w-64">
        {(item) => `🍎 ${String(item)}`}
      </Select>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    items: ["TypeScript", "Rust", "Go", "Python"],
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "言語を選択",
  }),
  render(props) {
    const { value: _value, multiple: _multiple, ...rest } = props;

    return (
      <Select
        {...rest}
        items={["TypeScript", "Rust", "Go", "Python"]}
        label="言語"
        multiple
        className="w-80"
        placeholder="言語を選択"
        defaultValue={["TypeScript"]}
      >
        {(item) => item}
      </Select>
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "食材を選択",
  }),
  render(props) {
    return (
      <Select
        {...props}
        items={[
          { label: "果物", items: ["りんご", "ばなな", "みかん"] },
          { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
        ]}
        label="食材"
        className="w-80"
        placeholder="食材を選択"
      />
    );
  },
});

export const ManyItems = meta.story({
  name: "項目が多い場合",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    disabled: false,
    multiple: false,
    placeholder: "候補を選択",
  }),
  render(props) {
    return (
      <Select
        {...props}
        items={Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`)}
        className="w-64"
        placeholder="候補を選択"
      />
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: undefined,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Select {...props} items={fruits} disabled className="w-64" defaultValue="りんご" />
        <Select {...props} items={fruits} disabled className="w-64" placeholder="選択" />
      </div>
    );
  },
});
