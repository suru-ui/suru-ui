import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Select } from "../../src/forms/select/index.js";

const meta = preview.meta({
  title: "Forms / Select",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: fruits,
    variant: "naked",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return <Select {...props} label="果物" className="w-64" />;
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    items: fruits,
    size: "md",
    radius: "rounded",
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
  render() {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <Select key={size} items={fruits} size={size} label={size} className="w-64" />
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  render() {
    return (
      <div className="flex flex-col gap-3">
        <Select items={fruits} radius="none" className="w-64" />
        <Select items={fruits} radius="rounded" className="w-64" />
        <Select items={fruits} radius="full" className="w-64" />
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  render() {
    return (
      <Select
        items={["TypeScript", "Rust", "Go", "Python"]}
        multiple
        defaultValue={["TypeScript"]}
        label="言語"
        placeholder="言語を選択"
        className="w-80"
      >
        {(item) => item}
      </Select>
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  render() {
    return (
      <Select
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
  render() {
    return (
      <Select
        items={Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`)}
        placeholder="候補を選択"
        className="w-64"
      />
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  render() {
    return (
      <div className="flex flex-col gap-3">
        <Select items={fruits} disabled defaultValue="りんご" className="w-64" />
        <Select items={fruits} disabled placeholder="選択" className="w-64" />
      </div>
    );
  },
});
