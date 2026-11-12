import * as theme from "@suru-ui/theme";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon, MessageCircleQuestionIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Card as SuiCard } from "../card/index.js";
import { Accordion } from "./index.js";
import * as AccordionParts from "./index.js";

const ITEMS: readonly Accordion.ItemObject[] = [
  {
    title: "アコーディオンとは？",
    value: "1",
    content:
      "複数の項目を折りたたんで表示し、ユーザーが必要な項目だけを展開して内容を確認できる UI コンポーネントです。情報量の多いページでも、画面をすっきりと整理して表示できます。",
  },
  {
    title: "どのような場面で使いますか？",
    value: "2",
    content:
      "FAQ や設定画面、商品の詳細情報など、関連する情報をまとめて表示したい場合に適しています。最初は概要だけを表示し、詳しい内容を必要とするユーザーにだけ提示できます。",
  },
  {
    title: "複数の項目を同時に開けますか？",
    value: "3",
    content:
      "コンポーネントの設定によって、複数の項目を同時に展開できるようにすることも、常に 1 つだけ展開するようにすることも可能です。用途に応じて適切な動作を選択できます。",
  },
  {
    title: "キーボードでも操作できますか？",
    value: "4",
    content:
      "はい。適切なセマンティック要素と ARIA 属性を使用することで、キーボードから項目の展開や折りたたみを操作できます。マウスを使用できないユーザーにも配慮した実装が重要です。",
  },
  {
    title: "内容が長い場合はどうなりますか？",
    value: "5",
    content:
      "展開された領域の高さは、内部に含まれるコンテンツの量に応じて自動的に調整されます。長い文章やリスト、複数の要素を含む場合でも、コンテンツが途中で隠れないよう自然にレイアウトされます。",
  },
];
const RADII: readonly Accordion.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Accordion.Size[] = theme.SIZES;

function minH(size: Accordion.Size = "md"): string {
  return {
    lg: "min-h-[500px]",
    md: "min-h-[400px]",
    sm: "min-h-[300px]",
  }[size];
}

const meta = preview.meta({
  title: "Accordion",
  component: Accordion,
});

export default meta;

const ctrl = controls(Accordion, {
  size: {
    control: "select",
    options: SIZES,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  disabled: {
    control: "boolean",
  },
  multiple: {
    control: "boolean",
  },
  indicator: {
    control: "boolean",
  },
  separator: {
    control: "boolean",
  },
});

export const Basic = meta.story({
  name: "基本",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion {...props} items={ITEMS} defaultValue={["1"]} />
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    const [value, setValue] = React.useState(["1"]);

    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion {...props} items={ITEMS} value={value} onValueChange={setValue} />
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    return (
      <div className="w-md flex flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size} className={`flex flex-col gap-2 ${minH(size)}`}>
            <span>{size}</span>
            <Accordion {...props} key={size} size={size} items={ITEMS} />
          </div>
        ))}
      </div>
    );
  },
});

// フォーカスリングの角丸が変わるだけなので、ストーリーには追加しません。
// export const Radii = meta.story();

export const Multiple = meta.story({
  name: "複数",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    return (
      <div
        className={`w-md ${
          {
            lg: "h-[480px]",
            md: "h-[380px]",
            sm: "h-[280px]",
          }[props.size ?? "md"]
        }`}
      >
        <Accordion {...props} items={ITEMS.slice(0, 3)} multiple defaultValue={["1"]} />
      </div>
    );
  },
});

export const WithoutIndicator = meta.story({
  name: "インジケーターなし",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    separator: true,
  }),
  render(props) {
    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion {...props} items={ITEMS} indicator={false} defaultValue={["1"]} />
      </div>
    );
  },
});

export const WithoutSeparator = meta.story({
  name: "仕切りなし",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
  }),
  render(props) {
    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion {...props} items={ITEMS} defaultValue={["1"]} />
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    radius: undefined,
    multiple: false,
    separator: true,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        <div className={`w-md ${minH(props.size)} flex flex-col gap-2`}>
          <span>部分的に無効なアイテム</span>
          <Accordion
            {...props}
            items={ITEMS.map((item) => ({
              ...item,
              disabled: ["1", "3", "5"].includes(item.value),
            }))}
            defaultValue={["1"]}
          />
        </div>
        <div className={`w-md ${minH(props.size)} flex flex-col gap-2`}>
          <span>連続する無効アイテム</span>
          <Accordion
            {...props}
            items={ITEMS.map((item) => ({
              ...item,
              disabled: ["2", "3", "4"].includes(item.value),
            }))}
            defaultValue={["1"]}
          />
        </div>
        <div className={`w-md ${minH(props.size)} flex flex-col gap-2`}>
          <span>全体的に無効</span>
          <Accordion {...props} items={ITEMS} disabled defaultValue={["1"]} />
        </div>
      </div>
    );
  },
});

export const Borders = meta.story({
  name: "枠線",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion
          {...props}
          items={ITEMS}
          className="border rounded-3"
          slotProps={{
            item: {
              className: "px-4",
            },
          }}
          defaultValue={["1"]}
        />
      </div>
    );
  },
});

export const Card = meta.story({
  name: "カード",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    const Card = SuiCard;

    return (
      <div className="w-md">
        <Card
          title="アコーディオン"
          outlined
          description="複数の項目を折りたたんで表示し、必要な項目だけを展開して内容を確認できるコンポーネントです。"
        >
          <Accordion {...props} items={ITEMS} defaultValue={["1"]} />
        </Card>
      </div>
    );
  },
});

export const WithIcon = meta.story({
  name: "アイコン付き",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    separator: true,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion.Root {...props} items={ITEMS} defaultValue={["1"]}>
          {(item, index) => {
            const { title, content, itemProps } = Accordion.decomposeItemObject(item);

            return (
              <Accordion.Item {...itemProps} key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <div className="flex gap-2 items-center">
                      <MessageCircleQuestionIcon />
                      {title}
                    </div>
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Content>{content}</Accordion.Content>
              </Accordion.Item>
            );
          }}
        </Accordion.Root>
      </div>
    );

    // 合成コンポーネントを使用して以下のように簡単に実装できますが、配列内に React 要素を渡すと Storybook の不具合（？）でブラウザーがフリーズするため、ここではメモとして残しておきます。
    // return (
    //   <div className={`w-md ${minH(props.size)}`}>    <Accordion
    //       {...props}
    //       items={ITEMS.map((item) => ({
    //         ...item,
    //         title: (
    //           <>            <div className="flex gap-2 items-center">              <MessageCircleQuestionIcon />
    //               {item.title}
    //             </div>          </>        ),
    //       }))}
    //       defaultValue={["1"]}    />  </div>
    // );
  },
});

export const WidthSubtext = meta.story({
  name: "サブテキスト付き",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    indicator: true,
    separator: true,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div
        className={`w-md ${
          {
            lg: "h-[550px]",
            md: "h-[450px]",
            sm: "h-[350px]",
          }[props.size ?? "md"]
        }`}
      >
        <Accordion.Root {...props} items={ITEMS} defaultValue={["1"]}>
          {(item, index) => {
            const { title, content, itemProps } = Accordion.decomposeItemObject(item);

            return (
              <Accordion.Item {...itemProps} key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    <div className="flex flex-col gap-2 overflow-hidden">
                      <p className="m-0">{title}</p>
                      <p className="m-0 text-xs text-canvas_text-2 truncate">{content}</p>
                    </div>
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Content>{content}</Accordion.Content>
              </Accordion.Item>
            );
          }}
        </Accordion.Root>
      </div>
    );
  },
});

export const CustomTrigger = meta.story({
  name: "独自トリガー",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    separator: true,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion.Root {...props} items={ITEMS} defaultValue={["1"]}>
          {(item, index) => {
            const { title, content, itemProps } = Accordion.decomposeItemObject(item);

            return (
              <Accordion.Item {...itemProps} key={index}>
                <Accordion.Heading>
                  <span>{title}</span>
                  <Accordion.Trigger
                    render={(htmlProps: {}, state) => (
                      <Button
                        {...htmlProps}
                        size="sm"
                        squared
                        variant="liquid"
                        disabled={state.disabled}
                      >
                        {state.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      </Button>
                    )}
                    unstyled
                  />
                </Accordion.Heading>
                <Accordion.Content>{content}</Accordion.Content>
              </Accordion.Item>
            );
          }}
        </Accordion.Root>
      </div>
    );
  },
});

export const CustomIndicator = meta.story({
  name: "独自インジケーター",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    separator: true,
  }),
  render(props) {
    const Accordion = AccordionParts;

    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion.Root {...props} items={ITEMS} defaultValue={["1"]}>
          {(item, index) => {
            const { title, content, itemProps } = Accordion.decomposeItemObject(item);

            return (
              <Accordion.Item {...itemProps} key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {title}
                    <Accordion.Indicator className={(state) => (state.open ? "rotate-45" : "")}>
                      <PlusIcon />
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Content>{content}</Accordion.Content>
              </Accordion.Item>
            );
          }}
        </Accordion.Root>
      </div>
    );
  },
});

export const CustomItems = meta.story({
  name: "独自アイテム",
  ...ctrl({
    size: "md",
    radius: undefined,
    disabled: false,
    multiple: false,
    separator: true,
  }),
  render(props) {
    const Accordion = AccordionParts;

    const [items] = React.useState([
      {
        id: "1",
        summary: "アコーディオンとは？",
        description:
          "複数の項目を折りたたんで表示し、ユーザーが必要な項目だけを展開して内容を確認できる UI コンポーネントです。情報量の多いページでも、画面をすっきりと整理して表示できます。",
      },
      {
        id: "2",
        summary: "どのような場面で使いますか？",
        description:
          "FAQ や設定画面、商品の詳細情報など、関連する情報をまとめて表示したい場合に適しています。最初は概要だけを表示し、詳しい内容を必要とするユーザーにだけ提示できます。",
      },
      {
        id: "3",
        summary: "複数の項目を同時に開けますか？",
        description:
          "コンポーネントの設定によって、複数の項目を同時に展開できるようにすることも、常に 1 つだけ展開するようにすることも可能です。用途に応じて適切な動作を選択できます。",
      },
      {
        id: "4",
        summary: "キーボードでも操作できますか？",
        description:
          "はい。適切なセマンティック要素と ARIA 属性を使用することで、キーボードから項目の展開や折りたたみを操作できます。マウスを使用できないユーザーにも配慮した実装が重要です。",
      },
      {
        id: "5",
        summary: "内容が長い場合はどうなりますか？",
        description:
          "展開された領域の高さは、内部に含まれるコンテンツの量に応じて自動的に調整されます。長い文章やリスト、複数の要素を含む場合でも、コンテンツが途中で隠れないよう自然にレイアウトされます。",
      },
    ]);
    const [value, setValue] = React.useState(["1"]);

    return (
      <div className={`w-md ${minH(props.size)}`}>
        <Accordion.Root {...props} items={items} value={value} onValueChange={setValue}>
          {(item) => {
            const { id, summary, description } = item;

            return (
              <Accordion.Item key={id} value={id}>
                <Accordion.Heading>
                  <Accordion.Trigger>
                    {summary}
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Content>{description}</Accordion.Content>
              </Accordion.Item>
            );
          }}
        </Accordion.Root>
      </div>
    );
  },
});
