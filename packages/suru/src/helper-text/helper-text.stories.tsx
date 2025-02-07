import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import { COLOR_LIST } from "../theme";
import HelperText from ".";

export default {
  title: "Typography / HelperText",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <HelperText>テキスト</HelperText>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return COLOR_LIST.map(color => (
    <HelperText
      key={color}
      color={color}
    >
      テキスト
    </HelperText>
  ));
};
Color.storyName = "色のカスタマイズ";

export const Variant: Story = () => {
  return ([
    "dsp-64n-4",
    "dsp-57n-4",
    "dsp-48n-4",
    "std-45b-4",
    "std-36b-4",
    "std-32b-5",
    "std-28b-5",
    "std-24b-5",
    "std-22b-5",
    "std-20b-5",
    "std-18b-6",
    "std-17b-7",
    "std-16b-7",
    "std-32m-5",
    "std-28m-5",
    "std-24m-5",
    "std-20m-5",
    "std-17m-7",
    "std-16m-7",
    "std-45n-4",
    "std-36n-4",
    "std-32n-5",
    "std-28n-5",
    "std-26n-5",
    "std-24n-5",
    "std-22n-5",
    "std-20n-5",
    "std-18n-6",
    "std-17n-7",
    "std-16n-7",
    "dns-17b-3",
    "dns-17n-3",
    "dns-17b-2",
    "dns-17n-2",
    "dns-16b-3",
    "dns-16n-3",
    "dns-16b-2",
    "dns-16n-2",
    "dns-14b-3",
    "dns-14n-3",
    "dns-14b-2",
    "dns-14n-2",
    "oln-17b-1",
    "oln-17m-1",
    "oln-17n-1",
    "oln-16b-1",
    "oln-16m-1",
    "oln-16n-1",
    "oln-14b-1",
    "oln-14m-1",
    "oln-14n-1",
    "mono-17b-5",
    "mono-17n-5",
    "mono-16b-5",
    "mono-16n-5",
    "mono-14b-5",
    "mono-14n-5",
  ] as const).map(variant => (
    <HelperText
      key={variant}
      variant={variant}
    >
      {variant}
    </HelperText>
  ));
};
Variant.storyName = "スタイルの変更";

export const Inline: Story = () => {
  return (
    <>
      <HelperText inline>インラインテキスト 1</HelperText>
      <HelperText inline>インラインテキスト 2</HelperText>
      <HelperText inline>インラインテキスト 3</HelperText>
      <HelperText>ブロックテキスト 1</HelperText>
      <HelperText>ブロックテキスト 2</HelperText>
      <HelperText>ブロックテキスト 3</HelperText>
    </>
  );
};
Inline.storyName = "インライン化";

export const Empty: Story = () => {
  return (
    <>
      <p>子要素なし:</p>
      <HelperText className="border border-solid"></HelperText>
      <HelperText
        asChild
        className="border border-solid"
      >
        <ul></ul>
      </HelperText>

      <p>子要素あり:</p>
      <HelperText className="border border-solid">ヘルプ内容</HelperText>
      <HelperText
        asChild
        className="border border-solid"
      >
        <ul>
          <li>ヘルプ内容 - 1</li>
          <li>ヘルプ内容 - 2</li>
        </ul>
      </HelperText>
    </>
  );
};
Empty.storyName = "空";
