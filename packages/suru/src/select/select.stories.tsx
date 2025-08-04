import type { Story, StoryDefault } from "@ladle/react";
import { SIZING_LIST } from "../theme";
import * as Select from ".";

export default {
  title: "Forms / Select",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <Select.Root>
      <Select.Option>選択肢 1</Select.Option>
      <Select.Option>選択肢 2</Select.Option>
      <Select.Option>選択肢 3</Select.Option>
    </Select.Root>
  );
};
Basic.storyName = "基本的な使い方";

export const Sizing: Story = () => {
  return (
    <div className="space-y-2">
      {SIZING_LIST.map(sizing => (
        <Select.Root
          key={sizing}
          sizing={sizing}
        >
          <Select.Option>選択肢 1</Select.Option>
          <Select.Option>選択肢 2</Select.Option>
          <Select.Option>選択肢 3</Select.Option>
        </Select.Root>
      ))}
    </div>
  );
};
Sizing.storyName = "大きさの変更";

export const Invalid: Story = () => {
  return (
    <Select.Root aria-invalid>
      <Select.Option>選択肢 1</Select.Option>
      <Select.Option>選択肢 2</Select.Option>
      <Select.Option>選択肢 3</Select.Option>
    </Select.Root>
  );
};
Invalid.storyName = "エラー";

export const Disabled: Story = () => {
  return (
    <Select.Root disabled>
      <Select.Option>選択肢 1</Select.Option>
      <Select.Option>選択肢 2</Select.Option>
      <Select.Option>選択肢 3</Select.Option>
    </Select.Root>
  );
};
Disabled.storyName = "非活性";
