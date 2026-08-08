import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const meta = preview.meta({
  title: "Forms / Autocomplete",
  component: Autocomplete,
});

export default meta;

const ctrl = controls(Autocomplete, {
  accentColor: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  items: {
    control: "object",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    placeholder: "フルーツを検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col items-start gap-2">
        <label className="text-sm">フルーツ</label>
        <Autocomplete {...props} className="w-64" />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete {...props} variant="naked" className="w-64" />
        <Autocomplete {...props} variant="liquid" className="w-64" />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: true,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete {...props} className="w-64" />
        <Autocomplete {...props} variant="liquid" className="w-64" />
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Autocomplete key={color} {...props} accentColor={color} className="w-64" />
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <Autocomplete key={size} {...props} size={size} className="w-64" />
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete {...props} radius="none" className="w-64" />
        <Autocomplete {...props} radius="rounded" className="w-64" />
        <Autocomplete {...props} radius="full" className="w-64" />
      </div>
    );
  },
});

export const Filled = meta.story({
  name: "入力済み",
  ...ctrl({
    variant: "naked",
    accentColor: "grey",
    size: "md",
    radius: "rounded",
    outlined: undefined,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete {...props} defaultValue="りんご" className="w-64" />
      </div>
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <Autocomplete
        {...props}
        className="w-96"
        items={[
          {
            label: "果物",
            items: ["りんご", "バナナ", "みかん"],
          },
          {
            label: "野菜",
            items: ["にんじん", "きゅうり", "トマト"],
          },
        ]}
      />
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete {...props} disabled defaultValue="りんご" className="w-96" />
        <Autocomplete {...props} disabled placeholder="検索" className="w-64" />
      </div>
    );
  },
});
