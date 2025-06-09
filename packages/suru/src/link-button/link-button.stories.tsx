import type { Story, StoryDefault } from "@ladle/react";
import { Trash2Icon } from "lucide-react";
import { COLOR_LIST, COLOR_VARIANT_LIST, SIZING_LIST } from "../theme";
import LinkButton from ".";

export default {
  title: "Forms / LinkButton",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <LinkButton>ボタン</LinkButton>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-2 space-y-2">
      {COLOR_LIST.map(color => (
        <LinkButton
          key={color}
          color={color}
        >
          ボタン
        </LinkButton>
      ))}
    </div>
  );
};
Color.storyName = "色の変更";

export const Size: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(size => (
        <LinkButton
          key={size}
          size={size}
        >
          ボタン
        </LinkButton>
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
            <LinkButton
              key={variant}
              color={color}
              variant={variant}
            >
              ボタン
            </LinkButton>
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
            <LinkButton
              key={variant}
              color={color}
              variant={variant}
              outlined
            >
              ボタン
            </LinkButton>
          ))}
        </div>
      ))}
    </div>
  );
};
Outlined.storyName = "枠線付き";

export const Section: Story = () => {
  return (
    <div className="space-x-2">
      {SIZING_LIST.map(size => (
        <LinkButton
          key={size}
          size={size}
          color="red"
          variant="liquid"
          startSection={<Trash2Icon size="1.2lh" />}
        >
          削除
        </LinkButton>
      ))}
    </div>
  );
};
Section.storyName = "アイコンを付ける";

export const Loading: Story = () => {
  return (
    <div className="space-x-2">
      {COLOR_VARIANT_LIST.map(variant => (
        <LinkButton
          key={variant}
          variant={variant}
          loading
        >
          ボタン
        </LinkButton>
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
            <LinkButton
              key={variant}
              variant={variant}
              loading={loading}
              disabled
              outlined={outlined}
            >
              ボタン
            </LinkButton>
          ))}
        </div>
      ))}
    </div>
  );
};
Disabled.storyName = "非活性化";
