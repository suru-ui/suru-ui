import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Avatar } from "../src/avatar/index.js";

const COLORS: readonly Avatar.Color[] = theme.COLORS;
const SIZES: readonly Avatar.Size[] = theme.SIZES;
const RADII: readonly Avatar.Radius[] = ["none", ...SIZES, "full", "circle"];

const meta = preview.meta({
  title: "Avatar",
  component: Avatar,
});

export default meta;

const ctrl = controls(Avatar, {
  alt: {
    control: "text",
  },
  children: {
    control: "text",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  src: {
    control: "text",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "名",
    color: "grey",
    size: "md",
    radius: "full",
  }),
});

export const Image = meta.story({
  name: "画像",
  ...ctrl({
    children: "名",
    color: "grey",
    size: "md",
    radius: "full",
    src: "https://i.pravatar.cc/128?img=11",
    alt: "プロフィール画像",
  }),
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    children: "名",
    size: "md",
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <Avatar {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    children: "名",
    color: "grey",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <Avatar {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "名",
    color: "grey",
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex items-center justify-center gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <Avatar {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});
