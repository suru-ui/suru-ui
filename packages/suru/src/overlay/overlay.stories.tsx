import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import Overlay from ".";

export default {
  title: "Feedback / Overlay",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <div className="w-[100px] h-[100px] relative text-[var(--sui-canvasText-main)]">
      <button type="button">ボタン</button>
      <Overlay />
    </div>
  );
};
Basic.storyName = "基本的な使い方";
