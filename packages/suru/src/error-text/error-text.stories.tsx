import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import { COLOR_LIST } from "../theme";
import ErrorText from ".";

export default {
  title: "Typography / ErrorText",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <ErrorText>テキスト</ErrorText>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return COLOR_LIST.map(color => (
    <ErrorText
      key={color}
      color={color}
    >
      テキスト
    </ErrorText>
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
    <ErrorText
      key={variant}
      variant={variant}
    >
      {variant}
    </ErrorText>
  ));
};
Variant.storyName = "スタイルの変更";

export const Inline: Story = () => {
  return (
    <>
      <ErrorText inline>インラインテキスト 1</ErrorText>
      <ErrorText inline>インラインテキスト 2</ErrorText>
      <ErrorText inline>インラインテキスト 3</ErrorText>
      <ErrorText>ブロックテキスト 1</ErrorText>
      <ErrorText>ブロックテキスト 2</ErrorText>
      <ErrorText>ブロックテキスト 3</ErrorText>
    </>
  );
};
Inline.storyName = "インライン化";

export const Empty: Story = () => {
  return (
    <>
      <p>子要素なし:</p>
      <ErrorText className="border border-solid"></ErrorText>
      <ErrorText
        asChild
        className="border border-solid"
      >
        <ul></ul>
      </ErrorText>

      <p>子要素あり:</p>
      <ErrorText className="border border-solid">エラー内容</ErrorText>
      <ErrorText
        asChild
        className="border border-solid"
      >
        <ul>
          <li>エラー内容 - 1</li>
          <li>エラー内容 - 2</li>
        </ul>
      </ErrorText>
    </>
  );
};
Empty.storyName = "空";
