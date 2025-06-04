import type { Story, StoryDefault } from "@ladle/react";
import { Trash2Icon } from "lucide-react";
import { COLOR_LIST, COLOR_VARIANT_LIST, SIZING_LIST } from "../theme";
import Button from ".";

export default {
  title: "Forms / IconButton",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <Button>
      <Trash2Icon />
    </Button>
  );
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-2 space-y-2">
      {COLOR_LIST.map(color => (
        <Button
          key={color}
          color={color}
        >
          <Trash2Icon />
        </Button>
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Size: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(size => (
        <Button
          key={size}
          size={size}
        >
          <Trash2Icon />
        </Button>
      ))}
    </div>
  );
};
Size.storyName = "大きさの変更";

export const Variant: Story = () => {
  return (
    <div className="space-y-2">
      {COLOR_LIST.map(color => (
        <div
          key={color}
          className="space-x-2"
        >
          {COLOR_VARIANT_LIST.map(variant => (
            <Button
              key={variant}
              color={color}
              variant={variant}
            >
              <Trash2Icon />
            </Button>
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
            <Button
              key={variant}
              color={color}
              variant={variant}
              outlined
            >
              <Trash2Icon />
            </Button>
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
        <Button
          key={variant}
          variant={variant}
          loading
        >
          <Trash2Icon />
        </Button>
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
            <Button
              key={variant}
              variant={variant}
              loading={loading}
              disabled
              outlined={outlined}
            >
              <Trash2Icon />
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};
Disabled.storyName = "非活性化";
