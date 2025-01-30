import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import DotsLoader from ".";

export default {
  title: "Feedback / DotsLoader",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <DotsLoader />;
};
Basic.storyName = "基本的な使い方";
