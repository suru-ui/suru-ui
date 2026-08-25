import { SIZES } from "@suru-ui/theme";
import { PlusIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Collapsible } from "../src/collapsible/index.js";
import * as CollapsibleParts from "../src/collapsible/index.js";

const meta = preview.meta({
  title: "Collapsible",
  component: Collapsible,
});

export default meta;

const ctrl = controls(Collapsible, {
  defaultOpen: {
    control: "boolean",
  },
  disabled: {
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
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible {...props} title="Suru UI とは">
          Suru UI は、Base UI を基盤とした React コンポーネントライブラリーです。
        </Collapsible>
      </div>
    );
  },
});

export const CustomParts = meta.story({
  name: "パーツの差し替え",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible
          {...props}
          title="カスタムアイコン"
          slotProps={{ indicator: { children: <PlusIcon /> } }}
        >
          `slotProps.indicator` で開閉状態を示すアイコンを差し替えられます。
        </Collapsible>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-80">
        <Collapsible {...props} open={open} title="操作パネル" onOpenChange={setOpen}>
          `open` と `onOpenChange` で開閉を制御できます。
        </Collapsible>
        <p className="mt-2">現在の状態: {open ? "開" : "閉"}</p>
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Collapsible {...props} title="枠線あり（既定）">
          既定では、コラプシブルの外側に枠線が表示されます。
        </Collapsible>
        <Collapsible {...props} title="枠線なし" outlined={false}>
          `outlined={false}` で枠線を非表示にできます。
        </Collapsible>
      </div>
    );
  },
});

export const Radius = meta.story({
  name: "角丸",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-full flex-col gap-4">
        {(["none", "sm", "md", "lg"] as const).map((radius) => (
          <div key={radius} className="w-80">
            <Collapsible {...props} title={`角丸 "${radius}"`} radius={radius}>
              `radius` プロパティーで角丸の大きさを指定できます。
            </Collapsible>
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        {SIZES.map((size) => (
          <Collapsible key={size} {...props} size={size} title={`サイズ "${size}"`}>
            `size` プロパティーで見出しとパネルの大きさを指定できます。
          </Collapsible>
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    defaultOpen: true,
    disabled: true,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Collapsible {...props} title="無効">
          `disabled` を渡すと、トリガーを操作できなくなります。
        </Collapsible>
        <Collapsible {...props} title="有効" disabled={false}>
          `disabled={false}` で操作できる状態に戻せます。
        </Collapsible>
      </div>
    );
  },
});

export const KeepMounted = meta.story({
  name: "閉じた後も保持",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
    outlined: true,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible
          {...props}
          title="パネルを DOM に保持"
          slotProps={{ panel: { keepMounted: true } }}
        >
          `slotProps.panel.keepMounted` を指定すると、閉じた後もパネルを DOM に保持します。
        </Collapsible>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ構成",
  ...ctrl({
    defaultOpen: true,
    disabled: false,
    outlined: false,
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <CollapsibleParts.Root {...props}>
          <CollapsibleParts.Trigger>
            <Button>トリガー</Button>
          </CollapsibleParts.Trigger>
          <CollapsibleParts.Panel>
            Root、Trigger、Panel を組み合わせて構成できます。
          </CollapsibleParts.Panel>
        </CollapsibleParts.Root>
      </div>
    );
  },
});
