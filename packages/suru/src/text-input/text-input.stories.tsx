import type { Story, StoryDefault } from "@ladle/react";
import { COLOR_LIST, SIZING_LIST } from "../theme";
import * as TextInput from ".";

export default {
  title: "Forms / TextInput",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <TextInput.Root>
      <TextInput.Input />
    </TextInput.Root>
  );
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <TextInput.Root
          key={color}
          colorScheme={color}
        >
          <TextInput.Input />
        </TextInput.Root>
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Sizing: Story = () => {
  return (
    <div className="space-y-2">
      {SIZING_LIST.map(sizing => (
        <TextInput.Root
          key={sizing}
          sizing={sizing}
        >
          <TextInput.Input />
        </TextInput.Root>
      ))}
    </div>
  );
};
Sizing.storyName = "大きさの変更";

export const Invalid: Story = () => {
  return (
    <TextInput.Root>
      <TextInput.Input aria-invalid />
    </TextInput.Root>
  );
};
Invalid.storyName = "エラー";

export const Disabled: Story = () => {
  return (
    <TextInput.Root>
      <TextInput.Input disabled />
    </TextInput.Root>
  );
};
Disabled.storyName = "非活性";
