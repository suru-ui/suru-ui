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
  children: {
    control: "text",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  containRipple: {
    control: "boolean",
  },
  ping: {
    control: "boolean",
  },
  rippleSize: {
    control: "select",
    options: SIZES,
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "green",
    size: "md",
    rippleSize: "md",
    ping: false,
    containRipple: false,
    children: "オンライン",
  }),
});

export const Ping = meta.story({
  name: "処理中",
  ...ctrl({
    color: "green",
    size: "md",
    rippleSize: "md",
    containRipple: false,
    children: "オンライン",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <Status {...props} />
        <Status {...props} ping />
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    rippleSize: "md",
    ping: false,
    containRipple: false,
    children: "オンライン",
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
    color: "green",
    rippleSize: "md",
    ping: false,
    containRipple: false,
    children: "オンライン",
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

export const WithoutLabel = meta.story({
  name: "ラベルなし",
  ...ctrl({
    color: "green",
    size: "md",
    rippleSize: "md",
    containRipple: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <Status {...props} />
        <Status {...props} ping />
      </div>
    );
  },
});
