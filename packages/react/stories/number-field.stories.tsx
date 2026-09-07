import { SIZES, COLORS } from "@suru-ui/theme";
import { JapaneseYenIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Field } from "../src/field/index.js";
import { NumberField } from "../src/number-field/index.js";

const RADII = ["none", ...SIZES, "full"] as const;
const VARIANTS = ["naked", "liquid"] as const;

const meta = preview.meta({
  title: "NumberField",
  component: NumberField,
});

export default meta;

const ctrl = controls(NumberField, {
  color: {
    options: COLORS,
    control: "select",
  },
  decrement: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
  increment: {
    control: "boolean",
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
    options: RADII,
    control: "select",
  },
  scrubArea: {
    control: "text",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  step: {
    control: "number",
  },
  variant: {
    options: VARIANTS,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
  }),
  render(props) {
    return <NumberField {...props} className="w-[320px]" defaultValue={100} />;
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    color: "grey",
    size: "md",
    radius: undefined,
    disabled: false,
    scrubArea: undefined,
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    color: "grey",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "金額",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: 10,
    min: 0,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: undefined,
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "個数",
    decrement: true,
    increment: true,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: undefined,
    decrement: false,
    increment: false,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: undefined,
    decrement: true,
    increment: true,
    step: 1,
    max: undefined,
    min: undefined,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: true,
    disabled: false,
    scrubArea: undefined,
    decrement: true,
    increment: true,
    step: 1,
    max: 99,
    min: 1,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
    scrubArea: "数量",
    decrement: true,
    increment: true,
    step: 1,
    max: 10,
    min: 0,
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
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    outlined: false,
    disabled: false,
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
    variant: "liquid",
    color: "grey",
    size: "sm",
    radius: undefined,
    outlined: false,
    disabled: false,
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
