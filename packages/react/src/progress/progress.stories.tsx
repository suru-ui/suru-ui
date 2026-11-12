import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Progress } from "./index.js";

const COLORS: readonly Progress.Color[] = theme.COLORS;
const RADII: readonly Progress.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Progress.Size[] = theme.SIZES;
const VARIANTS: readonly Progress.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "Progress",
  component: Progress,
});

export default meta;

const ctrl = controls(Progress, {
  max: {
    control: "number",
  },
  min: {
    control: "number",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  label: {
    control: "text",
  },
  value: {
    control: "number",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    label: "データを準備しています",
    value: null,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((current) => {
          if (current >= (props.max ?? 100)) {
            return 0;
          }

          return Math.min(100, Math.round(current + Math.random() * 25));
        });
      }, 2e3);

      return () => {
        clearInterval(interval);
      };
    }, [props.max]);

    return <Progress {...props} value={value} className="w-[300px]" />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    value: 24,
    radius: "full",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Progress {...props} key={variant} label={variant} variant={variant} />
        ))}
      </div>
    );
  },
});

export const Labelless = meta.story({
  name: "ラベルなし",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    value: 24,
    radius: "full",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Progress {...props} key={variant} variant={variant} />
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    value: 24,
    radius: "full",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-4">
        {COLORS.map((color) => (
          <Progress {...props} key={color} color={color} label={color} />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    value: 24,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <Progress {...props} key={radius} label={radius} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const WithoutOutline = meta.story({
  name: "枠線なし",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    value: 24,
    radius: "full",
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Progress {...props} label="naked" variant="naked" outlined={false} />
        <Progress {...props} label="liquid" variant="liquid" outlined={false} />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    max: 100,
    min: 0,
    color: "grey",
    value: 24,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        {SIZES.map((size) => (
          <Progress key={size} {...props} size={size} label={size} />
        ))}
      </div>
    );
  },
});

export const Indeterminate = meta.story({
  name: "不確定状態",
  ...ctrl({
    color: "grey",
    label: "データを準備しています",
    value: null,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Progress {...props} value={null} />
      </div>
    );
  },
});

export const Status = meta.story({
  name: "状態",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Progress {...props} label="進行中" value={24} />
        <Progress {...props} label="完了" value={100} />
        <Progress {...props} label="不確定" value={null} />
      </div>
    );
  },
});

export const Edge = meta.story({
  name: "境界値",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Progress {...props} label="開始直後" value={0} />
        <Progress {...props} label="完了直前" value={99} />
        <Progress {...props} label="完了" value={100} />
      </div>
    );
  },
});

export const Format = meta.story({
  name: "表示形式",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "blue",
    label: "アップロード中",
    value: 42,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[300px] flex-col gap-6">
        <Progress {...props} />
        <Progress
          {...props}
          label="残り時間つき"
          slotProps={{
            value: {
              children: (formatted) => `${formatted} 完了`,
            },
          }}
        />
      </div>
    );
  },
});

export const RealWorld = meta.story({
  name: "実利用例",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "green",
    label: "ファイルをアップロードしています",
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    const [value, setValue] = React.useState(0);
    const done = value >= 100;
    React.useEffect(() => {
      if (done) {
        return () => {};
      }

      const timer = setInterval(() => {
        setValue((current) => Math.min(100, current + 10));
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }, [done]);

    return (
      <div className="flex w-[300px] flex-col gap-2">
        <Progress {...props} label={done ? "アップロード完了" : props.label} value={value} />
        <button
          type="button"
          disabled={!done}
          className="w-fit text-sm underline"
          onClick={() => {
            setValue(0);
          }}
        >
          はじめからやり直す
        </button>
      </div>
    );
  },
});

export const Accessibility = meta.story({
  name: "アクセシビリティー",
  ...ctrl({
    max: 100,
    min: 0,
    size: "md",
    color: "grey",
    label: "プロフィールを保存しています",
    value: 60,
    radius: "full",
    variant: "liquid",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-[300px]">
        <Progress
          {...props}
          locale="ja-JP"
          getAriaValueText={(formatted) => `${formatted}完了`}
          aria-valuetext="60パーセント完了"
        />
      </div>
    );
  },
});
