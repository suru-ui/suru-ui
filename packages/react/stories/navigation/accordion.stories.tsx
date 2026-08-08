import { SIZES } from "@suru-ui/theme";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Accordion } from "../../src/navigation/accordion/index.js";
import * as AccordionParts from "../../src/navigation/accordion/index.js";

const meta = preview.meta({
  title: "Navigation / Accordion",
  component: Accordion,
});

export default meta;

const ctrl = controls(Accordion, {
  disabled: {
    control: "boolean",
  },
  divider: {
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
    options: ["none", "sm", "md", "lg"],
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Accordion {...props} title="Suru UI とは">
          Suru UI は、Base UI を基盤とした React
          コンポーネントライブラリーです。ヘッドレスの振る舞いと、テーマに基づく見た目を両立しています。
        </Accordion>
      </div>
    );
  },
});

export const Multiple = meta.story({
  name: "複数項目",
  ...ctrl({
    disabled: false,
    multiple: true,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <AccordionParts.Root {...props}>
          <AccordionParts.Item>
            <AccordionParts.Header>
              <AccordionParts.Trigger>
                Suru UI とは
                <AccordionParts.Indicator>
                  <ChevronDownIcon />
                </AccordionParts.Indicator>
              </AccordionParts.Trigger>
            </AccordionParts.Header>
            <AccordionParts.Panel>
              Suru UI は、Base UI を基盤とした React コンポーネントライブラリーです。
            </AccordionParts.Panel>
          </AccordionParts.Item>
          <AccordionParts.Item>
            <AccordionParts.Header>
              <AccordionParts.Trigger>
                使い方は
                <AccordionParts.Indicator>
                  <ChevronDownIcon />
                </AccordionParts.Indicator>
              </AccordionParts.Trigger>
            </AccordionParts.Header>
            <AccordionParts.Panel>
              `title` と `children` を渡すだけです。複数の項目を開くには `multiple` を指定します。
            </AccordionParts.Panel>
          </AccordionParts.Item>
          <AccordionParts.Item>
            <AccordionParts.Header>
              <AccordionParts.Trigger>
                利用条件は
                <AccordionParts.Indicator>
                  <ChevronDownIcon />
                </AccordionParts.Indicator>
              </AccordionParts.Trigger>
            </AccordionParts.Header>
            <AccordionParts.Panel>MIT ライセンスです。</AccordionParts.Panel>
          </AccordionParts.Item>
        </AccordionParts.Root>
      </div>
    );
  },
});

export const CustomIcon = meta.story({
  name: "アイコン",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Accordion
          {...props}
          title="アイコンの差し替え"
          slotProps={{ indicator: { children: <PlusIcon /> } }}
        >
          `slotProps.indicator` に `children` を渡すと、既定のアイコンを差し替えられます。
        </Accordion>
        <Accordion
          {...props}
          title="アイコンを消す"
          slotProps={{
            trigger: {
              children: "Trigger の children を渡すと見出し全体を自由に組み立てられます。",
            },
          }}
        >
          Trigger の children を渡した場合は、タイトルとインジケーターを描画しません。
        </Accordion>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-80">
        <Accordion
          {...props}
          title="操作パネル"
          value={open ? ["panel"] : []}
          onValueChange={(next) => setOpen(next.length > 0)}
          slotProps={{ item: { value: "panel" } }}
        >
          `value` と `onValueChange` で開閉を制御できます。
        </Accordion>
        <p className="mt-2">現在の状態: {open ? "開" : "閉"}</p>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Accordion {...props} title="枠線あり（既定）">
          既定では、アコーディオンの外側に枠線が表示されます。
        </Accordion>
        <Accordion {...props} outlined={false} title="枠線なし">
          `outlined={false}` で枠線を非表示にできます。
        </Accordion>
      </div>
    );
  },
});

const accordionItems = [
  {
    title: "Suru UI とは",
    panel: "Base UI を基盤としたヘッドレスコンポーネントライブラリーです。",
  },
  { title: "使い方は", panel: "`divider` プロパティーで項目間の区切り線を制御できます。" },
  { title: "利用条件は", panel: "MIT ライセンスで公開されています。" },
];

function AccordionItems() {
  return accordionItems.map(({ title, panel }) => (
    <AccordionParts.Item key={title}>
      <AccordionParts.Header>
        <AccordionParts.Trigger>
          {title}
          <AccordionParts.Indicator>
            <ChevronDownIcon />
          </AccordionParts.Indicator>
        </AccordionParts.Trigger>
      </AccordionParts.Header>
      <AccordionParts.Panel>{panel}</AccordionParts.Panel>
    </AccordionParts.Item>
  ));
}

export const Divider = meta.story({
  name: "区切り線",
  ...ctrl({
    disabled: false,
    multiple: true,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-6">
        <div>
          <AccordionParts.Root {...props}>
            <AccordionItems />
          </AccordionParts.Root>
          <p className="mt-1">区切り線あり（既定）</p>
        </div>
        <div>
          <AccordionParts.Root {...props} divider={false}>
            <AccordionItems />
          </AccordionParts.Root>
          <p className="mt-1">区切り線なし（`divider={false}`）</p>
        </div>
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-full flex-col gap-4">
        {(["none", "sm", "md", "lg"] as const).map((radius) => (
          <div key={radius} className="w-80">
            <Accordion {...props} radius={radius} title={`角丸 "${radius}"`}>
              `radius` プロパティーで角丸の大きさを指定できます。
            </Accordion>
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    disabled: false,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        {SIZES.map((size) => (
          <Accordion key={size} {...props} size={size} title={`サイズ "${size}"`}>
            `size` プロパティーで見出しの大きさを指定できます。
          </Accordion>
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    disabled: true,
    multiple: false,
    divider: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Accordion {...props} title="すべて無効">
          `disabled` を渡すと、アコーディオンのすべての項目が操作できなくなります。
        </Accordion>
        <Accordion
          {...props}
          disabled={false}
          title="項目単位で無効"
          slotProps={{ item: { disabled: true } }}
        >
          `slotProps.item` に `disabled` を渡すと、項目単位で無効化できます。
        </Accordion>
      </div>
    );
  },
});
