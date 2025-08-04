import type { Story, StoryDefault } from "@ladle/react";
import * as Text from ".";

export default {
  title: "Typography / Text",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Text.Root>テキスト</Text.Root>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="text-red-500">
      <Text.Root>デフォルト色</Text.Root>
      <Text.Root className="text-inherit">TEXT-RED-500</Text.Root>
      <Text.Root className="text-main">TEXT-MAIN</Text.Root>
      <Text.Root className="text-disabled">TEXT-DISABLED</Text.Root>
      <Text.Root className="text-blue">BLUE</Text.Root>
      <Text.Root className="text-lightblue">LIGHTBLUE</Text.Root>
      <Text.Root className="text-cyan">CYAN</Text.Root>
      <Text.Root className="text-green">GREEN</Text.Root>
      <Text.Root className="text-lime">LIME</Text.Root>
      <Text.Root className="text-yellow">YELLOW</Text.Root>
      <Text.Root className="text-orange">ORANGE</Text.Root>
      <Text.Root className="text-red">RED</Text.Root>
      <Text.Root className="text-magenta">MAGENTA</Text.Root>
      <Text.Root className="text-purple">PURPLE</Text.Root>
      <Text.Root className="text-grey">GREY</Text.Root>
      <Text.Root className="text-info">INFO</Text.Root>
      <Text.Root className="text-warn">WARN</Text.Root>
      <Text.Root className="text-error">ERROR</Text.Root>
      <Text.Root className="text-success">SUCCESS</Text.Root>
    </div>
  );
};
Color.storyName = "色の変更";

export const Variant: Story = () => {
  return (
    <>
      <Text.Root variant="dsp-64n-4">dsp-64n-4</Text.Root>
      <Text.Root variant="dsp-57n-4">dsp-57n-4</Text.Root>
      <Text.Root variant="dsp-48n-4">dsp-48n-4</Text.Root>
      <Text.Root variant="std-45b-4">std-45b-4</Text.Root>
      <Text.Root variant="std-36b-4">std-36b-4</Text.Root>
      <Text.Root variant="std-32b-5">std-32b-5</Text.Root>
      <Text.Root variant="std-28b-5">std-28b-5</Text.Root>
      <Text.Root variant="std-24b-5">std-24b-5</Text.Root>
      <Text.Root variant="std-22b-5">std-22b-5</Text.Root>
      <Text.Root variant="std-20b-5">std-20b-5</Text.Root>
      <Text.Root variant="std-18b-6">std-18b-6</Text.Root>
      <Text.Root variant="std-17b-7">std-17b-7</Text.Root>
      <Text.Root variant="std-16b-7">std-16b-7</Text.Root>
      <Text.Root variant="std-32m-5">std-32m-5</Text.Root>
      <Text.Root variant="std-28m-5">std-28m-5</Text.Root>
      <Text.Root variant="std-24m-5">std-24m-5</Text.Root>
      <Text.Root variant="std-20m-5">std-20m-5</Text.Root>
      <Text.Root variant="std-17m-7">std-17m-7</Text.Root>
      <Text.Root variant="std-16m-7">std-16m-7</Text.Root>
      <Text.Root variant="std-45n-4">std-45n-4</Text.Root>
      <Text.Root variant="std-36n-4">std-36n-4</Text.Root>
      <Text.Root variant="std-32n-5">std-32n-5</Text.Root>
      <Text.Root variant="std-28n-5">std-28n-5</Text.Root>
      <Text.Root variant="std-26n-5">std-26n-5</Text.Root>
      <Text.Root variant="std-24n-5">std-24n-5</Text.Root>
      <Text.Root variant="std-22n-5">std-22n-5</Text.Root>
      <Text.Root variant="std-20n-5">std-20n-5</Text.Root>
      <Text.Root variant="std-18n-6">std-18n-6</Text.Root>
      <Text.Root variant="std-17n-7">std-17n-7</Text.Root>
      <Text.Root variant="std-16n-7">std-16n-7</Text.Root>
      <Text.Root variant="dns-17b-3">dns-17b-3</Text.Root>
      <Text.Root variant="dns-17n-3">dns-17n-3</Text.Root>
      <Text.Root variant="dns-17b-2">dns-17b-2</Text.Root>
      <Text.Root variant="dns-17n-2">dns-17n-2</Text.Root>
      <Text.Root variant="dns-16b-3">dns-16b-3</Text.Root>
      <Text.Root variant="dns-16n-3">dns-16n-3</Text.Root>
      <Text.Root variant="dns-16b-2">dns-16b-2</Text.Root>
      <Text.Root variant="dns-16n-2">dns-16n-2</Text.Root>
      <Text.Root variant="dns-14b-3">dns-14b-3</Text.Root>
      <Text.Root variant="dns-14n-3">dns-14n-3</Text.Root>
      <Text.Root variant="dns-14b-2">dns-14b-2</Text.Root>
      <Text.Root variant="dns-14n-2">dns-14n-2</Text.Root>
      <Text.Root variant="oln-17b-1">oln-17b-1</Text.Root>
      <Text.Root variant="oln-17m-1">oln-17m-1</Text.Root>
      <Text.Root variant="oln-17n-1">oln-17n-1</Text.Root>
      <Text.Root variant="oln-16b-1">oln-16b-1</Text.Root>
      <Text.Root variant="oln-16m-1">oln-16m-1</Text.Root>
      <Text.Root variant="oln-16n-1">oln-16n-1</Text.Root>
      <Text.Root variant="oln-14b-1">oln-14b-1</Text.Root>
      <Text.Root variant="oln-14m-1">oln-14m-1</Text.Root>
      <Text.Root variant="oln-14n-1">oln-14n-1</Text.Root>
      <Text.Root variant="mono-17b-5">mono-17b-5</Text.Root>
      <Text.Root variant="mono-17n-5">mono-17n-5</Text.Root>
      <Text.Root variant="mono-16b-5">mono-16b-5</Text.Root>
      <Text.Root variant="mono-16n-5">mono-16n-5</Text.Root>
      <Text.Root variant="mono-14b-5">mono-14b-5</Text.Root>
      <Text.Root variant="mono-14n-5">mono-14n-5</Text.Root>
    </>
  );
};
Variant.storyName = "スタイルの変更";

export const OneLine: Story = () => {
  return (
    <Text.Root className="w-[350px] border border-solid" oneline>
      {"長いテキスト".repeat(20)}
    </Text.Root>
  );
};
OneLine.storyName = "1 行表示";

export const LineClamp: Story = () => {
  return (
    <Text.Root className="w-[350px] border border-solid" lineClamp={3}>
      {"長いテキスト".repeat(20)}
    </Text.Root>
  );
};
LineClamp.storyName = "複数行表示";
