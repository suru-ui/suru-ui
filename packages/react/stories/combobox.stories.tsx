import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Combobox } from "../src/combobox/index.js";

const COLORS: readonly Combobox.Color[] = theme.COLORS;
const SIZES: readonly Combobox.Size[] = theme.SIZES;
const RADII: readonly Combobox.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Combobox.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Combobox",
  component: Combobox,
});

export default meta;

const ctrl = controls(Combobox, {
  color: {
    control: "select",
    options: COLORS,
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
const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: fruits,
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "果物を選択",
  }),
  render(props) {
    return <Combobox {...props} label="果物" className="w-[200px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    items: fruits,
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Combobox
          {...props}
          variant="naked"
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
        />
        <Combobox
          {...props}
          variant="liquid"
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
        />
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数選択",
  ...ctrl({
    items: ["TypeScript", "Rust", "Go", "Python"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: true,
    placeholder: "言語を追加",
  }),
  render(props) {
    const { value: _value, multiple: _multiple, ...rest } = props;

    return (
      <Combobox
        {...rest}
        items={["TypeScript", "Rust", "Go", "Python"]}
        label="言語"
        multiple
        className="w-80"
        placeholder="言語を追加"
        defaultValue={["TypeScript"]}
      />
    );
  },
});

export const Grouped = meta.story({
  name: "グループ化",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "食材を選択",
  }),
  render(props) {
    return (
      <Combobox
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
    items: manyItems,
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "候補を検索",
  }),
  render(props) {
    return (
      <Combobox
        {...props}
        slotProps={{
          inputGroup: {
            className: "w-[200px]",
          },
        }}
      />
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    items: fruits,
    variant: "liquid",
    color: "grey",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size}>
            <Combobox
              {...props}
              size={size}
              items={fruits}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "配色",
  ...ctrl({
    items: fruits,
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Combobox
            {...props}
            key={color}
            color={color}
            items={fruits}
            slotProps={{
              inputGroup: {
                className: "w-[200px]",
              },
            }}
          />
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    items: fruits,
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Combobox
          {...props}
          items={fruits}
          disabled
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
          defaultValue="りんご"
        />
        <Combobox
          {...props}
          items={fruits}
          disabled
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
          placeholder="選択"
        />
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    items: fruits,
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
    multiple: false,
    placeholder: "選択",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius}>
            <Combobox
              {...props}
              radius={radius}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});
