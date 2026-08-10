import { COLOR_TEMPLATES as VARIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CheckIcon, TagIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Chip } from "../../src/data-display/chip/index.js";

const meta = preview.meta({
  title: "Data Display / Chip",
  component: Chip,
});

export default meta;

const ctrl = controls(Chip, {
  color: {
    options: COLORS,
    control: "select",
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
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "新着",
    color: "blue",
    outlined: false,
    radius: "full",
    size: "sm",
    variant: "liquid",
  }),
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "full",
    size: "sm",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Chip {...props} className="gap-2">
          <TagIcon />
          タグ
        </Chip>
        <Chip {...props} color="green" className="gap-2">
          <CheckIcon />
          完了
        </Chip>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "full",
    size: "sm",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Chip {...props} variant="solid">
          ソリッド
        </Chip>
        <Chip {...props} variant="naked">
          ネイキッド
        </Chip>
        <Chip {...props} variant="liquid">
          リキッド
        </Chip>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "blue",
    radius: "full",
    size: "sm",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Chip {...props} outlined={false}>
          通常
        </Chip>
        <Chip {...props} outlined>
          枠線付き
        </Chip>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    outlined: false,
    radius: "full",
    size: "sm",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <Chip {...props} key={color} color={color}>
            チップ
          </Chip>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    color: "blue",
    outlined: false,
    size: "sm",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <Chip {...props} key={radius} radius={radius}>
            {radius}
          </Chip>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "blue",
    outlined: false,
    radius: "full",
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <Chip {...props} key={size} size={size}>
            {size}
          </Chip>
        ))}
      </div>
    );
  },
});
