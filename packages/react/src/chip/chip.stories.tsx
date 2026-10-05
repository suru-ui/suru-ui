import * as theme from "@suru-ui/theme";
import { XIcon, TagIcon, CheckIcon } from "lucide-react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Chip } from "./index.js";

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
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  children: {
    control: "text",
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "sm",
    color: "blue",
    radius: "full",
    variant: "liquid",
    children: "新着",
    outlined: false,
  }),
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "sm",
    color: "blue",
    radius: "full",
    children: "新着",
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
    size: "sm",
    radius: "full",
    variant: "liquid",
    children: "新着",
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
    size: "sm",
    radius: "full",
    variant: "liquid",
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

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "sm",
    color: "blue",
    variant: "liquid",
    children: "新着",
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
    size: "sm",
    color: "blue",
    radius: "full",
    children: "新着",
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
    color: "blue",
    radius: "full",
    variant: "liquid",
    children: "タグ",
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
    size: "sm",
    color: "blue",
    radius: "full",
    children: "新着",
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
              // oxlint-disable-next-line jsx-a11y/control-has-associated-label -- `render` 先のボタンは子要素にテキストを含む
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
                aria-label="閉じる"
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
