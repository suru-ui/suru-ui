import { COLORS, SIZES } from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Avatar } from "../../src/data-display/avatar/index.js";

const meta = preview.meta({
  title: "Data Display / Avatar",
  component: Avatar,
});

export default meta;

const ctrl = controls(Avatar, {
  color: {
    options: COLORS,
    control: "select",
  },
  radius: {
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "grey",
    radius: "full",
    size: "md",
  }),
  render(props) {
    return <Avatar {...props}>太</Avatar>;
  },
});

export const Image = meta.story({
  name: "画像",
  ...ctrl({
    color: "grey",
    radius: "full",
    size: "lg",
  }),
  render(props) {
    return (
      <Avatar {...props} src="https://i.pravatar.cc/128?img=11" alt="プロフィール画像">
        太
      </Avatar>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    radius: "full",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-1">
            <Avatar {...props} color={color}>
              太
            </Avatar>
            <span>{color}</span>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    color: "grey",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex gap-3">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-1">
            <Avatar {...props} radius={radius}>
              太
            </Avatar>
            <span>{radius}</span>
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
  }),
  render(props) {
    return (
      <div className="flex items-end gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-1">
            <Avatar {...props} size={size}>
              太
            </Avatar>
            <span>{size}</span>
          </div>
        ))}
      </div>
    );
  },
});
