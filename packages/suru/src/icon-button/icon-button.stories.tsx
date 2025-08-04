import type { Story, StoryDefault } from "@ladle/react";
import { Trash2Icon } from "lucide-react";
import { COLOR_LIST, COLOR_VARIANT_LIST, SIZING_LIST } from "../theme";
import * as IconButton from ".";

export default {
  title: "Forms / IconButton",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <IconButton.Root>
      <Trash2Icon />
    </IconButton.Root>
  );
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-2 space-y-2">
      {COLOR_LIST.map(color => (
        <IconButton.Root
          key={color}
          colorScheme={color}
        >
          <Trash2Icon />
        </IconButton.Root>
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Sizing: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(sizing => (
        <IconButton.Root
          key={sizing}
          sizing={sizing}
        >
          <Trash2Icon />
        </IconButton.Root>
      ))}
    </div>
  );
};
Sizing.storyName = "大きさの変更";

export const Variant: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <div
          key={color}
          className="space-x-2"
        >
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton.Root
              key={variant}
              variant={variant}
              colorScheme={color}
            >
              <Trash2Icon />
            </IconButton.Root>
          ))}
        </div>
      ))}
    </div>
  );
};
Variant.storyName = "スタイルの変更";

export const Outlined: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <div
          key={color}
          className="space-x-2"
        >
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton.Root
              key={variant}
              variant={variant}
              outlined
              colorScheme={color}
            >
              <Trash2Icon />
            </IconButton.Root>
          ))}
        </div>
      ))}
    </div>
  );
};
Outlined.storyName = "枠線付き";

export const Loading: Story = () => {
  return (
    <div className="space-x-2">
      {COLOR_VARIANT_LIST.map(variant => (
        <IconButton.Root
          key={variant}
          loading
          variant={variant}
        >
          <Trash2Icon />
          <IconButton.Loader />
        </IconButton.Root>
      ))}
    </div>
  );
};
Loading.storyName = "読み込み中";

export const Disabled: Story = () => {
  return (
    <div className="space-y-2">
      {[
        { loading: false, outlined: false },
        { loading: true, outlined: false },
        { loading: false, outlined: true },
        { loading: true, outlined: true },
      ].map(({ loading, outlined }, i) => (
        <div
          key={i}
          className="space-x-2"
        >
          {COLOR_VARIANT_LIST.map(variant => (
            <IconButton.Root
              key={variant}
              variant={variant}
              loading={loading}
              disabled
              outlined={outlined}
            >
              <Trash2Icon />
              <IconButton.Loader />
            </IconButton.Root>
          ))}
        </div>
      ))}
    </div>
  );
};
Disabled.storyName = "非活性化";
