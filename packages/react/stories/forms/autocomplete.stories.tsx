import { SIZES, COLORS } from "@suru-ui/theme";
import { SearchIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Autocomplete } from "../../src/forms/autocomplete/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "Forms / Autocomplete",
  component: Autocomplete,
});

export default meta;

const ctrl = controls(Autocomplete, {
  color: {
    options: COLORS,
    control: "select",
  },
  disabled: {
    control: "boolean",
  },
  empty: {
    control: "text",
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
    options: RADII,
    control: "select",
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

const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "フルーツを検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col items-start gap-2">
        <label>フルーツ</label>
        <Autocomplete
          {...props}
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

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Autocomplete
              {...props}
              variant={variant}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <Autocomplete
              {...props}
              variant={variant}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
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
    variant: "naked",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <Autocomplete
            key={color}
            {...props}
            color={color}
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

export const Addons = meta.story({
  name: "付属要素",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete
          {...props}
          endAddons={["について"]}
          slotProps={{
            inputGroup: {
              className: "w-[240px]",
            },
          }}
          startAddons={[<SearchIcon key={0} />]}
        />
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
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Autocomplete
              {...props}
              size={size}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
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
    placeholder: "検索",
    empty: "該当なし",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <Autocomplete
              {...props}
              radius={radius}
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Filled = meta.story({
  name: "入力済み",
  ...ctrl({
    items: ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"],
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    placeholder: "検索",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Autocomplete
          {...props}
          slotProps={{
            inputGroup: {
              className: "w-[200px]",
            },
          }}
          defaultValue="りんご"
        />
      </div>
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
    placeholder: "検索",
  }),
  render(props) {
    return (
      <Autocomplete
        {...props}
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
        slotProps={{
          inputGroup: {
            className: "w-[200px]",
          },
        }}
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
    placeholder: "候補を検索",
  }),
  render(props) {
    return (
      <Autocomplete
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
            <Autocomplete
              {...props}
              variant={variant}
              disabled
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
              defaultValue="値"
            />
            <Autocomplete
              {...props}
              variant={variant}
              disabled
              slotProps={{
                inputGroup: {
                  className: "w-[200px]",
                },
              }}
              placeholder="プレースホルダー"
            />
          </div>
        ))}
      </div>
    );
  },
});
