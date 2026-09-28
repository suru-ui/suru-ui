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
const SIZES: readonly Accordion.Size[] = theme.SIZES;

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
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    size: "md",
    multiple: false,
    separator: true,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[320px]">
        <Accordion {...props} items={ITEMS} />
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数",
  ...ctrl({
    size: "md",
    separator: true,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[380px]">
        <Accordion {...props} items={ITEMS.slice(0, 3)} multiple />
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    multiple: false,
    separator: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {[
          ["2", "3", "4"],
          ["1", "3", "5"],
        ].map((disabledValue) => (
          <div className="w-[400px] h-[320px]" key={disabledValue.join()}>
            <Accordion
              {...props}
              items={ITEMS.map((item) => ({
                ...item,
                disabled: disabledValue.includes(item.value),
              }))}
              defaultValue={["1"]}
            />
          </div>
        ))}
      </div>
    );
  },
});

export const Borders = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    multiple: false,
    separator: true,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[320px]">
        <Accordion
          {...props}
          items={ITEMS}
          className="border rounded-3"
          slotProps={{
            item: {
              className: "px-4",
            },
          }}
        />
      </div>
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    size: "md",
    multiple: false,
    separator: true,
    disabled: false,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className="w-[400px] h-[320px]">
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
    size: "md",
    multiple: false,
    separator: true,
    disabled: false,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className="w-[400px] h-[320px]">
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

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    multiple: false,
    separator: true,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[320px] flex flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <Accordion {...props} key={size} size={size} items={ITEMS} />
          </div>
        ))}
      </div>
    );
  },
});

export const Separated = meta.story({
  name: "区切り線",
  ...ctrl({
    size: "md",
    multiple: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[320px]">
        <Accordion {...props} items={ITEMS} separator />
      </div>
    );
  },
});

export const FullyDisabled = meta.story({
  name: "完全無効化",
  ...ctrl({
    size: "md",
    multiple: false,
    separator: true,
  }),
  render(props) {
    return (
      <div className="w-[400px] h-[320px]">
        <Accordion {...props} items={ITEMS} disabled defaultValue={["2"]} />
      </div>
    );
  },
});
