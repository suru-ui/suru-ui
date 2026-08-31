import * as theme from "@suru-ui/theme";
import { ChevronUpIcon, ChevronDownIcon, MessageCircleQuestionIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Accordion } from "../src/accordion/index.js";
import * as AccordionParts from "../src/accordion/index.js";
import { Button } from "../src/button/index.js";

const ITEMS: readonly Accordion.ItemObject[] = [
  {
    value: "1",
    title: "アコーディオンとは？",
    content:
      "複数の項目を折りたたんで表示し、ユーザーが必要な項目だけを展開して内容を確認できる UI コンポーネントです。情報量の多いページでも、画面をすっきりと整理して表示できます。",
  },
  {
    value: "2",
    title: "どのような場面で使いますか？",
    content:
      "FAQ や設定画面、商品の詳細情報など、関連する情報をまとめて表示したい場合に適しています。最初は概要だけを表示し、詳しい内容を必要とするユーザーにだけ提示できます。",
  },
  {
    value: "3",
    title: "複数の項目を同時に開けますか？",
    content:
      "コンポーネントの設定によって、複数の項目を同時に展開できるようにすることも、常に 1 つだけ展開するようにすることも可能です。用途に応じて適切な動作を選択できます。",
  },
  {
    value: "4",
    title: "キーボードでも操作できますか？",
    content:
      "はい。適切なセマンティック要素と ARIA 属性を使用することで、キーボードから項目の展開や折りたたみを操作できます。マウスを使用できないユーザーにも配慮した実装が重要です。",
  },
  {
    value: "5",
    title: "内容が長い場合はどうなりますか？",
    content:
      "展開された領域の高さは、内部に含まれるコンテンツの量に応じて自動的に調整されます。長い文章やリスト、複数の要素を含む場合でも、コンテンツが途中で隠れないよう自然にレイアウトされます。",
  },
];
const RADII: readonly Accordion.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Accordion.Size[] = theme.SIZES;
const VARIANTS: readonly Accordion.Variant[] = ["liquid", "naked"];

const meta = preview.meta({
  title: "Accordion",
  component: Accordion,
});

export default meta;

const ctrl = controls(Accordion, {
  disabled: {
    control: "boolean",
  },
  separator: {
    control: "boolean",
  },
  multiple: {
    control: "boolean",
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Accordion {...props} items={ITEMS} />
      </div>
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className="w-80">
        <Accordion.Root {...props} items={ITEMS}>
          {(item, index) => (
            <Accordion.Item key={index}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  <div className="flex gap-2 items-center">
                    <MessageCircleQuestionIcon />
                    {item.title}
                  </div>
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Content>{item.content}</Accordion.Content>
            </Accordion.Item>
          )}
        </Accordion.Root>
      </div>
    );
  },
});

export const CustomTrigger = meta.story({
  name: "独自トリガー",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className="w-80">
        <Accordion.Root {...props} items={ITEMS}>
          {(item, index) => (
            <Accordion.Item key={index}>
              <Accordion.Heading>
                <span>{item.title}</span>
                <Accordion.Trigger
                  render={(props: {}, state) => (
                    <Button {...props} size="sm" squared disabled={state.disabled}>
                      {state.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Button>
                  )}
                  unstyled
                />
              </Accordion.Heading>
              <Accordion.Content>{item.content}</Accordion.Content>
            </Accordion.Item>
          )}
        </Accordion.Root>
      </div>
    );
  },
});

export const Variants = meta.story({
  name: "主な外観",
  ...ctrl({
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80 flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Accordion {...props} key={variant} items={ITEMS} variant={variant} />
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80 flex flex-col gap-6">
        {SIZES.map((size) => (
          <Accordion {...props} key={size} size={size} items={ITEMS} />
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    variant: "liquid",
    size: "md",
    multiple: false,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80 flex flex-col gap-6">
        {RADII.map((radius) => (
          <Accordion {...props} key={radius} items={ITEMS.slice(0, 2)} radius={radius} />
        ))}
      </div>
    );
  },
});

export const WithOutline = meta.story({
  name: "枠線付き",
  ...ctrl({
    size: "md",
    radius: undefined,
    multiple: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80 flex flex-col gap-6">
        {VARIANTS.map((variant) => (
          <Accordion {...props} key={variant} items={ITEMS} variant={variant} outlined />
        ))}
      </div>
    );
  },
});

export const WithSeparator = meta.story({
  name: "区切り線付き",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Accordion {...props} items={ITEMS} separator />
      </div>
    );
  },
});

export const MultipleExpanded = meta.story({
  name: "複数展開",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    outlined: false,
    separator: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Accordion {...props} items={ITEMS} multiple />
      </div>
    );
  },
});

export const FullyDisabled = meta.story({
  name: "完全無効化",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
  }),
  render(props) {
    return (
      <div className="w-80">
        <Accordion {...props} items={ITEMS} disabled defaultValue={["2"]} />
      </div>
    );
  },
});

export const PartialDisabled = meta.story({
  name: "一部無効化",
  ...ctrl({
    variant: "liquid",
    size: "md",
    radius: undefined,
    multiple: false,
    outlined: false,
    separator: false,
  }),
  render(props) {
    return (
      <div className="w-80 flex flex-col gap-6">
        {[
          ["2", "3", "4"],
          ["1", "3", "5"],
        ].map((disabledValue) => (
          <Accordion
            {...props}
            key={disabledValue.join()}
            items={ITEMS.map((item) => ({
              ...item,
              disabled: disabledValue.includes(item.value),
            }))}
            defaultValue={["3"]}
          />
        ))}
      </div>
    );
  },
});
