import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Stat } from "../src/stat/index.js";

const SIZES: readonly Stat.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Stat",
  component: Stat,
});

export default meta;

const ctrl = controls(Stat, {
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return <Stat {...props} label="総ページビュー" value="89,400" />;
  },
});

export const WithDescription = meta.story({
  name: "説明文付き",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <Stat {...props} label="総ページビュー" value="89,400" description="先月と比較した累計です" />
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
        <Stat
          {...props}
          label="新規ユーザー"
          value="4,200"
          change="400 (22%)"
          slotProps={{ change: { direction: "up" } }}
          description="先月から増加しました"
        />
        <Stat
          {...props}
          label="新規登録"
          value="1,200"
          change="90 (14%)"
          slotProps={{ change: { direction: "down" } }}
          description="先月から減少しました"
        />
        <Stat
          {...props}
          label="継続率"
          value="98.2%"
          change="0 (0%)"
          slotProps={{ change: { direction: "flat" } }}
          description="先月から変化ありません"
        />
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
            <Stat
              {...props}
              size={size}
              label="総ページビュー"
              value="89,400"
              description="先月より21%増加しました"
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Dashboard = meta.story({
  name: "指標の一覧",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <div className="grid grid-cols-2 gap-6">
        <Stat
          {...props}
          label="総ページビュー"
          value="89,400"
          change="12 (8%)"
          slotProps={{ change: { direction: "up" } }}
          description="先月から増加しました"
        />
        <Stat
          {...props}
          label="直帰率"
          value="32.1%"
          change="1.4 (4%)"
          slotProps={{ change: { direction: "down" } }}
          description="先月から改善しました"
        />
        <Stat {...props} label="平均滞在時間" value="2:48" description="先月と変わりありません" />
        <Stat
          {...props}
          label="新規ユーザー"
          value="4,200"
          change="0 (0%)"
          slotProps={{ change: { direction: "flat" } }}
          description="先月から変化ありません"
        />
      </div>
    );
  },
});
