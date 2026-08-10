import { preview } from "../../.config/storybook/preview.js";
import { AvatarGroup } from "../../src/data-display/avatar-group/index.js";
import { Avatar } from "../../src/data-display/avatar/index.js";

const meta = preview.meta({
  title: "Data Display / Avatar Group",
  component: AvatarGroup,
});

export default meta;

export const Usage = meta.story({
  name: "使い方",
  render() {
    return (
      <AvatarGroup max={4}>
        <Avatar color="blue">太</Avatar>
        <Avatar color="green">花</Avatar>
        <Avatar color="orange">次</Avatar>
        <Avatar color="purple">桜</Avatar>
        <Avatar color="red">健</Avatar>
        <Avatar color="yellow">葵</Avatar>
      </AvatarGroup>
    );
  },
});

export const CustomSurplus = meta.story({
  name: "省略アバターのカスタマイズ",
  render() {
    return (
      <AvatarGroup max={3} renderSurplus={(surplus) => <Avatar color="red">+{surplus}</Avatar>}>
        <Avatar color="blue">太</Avatar>
        <Avatar color="green">花</Avatar>
        <Avatar color="orange">次</Avatar>
        <Avatar color="purple">桜</Avatar>
        <Avatar color="red">健</Avatar>
      </AvatarGroup>
    );
  },
});
