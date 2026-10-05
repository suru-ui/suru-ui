import * as theme from "@suru-ui/theme";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Status } from "./index.js";

const COLORS: readonly Status.Color[] = theme.COLORS;
const SIZES: readonly Status.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Status",
  component: Status,
});

export default meta;

const ctrl = controls(Status, {
  ping: {
    control: "boolean",
  },
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  children: {
    control: "text",
  },
  rippleSize: {
    control: "select",
    options: SIZES,
  },
  containRipple: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    ping: false,
    size: "md",
    color: "green",
    children: "オンライン",
    rippleSize: "md",
    containRipple: false,
  }),
});

export const Ping = meta.story({
  name: "処理中",
  ...ctrl({
    size: "md",
    color: "green",
    children: "オンライン",
    rippleSize: "md",
    containRipple: false,
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
    ping: false,
    size: "md",
    children: "オンライン",
    rippleSize: "md",
    containRipple: false,
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
    ping: false,
    color: "green",
    children: "オンライン",
    rippleSize: "md",
    containRipple: false,
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
    size: "md",
    color: "green",
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
