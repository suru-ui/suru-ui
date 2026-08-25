import { SIZES } from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Stat } from "../src/stat/index.js";

const meta = preview.meta({
  title: "Data Display / Stat",
  component: Stat,
});

export default meta;

const ctrl = controls(Stat, {
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <Stat {...props}>
        <Stat.Label>総ページビュー</Stat.Label>
        <Stat.Value>89,400</Stat.Value>
      </Stat>
    );
  },
});

export const WithDescription = meta.story({
  name: "説明文付き",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <Stat {...props}>
        <Stat.Label>総ページビュー</Stat.Label>
        <Stat.Value>89,400</Stat.Value>
        <Stat.Description>先月と比較した累計です</Stat.Description>
      </Stat>
    );
  },
});

export const WithChange = meta.story({
  name: "変化の方向",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <Stat {...props}>
          <Stat.Label>新規ユーザー</Stat.Label>
          <Stat.Value>
            4,200
            <Stat.Change direction="up">400 (22%)</Stat.Change>
          </Stat.Value>
          <Stat.Description>先月から増加しました</Stat.Description>
        </Stat>
        <Stat {...props}>
          <Stat.Label>新規登録</Stat.Label>
          <Stat.Value>
            1,200
            <Stat.Change direction="down">90 (14%)</Stat.Change>
          </Stat.Value>
          <Stat.Description>先月から減少しました</Stat.Description>
        </Stat>
        <Stat {...props}>
          <Stat.Label>継続率</Stat.Label>
          <Stat.Value>
            98.2%
            <Stat.Change direction="flat">0 (0%)</Stat.Change>
          </Stat.Value>
          <Stat.Description>先月から変化ありません</Stat.Description>
        </Stat>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({}),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Stat {...props} size={size}>
              <Stat.Label>総ページビュー</Stat.Label>
              <Stat.Value>89,400</Stat.Value>
              <Stat.Description>21% more than last month</Stat.Description>
            </Stat>
          </div>
        ))}
      </div>
    );
  },
});
