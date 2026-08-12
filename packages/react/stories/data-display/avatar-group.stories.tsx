import { COLORS as BASE_COLORS, SIZES } from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { AvatarGroup } from "../../src/data-display/avatar-group/index.js";
import { Avatar } from "../../src/data-display/avatar/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const COLORS = ["colorful", ...BASE_COLORS] as const;

const meta = preview.meta({
  title: "Data Display / Avatar Group",
  component: AvatarGroup,
});

export default meta;

const ctrl = controls(AvatarGroup, {
  color: {
    options: COLORS,
    control: "select",
  },
  max: {
    control: "number",
  },
  radius: {
    options: RADII,
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
    color: "colorful",
    size: "md",
    radius: "full",
    max: 4,
  }),
  render(props) {
    return (
      <AvatarGroup {...props}>
        <Avatar src="https://i.pravatar.cc/128?img=11" alt="い">
          い
        </Avatar>
        <Avatar src="https://i.pravatar.cc/128?img=12" alt="ろ">
          ろ
        </Avatar>
        <Avatar src="https://i.pravatar.cc/128?img=13" alt="は">
          は
        </Avatar>
      </AvatarGroup>
    );
  },
});

export const Surplus = meta.story({
  name: "余剰分",
  ...ctrl({
    color: "colorful",
    size: "md",
    radius: "full",
    max: 4,
  }),
  render(props) {
    return (
      <AvatarGroup {...props}>
        <Avatar src="https://i.pravatar.cc/128?img=11" alt="い">
          い
        </Avatar>
        <Avatar src="https://i.pravatar.cc/128?img=12" alt="ろ">
          ろ
        </Avatar>
        <Avatar src="https://i.pravatar.cc/128?img=13" alt="は">
          は
        </Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
        <Avatar>へ</Avatar>
      </AvatarGroup>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: "full",
    max: 1000,
  }),
  render(props) {
    return (
      <AvatarGroup {...props}>
        <Avatar>い</Avatar>
        <Avatar>ろ</Avatar>
        <Avatar>は</Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
        <Avatar>へ</Avatar>
        <Avatar>と</Avatar>
        <Avatar>ち</Avatar>
        <Avatar>り</Avatar>
        <Avatar>ぬ</Avatar>
        <Avatar>る</Avatar>
        <Avatar>を</Avatar>
      </AvatarGroup>
    );
  },
});
