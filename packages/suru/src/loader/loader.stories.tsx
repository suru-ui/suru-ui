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
    <div className="space-y-[8px]">
      {([
        "circle",
        "dots",
      ] as const).map(variant => (
        <div key={variant}>
          <div>{variant}:</div>
          <div className="space-x-[8px]">
            {COLOR_LIST.map(color => (
              <Loader
                key={color}
                color={color}
                variant={variant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
Color.storyName = "色のカスタマイズ";

export const Variant: Story = () => {
  return (
    <div className="space-y-[8px]">
      {([
        "circle",
        "dots",
      ] as const).map(variant => (
        <div key={variant}>
          <span className="pr-[16px]">{variant}:</span>
          <Loader variant={variant} />
        </div>
      ))}
    </div>
  );
};
Variant.storyName = "スタイルの変更";

export const Size: Story = () => {
  return (
    <div className="space-y-[8px]">
      {([
        "circle",
        "dots",
      ] as const).map(variant => (
        <div key={variant}>
          <div>{variant}:</div>
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
                variant={variant}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
Size.storyName = "大きさの変更";
