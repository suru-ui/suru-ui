import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Input } from "../src/input/index.js";
import { Label } from "../src/label/index.js";

const meta = preview.meta({
  title: "Label",
  component: Label,
});

export default meta;

const ctrl = controls(Label, {
  children: {
    control: "text",
  },
  htmlFor: {
    control: "text",
  },
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    children: "メールアドレス",
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <Label {...props} htmlFor="label-usage-input" />
        <Input id="label-usage-input" placeholder="suru@example.com" />
      </div>
    );
  },
});

export const NestingControl = meta.story({
  name: "コントロールを子に置く",
  ...ctrl({
    children: "名前",
    htmlFor: undefined,
    size: "md",
  }),
  render(props) {
    return (
      <Label {...props}>
        <Input placeholder="山田太郎" />
      </Label>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    children: "ラベル",
    htmlFor: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Label {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});
