import * as theme from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Avatar } from "./index.js";

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
  src: {
    control: "text",
  },
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
  children: {
    control: "text",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "full",
    children: "名",
  }),
});

export const Image = meta.story({
  name: "画像",
  ...ctrl({
    alt: "プロフィール画像",
    src: "https://i.pravatar.cc/128?img=11",
    size: "md",
    color: "grey",
    radius: "full",
    children: "名",
  }),
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: "full",
    children: "名",
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
    size: "md",
    color: "grey",
    children: "名",
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
    color: "grey",
    radius: "full",
    children: "名",
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
