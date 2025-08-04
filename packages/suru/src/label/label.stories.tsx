import type { Story, StoryDefault } from "@ladle/react";
import * as React from "react";
import * as TextInput from "../text-input";
import * as Label from ".";

export default {
  title: "Typography / Label",
} satisfies StoryDefault;

export const Basic: Story = () => {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-2">
      <Label.Root htmlFor={id}>
        ラベル<Label.Indicator />
      </Label.Root>
      <TextInput.Root>
        <TextInput.Input id={id} />
      </TextInput.Root>
    </div>
  );
};
Basic.storyName = "基本的な使い方";

export const Required: Story = () => {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label.Root htmlFor={id}>
          ラベル<Label.Indicator />
        </Label.Root>
        <TextInput.Root>
          <TextInput.Input id={id} required />
        </TextInput.Root>
      </div>
      <div>
        <Label.Root>
          ラベル<Label.Indicator />
          <TextInput.Root>
            <TextInput.Input required />
          </TextInput.Root>
        </Label.Root>
      </div>
    </div>
  );
};
Required.storyName = "必須";

export const Disabled: Story = () => {
  const id = React.useId();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label.Root htmlFor={id}>
          ラベル<Label.Indicator />
        </Label.Root>
        <TextInput.Root>
          <TextInput.Input id={id} required disabled />
        </TextInput.Root>
      </div>
      <div>
        <Label.Root>
          ラベル<Label.Indicator />
          <TextInput.Root>
            <TextInput.Input required disabled />
          </TextInput.Root>
        </Label.Root>
      </div>
    </div>
  );
};
Disabled.storyName = "非活性";
