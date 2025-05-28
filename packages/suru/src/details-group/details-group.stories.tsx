import type { Story, StoryDefault } from "@ladle/react";
import Details from "../details";
import DetailsGroup from ".";

export default {
  title: "Forms / Details Group",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return (
    <DetailsGroup>
      <Details summary="概要 1">詳細 1</Details>
      <Details summary="概要 2">詳細 2</Details>
      <Details summary="概要 3">詳細 3</Details>
    </DetailsGroup>
  );
};
Basic.storyName = "基本的な使い方";
