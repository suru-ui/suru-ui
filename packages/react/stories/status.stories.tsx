import * as theme from "@suru-ui/theme";

import { preview, controls } from "../.config/storybook/preview.js";
import { Status } from "../src/status/index.js";

const COLORS: readonly Status.Color[] = theme.COLORS;
const SIZES: readonly Status.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Status",
  component: Status,
});

export default meta;

const ctrl = controls(Status, {
  color: {
    control: "select",
    options: COLORS,
  },
  processing: {
    control: "boolean",
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "オンライン",
    color: "green",
    processing: false,
    size: "md",
  }),
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    children: "オンライン",
    color: "green",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <Status {...props}>オンライン</Status>
        <Status {...props} processing>
          処理中
        </Status>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    children: "オンライン",
    size: "md",
    processing: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <Status {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "オンライン",
    color: "green",
    processing: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <Status {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Processing = meta.story({
  name: "処理中",
  ...ctrl({
    children: "配信中",
    color: "red",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <Status {...props} />
        <Status {...props} processing />
      </div>
    );
  },
});

export const WithoutLabel = meta.story({
  name: "ラベルなし",
  ...ctrl({
    color: "green",
    size: "md",
    processing: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Status {...props} />
        <Status {...props} processing />
      </div>
    );
  },
});
