import type { Story, StoryDefault } from "@ladle/react";
import * as React from "react";
import Details from ".";

export default {
  title: "Forms / Details",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Details summary="概要">詳細</Details>;
};
Basic.storyName = "基本的な使い方";

export const Controled: Story = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Details
      summary="概要"
      open={open}
      onOpenChange={setOpen}
    >
      詳細
    </Details>
  );
};
Controled.storyName = "制御";
