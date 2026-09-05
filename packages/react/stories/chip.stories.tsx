import * as theme from "@suru-ui/theme";
import { XIcon, TagIcon, CheckIcon } from "lucide-react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Chip } from "../src/chip/index.js";

const COLORS: readonly Chip.Color[] = theme.COLORS;
const SIZES: readonly Chip.Size[] = theme.SIZES;
const RADII: readonly Chip.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Chip.Variant[] = theme.COLOR_TEMPLATES;

const meta = preview.meta({
  title: "Chip",
  component: Chip,
});

export default meta;

const ctrl = controls(Chip, {
  color: {
    control: "select",
    options: COLORS,
  },
  outlined: {
    control: "boolean",
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
            <Chip {...props} variant={variant} />
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
            <Chip {...props} color={color} />
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
        <Chip {...props}>
          <TagIcon />
          タグ
        </Chip>
        <Chip {...props} color="green">
          <CheckIcon />
          完了
        </Chip>
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
            <Chip {...props} radius={radius} />
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
            <Chip {...props} variant={variant} outlined />
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
            <Chip {...props} size={size}>
              <TagIcon />
              {props.children}
            </Chip>
          </div>
        ))}
      </div>
    );
  },
});

export const WithButton = meta.story({
  name: "ボタン付き",
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
            <Chip
              {...props}
              render={<button type="button" />}
              variant={variant}
              className="pr-0 py-0"
            >
              {props.children}
              <Button
                size={props.size}
                color={props.color}
                radius={props.radius}
                squared
                variant={variant}
              >
                <XIcon />
              </Button>
            </Chip>
          </div>
        ))}
      </div>
    );
  },
});
