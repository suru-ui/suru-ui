import type { Story, StoryDefault } from "@ladle/react";
import Text from ".";

export default {
  title: "Forms / Text",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Text>テキスト</Text>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return (
    <div className="text-red-500">
      <Text>デフォルト色</Text>
      <Text className="text-inherit">TEXT-RED-500</Text>
      <Text className="text-main">TEXT-MAIN</Text>
      <Text className="text-disabled">TEXT-DISABLED</Text>
      <Text className="text-blue">BLUE</Text>
      <Text className="text-lightblue">LIGHTBLUE</Text>
      <Text className="text-cyan">CYAN</Text>
      <Text className="text-green">GREEN</Text>
      <Text className="text-lime">LIME</Text>
      <Text className="text-yellow">YELLOW</Text>
      <Text className="text-orange">ORANGE</Text>
      <Text className="text-red">RED</Text>
      <Text className="text-magenta">MAGENTA</Text>
      <Text className="text-purple">PURPLE</Text>
      <Text className="text-grey">GREY</Text>
      <Text className="text-info">INFO</Text>
      <Text className="text-warn">WARN</Text>
      <Text className="text-error">ERROR</Text>
      <Text className="text-success">SUCCESS</Text>
    </div>
  );
};
Color.storyName = "色の変更";

export const Variant: Story = () => {
  return (
    <>
      <Text variant="dsp-64n-4">dsp-64n-4</Text>
      <Text variant="dsp-57n-4">dsp-57n-4</Text>
      <Text variant="dsp-48n-4">dsp-48n-4</Text>
      <Text variant="std-45b-4">std-45b-4</Text>
      <Text variant="std-36b-4">std-36b-4</Text>
      <Text variant="std-32b-5">std-32b-5</Text>
      <Text variant="std-28b-5">std-28b-5</Text>
      <Text variant="std-24b-5">std-24b-5</Text>
      <Text variant="std-22b-5">std-22b-5</Text>
      <Text variant="std-20b-5">std-20b-5</Text>
      <Text variant="std-18b-6">std-18b-6</Text>
      <Text variant="std-17b-7">std-17b-7</Text>
      <Text variant="std-16b-7">std-16b-7</Text>
      <Text variant="std-32m-5">std-32m-5</Text>
      <Text variant="std-28m-5">std-28m-5</Text>
      <Text variant="std-24m-5">std-24m-5</Text>
      <Text variant="std-20m-5">std-20m-5</Text>
      <Text variant="std-17m-7">std-17m-7</Text>
      <Text variant="std-16m-7">std-16m-7</Text>
      <Text variant="std-45n-4">std-45n-4</Text>
      <Text variant="std-36n-4">std-36n-4</Text>
      <Text variant="std-32n-5">std-32n-5</Text>
      <Text variant="std-28n-5">std-28n-5</Text>
      <Text variant="std-26n-5">std-26n-5</Text>
      <Text variant="std-24n-5">std-24n-5</Text>
      <Text variant="std-22n-5">std-22n-5</Text>
      <Text variant="std-20n-5">std-20n-5</Text>
      <Text variant="std-18n-6">std-18n-6</Text>
      <Text variant="std-17n-7">std-17n-7</Text>
      <Text variant="std-16n-7">std-16n-7</Text>
      <Text variant="dns-17b-3">dns-17b-3</Text>
      <Text variant="dns-17n-3">dns-17n-3</Text>
      <Text variant="dns-17b-2">dns-17b-2</Text>
      <Text variant="dns-17n-2">dns-17n-2</Text>
      <Text variant="dns-16b-3">dns-16b-3</Text>
      <Text variant="dns-16n-3">dns-16n-3</Text>
      <Text variant="dns-16b-2">dns-16b-2</Text>
      <Text variant="dns-16n-2">dns-16n-2</Text>
      <Text variant="dns-14b-3">dns-14b-3</Text>
      <Text variant="dns-14n-3">dns-14n-3</Text>
      <Text variant="dns-14b-2">dns-14b-2</Text>
      <Text variant="dns-14n-2">dns-14n-2</Text>
      <Text variant="oln-17b-1">oln-17b-1</Text>
      <Text variant="oln-17m-1">oln-17m-1</Text>
      <Text variant="oln-17n-1">oln-17n-1</Text>
      <Text variant="oln-16b-1">oln-16b-1</Text>
      <Text variant="oln-16m-1">oln-16m-1</Text>
      <Text variant="oln-16n-1">oln-16n-1</Text>
      <Text variant="oln-14b-1">oln-14b-1</Text>
      <Text variant="oln-14m-1">oln-14m-1</Text>
      <Text variant="oln-14n-1">oln-14n-1</Text>
      <Text variant="mono-17b-5">mono-17b-5</Text>
      <Text variant="mono-17n-5">mono-17n-5</Text>
      <Text variant="mono-16b-5">mono-16b-5</Text>
      <Text variant="mono-16n-5">mono-16n-5</Text>
      <Text variant="mono-14b-5">mono-14b-5</Text>
      <Text variant="mono-14n-5">mono-14n-5</Text>
    </>
  );
};
Variant.storyName = "スタイルの変更";

export const OneLine: Story = () => {
  return (
    <Text className="w-[350px] border border-solid" oneline>
      {"長いテキスト".repeat(20)}
    </Text>
  );
};
OneLine.storyName = "1 行表示";

export const LineClamp: Story = () => {
  return (
    <Text className="w-[350px] border border-solid" lineClamp={3}>
      {"長いテキスト".repeat(20)}
    </Text>
  );
};
LineClamp.storyName = "複数行表示";
