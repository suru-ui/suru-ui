import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import { $, COLOR_LIST } from "../theme";
import Loader from ".";

export default {
  title: "Feedback / Loader",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Loader />;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="space-x-[8px]">
      {COLOR_LIST.map(color => (
        <Loader
          key={color}
          color={$.sui[color].naked.canvasText}
        />
      ))}
    </div>
  );
};
Color.storyName = "色のカスタマイズ";

export const Variant: Story = () => {
  return (
    <div className="space-x-[8px]">
      {([
        "circle",
        "dots",
      ] as const).map(variant => (
        <Loader
          key={variant}
          variant={variant}
        />
      ))}
    </div>
  );
};
Variant.storyName = "スタイルの変更";

export const Size: Story = () => {
  return (
    <div className="space-x-[8px] relative">
      {([
        "5em",
        48,
        "48px",
        `${$.sui.sizing.lg}`,
        "5%",
      ] as const).map(size => (
        <Loader
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};
Size.storyName = "大きさの変更";
