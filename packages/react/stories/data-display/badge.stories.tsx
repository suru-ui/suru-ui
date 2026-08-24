import { SIZES, COLORS, COLOR_TEMPLATES } from "@suru-ui/theme";
import { TagIcon, CheckIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Badge } from "../../src/data-display/badge/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = COLOR_TEMPLATES;

const meta = preview.meta({
  title: "Data Display / Badge",
  component: Badge,
});

export default meta;

const ctrl = controls(Badge, {
  color: {
    options: COLORS,
    control: "select",
  },
  outlined: {
    control: "boolean",
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

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "新着",
    variant: "liquid",
    color: "blue",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    children: "新着",
    color: "blue",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Badge {...props} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    children: "新着",
    variant: "liquid",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <Badge {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const WithIcons = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Badge {...props}>
          <TagIcon />
          タグ
        </Badge>
        <Badge {...props} color="green">
          <CheckIcon />
          完了
        </Badge>
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    children: "新着",
    variant: "liquid",
    color: "blue",
    size: "sm",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <Badge {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    children: "新着",
    color: "blue",
    size: "sm",
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <span>{variant}</span>
            <Badge {...props} variant={variant} outlined />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "タグ",
    variant: "liquid",
    color: "blue",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <Badge {...props} size={size}>
              <TagIcon />
              {props.children}
            </Badge>
          </div>
        ))}
      </div>
    );
  },
});

export const Counts = meta.story({
  name: "数値",
  ...ctrl({
    variant: "solid",
    color: "red",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Badge {...props}>1</Badge>
        <Badge {...props}>24</Badge>
        <Badge {...props}>999+</Badge>
      </div>
    );
  },
});
