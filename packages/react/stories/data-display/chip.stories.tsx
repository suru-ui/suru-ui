import { COLOR_TEMPLATES as VARIANTS, COLORS, SIZES } from "@suru-ui/theme";
import { CheckIcon, TagIcon, XIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Chip } from "../../src/data-display/chip/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

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
  name: "バリエーション",
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
            <span className="text-sm">{variant}</span>
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
            <span className="text-sm">{color}</span>
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
            <span className="text-sm">{radius}</span>
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
            <span className="text-sm">{variant}</span>
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
            <span className="text-sm">{size}</span>
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
            <span className="text-sm">{variant}</span>
            <Chip {...props} render={<button type="button" />} variant={variant} className="pr-0">
              {props.children}
              <Button
                size={props.size}
                color={props.color}
                radius={props.radius}
                variant={variant}
                squared
                className="[--sui_button-background_color-normal:transparent]"
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
