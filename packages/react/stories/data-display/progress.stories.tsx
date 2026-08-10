import { COLORS, SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Progress } from "../../src/data-display/progress/index.js";

const meta = preview.meta({
  title: "Data Display / Progress",
  component: Progress,
});

export default meta;

const ctrl = controls(Progress, {
  color: {
    options: COLORS,
    control: "select",
  },
  max: {
    control: "number",
  },
  min: {
    control: "number",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  value: {
    control: "number",
  },
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 24,
    variant: "liquid",
  }),
  render(props) {
    const [value, setValue] = React.useState(20);

    React.useEffect(() => {
      const interval = setInterval(() => {
        setValue((current) => Math.min(100, Math.round(current + Math.random() * 15)));
      }, 1e3);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-80">
        <Progress
          {...props}
          value={value}
          slotProps={{
            label: { children: "データを書き出しています" },
            value: {},
          }}
        />
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 50,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Progress {...props} variant="naked" />
        <Progress {...props} variant="liquid" />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    radius: "full",
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <Progress {...props} variant="naked" outlined />
        <Progress {...props} variant="liquid" outlined />
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        {COLORS.map((color) => (
          <div key={color}>
            <Progress {...props} color={color} />
            <div>{color}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size}>
            <Progress {...props} size={size} />
            <div>{size}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    size: "md",
    value: 50,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        {(["none", "rounded", "full"] as const).map((radius) => (
          <div key={radius}>
            <Progress {...props} radius={radius} />
            <div>{radius}</div>
          </div>
        ))}
      </div>
    );
  },
});

export const Indeterminate = meta.story({
  name: "不確定状態",
  ...ctrl({
    color: "blue",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: null,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Progress
          {...props}
          value={null}
          slotProps={{ label: { children: "データを準備しています" } }}
        />
      </div>
    );
  },
});

export const Complete = meta.story({
  name: "完了",
  ...ctrl({
    color: "green",
    max: 100,
    min: 0,
    outlined: false,
    radius: "full",
    size: "md",
    value: 100,
    variant: "liquid",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Progress
          {...props}
          slotProps={{
            label: { children: "書き出しが完了しました" },
            value: {},
          }}
        />
      </div>
    );
  },
});
