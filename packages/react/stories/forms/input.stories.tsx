import { Field } from "@base-ui/react/field";
import { SIZES } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Input } from "../../src/forms/input/index.js";

const meta = preview.meta({
  title: "Forms / Input",
  component: Input,
});

export default meta;

const ctrl = controls(Input, {
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  placeholder: {
    control: "text",
  },
  radius: {
    options: ["none", "rounded", "full"],
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  variant: {
    options: ["naked", "liquid"],
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <label className="flex flex-col items-start gap-2">
        名前
        <Input {...props} className="w-64" />
      </label>
    );
  },
});

export const Variants = meta.story({
  name: "バリエーション",
  ...ctrl({
    size: "md",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Input {...props} variant="naked" className="w-64" />
        <Input {...props} variant="liquid" className="w-64" />
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    radius: "rounded",
    disabled: false,
    outlined: true,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Input {...props} variant="naked" className="w-64" />
        <Input {...props} variant="liquid" className="w-64" />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "naked",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <Input key={size} {...props} size={size} className="w-64" />
        ))}
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "naked",
    size: "md",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Input {...props} radius="none" className="w-64" />
        <Input {...props} radius="rounded" className="w-64" />
        <Input {...props} radius="full" className="w-64" />
      </div>
    );
  },
});

export const Filled = meta.story({
  name: "入力済み",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return <Input {...props} defaultValue="田仲 太郎" className="w-64" />;
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    const [value, setValue] = React.useState("");

    return (
      <div className="flex w-64 flex-col items-start gap-2">
        <Input {...props} value={value} onValueChange={setValue} className="w-64" />
        <p className="text-sm opacity-80">入力中: {value}</p>
      </div>
    );
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    disabled: false,
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Field.Root invalid>
          <Input {...props} defaultValue="不正な値" className="w-64" />
        </Field.Root>
        <form className="flex w-64 flex-col items-start gap-2">
          <Field.Root>
            <Input {...props} required className="w-64" />
          </Field.Root>
          <button type="submit" className="underline">
            送信
          </button>
          <p className="text-sm opacity-80">送信を試みるとバリデーションが適用されます</p>
        </form>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    variant: "naked",
    size: "md",
    radius: "rounded",
    placeholder: "e.g. Colm Tuite",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Input {...props} disabled defaultValue="田仲 太郎" className="w-64" />
        <Input {...props} disabled placeholder="e.g. Colm Tuite" className="w-64" />
      </div>
    );
  },
});
