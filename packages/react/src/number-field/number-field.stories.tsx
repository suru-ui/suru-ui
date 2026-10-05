import * as theme from "@suru-ui/theme";
import { JapaneseYenIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Field } from "../field/index.js";
import { NumberField } from "./index.js";

const COLORS: readonly NumberField.Color[] = theme.COLORS;
const RADII: readonly NumberField.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly NumberField.Size[] = theme.SIZES;
const VARIANTS: readonly NumberField.Variant[] = ["naked", "liquid"];

const meta = preview.meta({
  title: "NumberField",
  component: NumberField,
});

export default meta;

const ctrl = controls(NumberField, {
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
  step: {
    control: "number",
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  disabled: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  decrement: {
    control: "boolean",
  },
  increment: {
    control: "boolean",
  },
  scrubArea: {
    control: "text",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return <NumberField {...props} className="w-[320px]" defaultValue={100} />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "金額",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              variant={variant}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: true,
    decrement: true,
    increment: true,
    scrubArea: "金額",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {COLORS.map((color) => (
          <NumberField
            {...props}
            key={color}
            color={color}
            className="w-[320px]"
            placeholder={color}
            startAddons={[<JapaneseYenIcon key={0} />]}
          />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col gap-2">
            <span>{radius}</span>
            <NumberField
              {...props}
              radius={radius}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    disabled: false,
    decrement: true,
    increment: true,
    scrubArea: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              variant={variant}
              outlined
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    max: undefined,
    min: undefined,
    step: 1,
    color: "grey",
    radius: undefined,
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "金額",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <NumberField
              {...props}
              size={size}
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Invalid = meta.story({
  name: "エラー",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <Field invalid>
          <NumberField
            {...props}
            className="w-[320px]"
            startAddons={[<JapaneseYenIcon key={0} />]}
            defaultValue={100}
          />
        </Field>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <span>{variant}</span>
            <NumberField
              {...props}
              disabled
              className="w-[320px]"
              startAddons={[<JapaneseYenIcon key={0} />]}
              defaultValue={100}
            />
            <NumberField
              {...props}
              disabled
              className="w-[320px]"
              placeholder="プレースホルダー"
              startAddons={[<JapaneseYenIcon key={0} />]}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    max: 10,
    min: 0,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    const [value, setValue] = React.useState<number | null>(3);
    return (
      <div className="flex flex-col gap-2">
        <NumberField
          {...props}
          value={value}
          className="w-[320px]"
          onValueChange={(next) => setValue(next)}
        />
        <span>
          入力値:
          {value === null ? "(空)" : value}
        </span>
        <div>
          <button type="button" onClick={() => setValue(null)}>
            クリア
          </button>
        </div>
      </div>
    );
  },
});

export const ReadOnly = meta.story({
  name: "読み取り専用",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        <NumberField {...props} readOnly className="w-[320px]" defaultValue={100} />
        <NumberField {...props} readOnly className="w-[320px]" placeholder="プレースホルダー" />
      </div>
    );
  },
});

export const EmptyAndLong = meta.story({
  name: "空と長い入力値",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <NumberField {...props} placeholder="空の入力欄" />
        <NumberField {...props} defaultValue={1234567890} />
      </div>
    );
  },
});

export const MinMaxStep = meta.story({
  name: "範囲と刻み",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "個数",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <NumberField {...props} max={10} min={0} step={1} defaultValue={5} />
        <NumberField {...props} max={1} min={0} step={0.1} defaultValue={0.5} />
        <NumberField {...props} max={100} min={-100} step={5} defaultValue={0} />
      </div>
    );
  },
});

export const Addons = meta.story({
  name: "接頭辞と接尾辞",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: false,
    increment: false,
    scrubArea: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-3">
        <NumberField {...props} startAddons={[<JapaneseYenIcon key={0} />]} defaultValue={1000} />
        <NumberField {...props} endAddons={["円"]} defaultValue={1000} />
        <NumberField
          {...props}
          endAddons={["円 (税込)"]}
          startAddons={[<JapaneseYenIcon key={0} />]}
          defaultValue={1000}
        />
      </div>
    );
  },
});

export const WithField = meta.story({
  name: "ラベルと説明",
  ...ctrl({
    max: undefined,
    min: undefined,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: undefined,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <Field label="数量" description="1 以上 99 以下で入力します。">
          <NumberField {...props} max={99} min={1} className="w-[320px]" defaultValue={1} />
        </Field>
        <Field label="金額" invalid description="上限を超えています。">
          <NumberField
            {...props}
            className="w-[320px]"
            startAddons={[<JapaneseYenIcon key={0} />]}
            defaultValue={1000000}
          />
        </Field>
      </div>
    );
  },
});

export const Required = meta.story({
  name: "必須と検証",
  ...ctrl({
    max: 99,
    min: 1,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: true,
    decrement: true,
    increment: true,
    scrubArea: undefined,
  }),
  render(props) {
    return (
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3">
        <Field label="数量" description="空のまま送信すると枠線が赤くなります。">
          <NumberField {...props} required className="w-[320px]" placeholder="1" />
        </Field>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    max: 10,
    min: 0,
    size: "md",
    step: 1,
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
    decrement: true,
    increment: true,
    scrubArea: "数量",
  }),
  render(props) {
    return (
      <div className="flex w-[320px] flex-col gap-2">
        <NumberField {...props} defaultValue={5} aria-label="数量" />
        <p>
          入力欄にフォーカスして上下矢印キーで増減します。Shift
          キーと組み合わせると大きく増減します。
        </p>
      </div>
    );
  },
});

export const QuantityForm = meta.story({
  name: "実践例: 注文フォーム",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const [submitted, setSubmitted] = React.useState<number | null>(null);
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const quantity = data.get("quantity");
          setSubmitted(typeof quantity === "string" ? Number(quantity) : null);
        }}
        className="flex w-[320px] flex-col gap-3"
      >
        <Field label="数量" description="1 以上 10 以下で入力します。">
          <NumberField
            {...props}
            max={10}
            min={1}
            name="quantity"
            step={1}
            required
            decrement
            increment
            scrubArea="数量"
            defaultValue={1}
          />
        </Field>
        <div>
          <button type="submit">注文する</button>
        </div>
        {submitted !== null && <span>{submitted} 個で注文しました。</span>}
      </form>
    );
  },
});

export const CartItem = meta.story({
  name: "実践例: カート",
  ...ctrl({
    size: "sm",
    color: "grey",
    radius: undefined,
    variant: "liquid",
    disabled: false,
    outlined: false,
  }),
  render(props) {
    const unitPrice = 1200;
    const [quantity, setQuantity] = React.useState<number | null>(2);
    return (
      <div className="flex w-[320px] flex-col gap-2">
        <span>商品名: サンプル商品</span>
        <NumberField
          {...props}
          max={99}
          min={0}
          step={1}
          value={quantity}
          decrement
          increment
          onValueChange={(next) => setQuantity(next)}
          aria-label="購入数量"
        />
        <span>
          合計:
          {(quantity ?? 0) * unitPrice}円
        </span>
      </div>
    );
  },
});
