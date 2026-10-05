import * as theme from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Avatar } from "../avatar/index.js";
import { AvatarGroup } from "./index.js";

const COLORS: readonly AvatarGroup.Color[] = ["auto", ...theme.COLORS];
const SIZES: readonly AvatarGroup.Size[] = theme.SIZES;
const RADII: readonly AvatarGroup.Radius[] = ["none", ...SIZES, "full", "circle"];

const meta = preview.meta({
  title: "Avatar Group",
  component: AvatarGroup,
});

export default meta;

const ctrl = controls(AvatarGroup, {
  max: {
    control: "number",
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
  reverse: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    max: 4,
    size: "md",
    color: "auto",
    radius: "full",
    reverse: false,
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
    max: 4,
    size: "md",
    color: "auto",
    radius: "full",
    reverse: false,
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
    max: 1000,
    size: "md",
    radius: "full",
    reverse: false,
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
