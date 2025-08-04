import type { Story, StoryDefault } from "@ladle/react";
import { Trash2Icon } from "lucide-react";
import { COLOR_LIST, COLOR_VARIANT_LIST, SIZING_LIST } from "../theme";
import * as Button from ".";

export default {
  title: "Forms / Button",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <Button.Root>
      <Button.Text>ボタン</Button.Text>
    </Button.Root>
  );
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-2 space-y-2">
      {COLOR_LIST.map(color => (
        <Button.Root
          key={color}
          colorScheme={color}
        >
          <Button.Text>ボタン</Button.Text>
        </Button.Root>
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Sizing: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(sizing => (
        <Button.Root
          key={sizing}
          sizing={sizing}
        >
          <Button.Text>ボタン</Button.Text>
        </Button.Root>
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
            <Button.Root
              key={variant}
              variant={variant}
              colorScheme={color}
            >
              <Button.Text>ボタン</Button.Text>
            </Button.Root>
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
            <Button.Root
              key={variant}
              variant={variant}
              outlined
              colorScheme={color}
            >
              <Button.Text>ボタン</Button.Text>
            </Button.Root>
          ))}
        </div>
      ))}
    </div>
  );
};
Outlined.storyName = "枠線付き";

export const Adornment: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(size => (
        <Button.Root
          key={size}
          sizing={size}
          variant="liquid"
          colorScheme="red"
        >
          <Button.Adornment>
            <Trash2Icon size="1.2lh" />
          </Button.Adornment>
          <Button.Text>ボタン</Button.Text>
        </Button.Root>
      ))}
    </div>
  );
};
Adornment.storyName = "アイコンを付ける";

export const Link: Story = () => {
  return (
    <div className="space-x-2">
      <Button.Root asChild>
        <a href="https://example.com" target="_blank">
          <Button.Text>リンク</Button.Text>
        </a>
      </Button.Root>
      <Button.Root asChild disabled>
        <a href="https://example.com" target="_blank">
          <Button.Text>リンク</Button.Text>
        </a>
      </Button.Root>
    </div>
  );
};
Link.storyName = "リンク";

export const Loading: Story = () => {
  return (
    <div className="space-x-2">
      {COLOR_VARIANT_LIST.map(variant => (
        <Button.Root
          key={variant}
          loading
          variant={variant}
        >
          <Button.Text>ボタン</Button.Text>
          <Button.Loader />
        </Button.Root>
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
            <Button.Root
              key={variant}
              variant={variant}
              loading={loading}
              disabled
              outlined={outlined}
            >
              <Button.Text>ボタン</Button.Text>
              <Button.Loader />
            </Button.Root>
          ))}
        </div>
      ))}
    </div>
  );
};
Disabled.storyName = "非活性化";
