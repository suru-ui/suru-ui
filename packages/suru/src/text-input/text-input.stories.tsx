import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import { Search } from "lucide-react";
import { COLOR_LIST, SIZING_LIST } from "../theme";
import TextInput from ".";

export default {
  title: "Forms / TextInput",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <TextInput />;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-2 space-y-2">
      {COLOR_LIST.map(color => (
        <TextInput
          key={color}
          color={color}
        />
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Size: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(size => (
        <TextInput
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};
Size.storyName = "大きさの変更";

export const Invalid: Story = () => {
  return <TextInput aria-invalid />;
};
Invalid.storyName = "無効な入力値";

export const Section: Story = () => {
  return (
    <TextInput
      startSection={<Search />}
    />
  );
};
Section.storyName = "アイコン付き";

export const Disabled: Story = () => {
  return (
    <TextInput
      disabled
      defaultValue="テキスト"
    />
  );
};
Disabled.storyName = "非活性化";
