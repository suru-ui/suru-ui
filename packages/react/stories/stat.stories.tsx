import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { FormatNumber } from "../src/index.js";
import { Stat, StatValueUnit } from "../src/stat/index.js";

const SIZES: readonly Stat.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Stat",
  component: Stat,
});

export default meta;

const ctrl = controls(Stat, {
  description: {
    control: "text",
  },
  label: {
    control: "text",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  trend: {
    control: "text",
  },
  value: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    label: "総閲覧者数",
    value: 11297,
    trend: undefined,
    description: undefined,
  }),
});

export const WithTrend = meta.story({
  name: "トレンド付き",
  ...ctrl({
    size: "md",
    label: "閲覧者数",
    value: 1200,
    trend: "+200 (20 %)",
    description: "先月より",
  }),
  render(props) {
    return <Stat {...props} value={<FormatNumber value={props.value as number} />} />;
  },
});

export const WithUnit = meta.story({
  name: "単位付き",
  ...ctrl({
    size: "md",
    label: "所要時間",
    trend: undefined,
    description: undefined,
  }),
  render(props) {
    return (
      <Stat
        {...props}
        value={
          <>
            1<StatValueUnit>時間</StatValueUnit>23<StatValueUnit>分</StatValueUnit>
          </>
        }
      />
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    label: "総閲覧者数",
    value: 11297,
    trend: "22 %",
    description: "先月から増加しました",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Stat {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});
