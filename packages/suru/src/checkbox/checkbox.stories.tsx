import type { Story, StoryDefault } from "@ladle/react";
import { COLOR_LIST, SIZING_LIST } from "../theme";
import * as Checkbox from ".";

export default {
  title: "Forms / Checkbox",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Checkbox.Root />;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <Checkbox.Root
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
      {SIZING_LIST.map(size => (
        <Checkbox.Root
          key={size}
          sizing={size}
        />
      ))}
    </div>
  );
};
Sizing.storyName = "大きさの変更";

export const Indeterminate: Story = () => {
  return <Checkbox.Root indeterminate />;
};
Indeterminate.storyName = "不定";

export const Disabled: Story = () => {
  return (
    <div>
      <Checkbox.Root disabled />
      <Checkbox.Root disabled checked />
      <Checkbox.Root disabled indeterminate />
    </div>
  );
};
Disabled.storyName = "非活性";
