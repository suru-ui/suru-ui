import type { Story, StoryDefault } from "@ladle/react";
import { COLOR_LIST, SIZING_LIST } from "../theme";
import * as Textarea from ".";

export default {
  title: "Forms / Textarea",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Textarea.Root />;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <Textarea.Root
          key={color}
          colorScheme={color}
        />
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Sizing: Story = () => {
  return (
    <div className="space-y-2">
      {SIZING_LIST.map(sizing => (
        <Textarea.Root
          key={sizing}
          sizing={sizing}
        />
      ))}
    </div>
  );
};
Sizing.storyName = "大きさの変更";

export const Invalid: Story = () => {
  return <Textarea.Root aria-invalid />;
};
Invalid.storyName = "エラー";

export const Disabled: Story = () => {
  return <Textarea.Root disabled />;
};
Disabled.storyName = "非活性";
