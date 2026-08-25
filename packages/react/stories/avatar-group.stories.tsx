import { SIZES, COLORS as BASE_COLORS } from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { AvatarGroup } from "../src/avatar-group/index.js";
import { Avatar } from "../src/avatar/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const COLORS = ["auto", ...BASE_COLORS] as const;

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
  reverse: {
    control: "boolean",
  },
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "auto",
    size: "md",
    radius: "full",
    reverse: false,
    max: 4,
  }),
  render(props) {
    return (
      <AvatarGroup {...props}>
        <Avatar alt="い" src="https://i.pravatar.cc/128?img=11">
          い
        </Avatar>
        <Avatar alt="ろ" src="https://i.pravatar.cc/128?img=12">
          ろ
        </Avatar>
        <Avatar alt="は" src="https://i.pravatar.cc/128?img=13">
          は
        </Avatar>
      </AvatarGroup>
    );
  },
});

export const Surplus = meta.story({
  name: "余剰分",
  ...ctrl({
    color: "auto",
    size: "md",
    radius: "full",
    reverse: false,
    max: 4,
  }),
  render(props) {
    return (
      <AvatarGroup {...props}>
        <Avatar alt="い" src="https://i.pravatar.cc/128?img=11">
          い
        </Avatar>
        <Avatar alt="ろ" src="https://i.pravatar.cc/128?img=12">
          ろ
        </Avatar>
        <Avatar alt="は" src="https://i.pravatar.cc/128?img=13">
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
    reverse: false,
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
