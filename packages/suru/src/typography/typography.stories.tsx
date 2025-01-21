import "../../dist/suru.css";

import type { Story, StoryDefault } from "@ladle/react";
import { $, COLOR_LIST } from "../theme";
import Typography from ".";

export default {
  title: "Typography / Typography",
} satisfies StoryDefault;

export const Basic: Story = () => {
  return <Typography>テキスト</Typography>;
};
Basic.storyName = "基本的な使い方";

export const Color: Story = () => {
  return COLOR_LIST.map(color => (
    <Typography
      key={color}
      color={$.sui[color].naked.canvasText}
    >
      テキスト
    </Typography>
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
    <Typography
      key={variant}
      variant={variant}
    >
      {variant}
    </Typography>
  ));
};
Variant.storyName = "スタイルの変更";

export const Inline: Story = () => {
  return (
    <>
      <Typography inline>インラインテキスト 1</Typography>
      <Typography inline>インラインテキスト 2</Typography>
      <Typography inline>インラインテキスト 3</Typography>
      <Typography>ブロックテキスト 1</Typography>
      <Typography>ブロックテキスト 2</Typography>
      <Typography>ブロックテキスト 3</Typography>
    </>
  );
};
Inline.storyName = "インライン化";

export const Oneline: Story = () => {
  return (
    <Typography oneline>
      {"長いテキスト".repeat(50)}
    </Typography>
  );
};
Oneline.storyName = "1 行に切り詰める";

export const LineClamp: Story = () => {
  const style: React.CSSProperties = {
    border: `${$.sui.canvasText.main} solid 2px`,
    marginBottom: 16,
  };

  return (
    <>
      {"lineClamp={1}:"}
      <Typography
        style={style}
        lineClamp={1}
      >
        {"長いテキスト".repeat(50)}
      </Typography>
      {"lineClamp={3}:"}
      <Typography
        style={style}
        lineClamp={3}
      >
        {"長いテキスト".repeat(50)}
      </Typography>
      {"lineClamp={Infinity}:"}
      <Typography
        style={style}
        lineClamp={Infinity}
      >
        {"長いテキスト".repeat(50)}
      </Typography>
    </>
  );
};
LineClamp.storyName = "指定行数に切り詰める";
