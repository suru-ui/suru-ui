import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Avatar } from "../src/avatar/index.js";
import { Badge } from "../src/badge/index.js";

const COLORS: readonly Badge.Color[] = theme.COLORS;
const SIZES: readonly Badge.Size[] = theme.SIZES;
const RADII: readonly Badge.Radius[] = ["none", ...SIZES, "full"];
const OVERLAPS: readonly Badge.Overlap[] = ["rectangular", "circular"];
const VARIANTS: readonly Badge.Variant[] = ["standard", "dot"];

const meta = preview.meta({
  title: "Badge",
  component: Badge,
});

export default meta;

const ctrl = controls(Badge, {
  color: {
    control: "select",
    options: COLORS,
  },
  outlined: {
    control: "boolean",
  },
  overlap: {
    control: "select",
    options: OVERLAPS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  ring: {
    control: "boolean",
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
    children: "42",
    variant: "standard",
    color: "grey",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    children: "42",
    color: "grey",
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
    children: "42",
    variant: "standard",
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

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    children: "42",
    variant: "standard",
    color: "grey",
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
    children: "42",
    color: "grey",
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
    children: "42",
    variant: "standard",
    color: "grey",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <Badge {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Overlap = meta.story({
  name: "重ね合わせ",
  ...ctrl({
    variant: "dot",
    color: "red",
    size: "sm",
    radius: "full",
    outlined: false,
    position: "top-right",
    overlap: "rectangular",
    ring: true,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span>rectangular</span>
          <Avatar size="lg" color="blue" radius="none">
            四
            <Badge {...props} overlap="rectangular" />
          </Avatar>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>circular</span>
          <Avatar size="lg" color="blue" radius="full">
            円
            <Badge {...props} overlap="circular" />
          </Avatar>
        </div>
      </div>
    );
  },
});

export const Counts = meta.story({
  name: "数値",
  ...ctrl({
    variant: "standard",
    color: "grey",
    size: "sm",
    radius: "full",
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        <Badge {...props}>1</Badge>
        <Badge {...props}>42</Badge>
        <Badge {...props}>999+</Badge>
      </div>
    );
  },
});
