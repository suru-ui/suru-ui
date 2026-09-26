import * as theme from "@suru-ui/theme";
import { FileIcon, PlusIcon, FolderIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import cn from "../src/cn.js";
import { Collapsible } from "../src/collapsible/index.js";

const SIZES: readonly Collapsible.Size[] = theme.SIZES;

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
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible
          {...props}
          trigger={
            <Button variant="naked">
              Suru UI とは
              <Collapsible.Indicator />
            </Button>
          }
        >
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
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible
          {...props}
          trigger={
            <Button variant="naked">
              カスタムアイコン
              <Collapsible.Indicator>
                <PlusIcon />
              </Collapsible.Indicator>
            </Button>
          }
        >
          `Collapsible.Indicator` の子要素で開閉状態を示すアイコンを差し替えられます。
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
    size: "md",
  }),
  render(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="w-80">
        <Collapsible
          {...props}
          open={open}
          trigger={
            <Button variant="naked">
              操作パネル
              <Collapsible.Indicator />
            </Button>
          }
          onOpenChange={setOpen}
        >
          `open` と `onOpenChange` で開閉を制御できます。
        </Collapsible>
        <p className="mt-2">現在の状態: {open ? "open" : "closed"}</p>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    defaultOpen: false,
    disabled: false,
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        {SIZES.map((size) => (
          <Collapsible
            key={size}
            {...props}
            size={size}
            trigger={
              <Button size={size} variant="naked">
                サイズ "{size}"
                <Collapsible.Indicator />
              </Button>
            }
          >
            `size` プロパティーでパネルの大きさを指定できます。
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
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex w-80 flex-col gap-4">
        <Collapsible
          {...props}
          trigger={
            <Button variant="naked">
              無効
              <Collapsible.Indicator />
            </Button>
          }
        >
          `disabled` を渡すと、トリガーを操作できなくなります。
        </Collapsible>
        <Collapsible
          {...props}
          trigger={
            <Button variant="naked">
              有効
              <Collapsible.Indicator />
            </Button>
          }
          disabled={false}
        >
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
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Collapsible
          {...props}
          trigger={
            <Button variant="naked">
              コンテンツを DOM に保持
              <Collapsible.Indicator />
            </Button>
          }
          slotProps={{
            content: {
              keepMounted: true,
            },
          }}
        >
          <div className="flex flex-col gap-2">
            `slotProps.content.keepMounted` を指定すると、閉じた後もコンテンツを DOM
            に保持します。カウンターを進めてから閉じて開き直すと、値が残っていることを確認できます。
            <Counter />
          </div>
        </Collapsible>
      </div>
    );
  },
});

export const FileTree = meta.story({
  name: "ファイルツリー",
  ...ctrl({
    defaultOpen: true,
    disabled: false,
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-60">
        <Collapsible {...props} trigger={<TreeFolder>src</TreeFolder>}>
          <div className="flex flex-col gap-1 pl-[20px]">
            <Collapsible trigger={<TreeFolder>components</TreeFolder>}>
              <div className="flex flex-col gap-1 pl-[20px]">
                <TreeFile>button.tsx</TreeFile>
                <TreeFile>dialog.tsx</TreeFile>
              </div>
            </Collapsible>
            <Collapsible trigger={<TreeFolder>lib</TreeFolder>}>
              <div className="flex flex-col gap-1 pl-[20px]">
                <TreeFile>utils.ts</TreeFile>
              </div>
            </Collapsible>
            <TreeFile>App.tsx</TreeFile>
          </div>
        </Collapsible>
        <div className="mt-1 flex flex-col gap-1">
          <TreeFile>package.json</TreeFile>
          <TreeFile>README.md</TreeFile>
        </div>
      </div>
    );
  },
});

function TreeFolder({ children, className, ...props }: Button.Props) {
  return (
    <Button {...props} variant="naked" className={cn(className, "w-full justify-start")}>
      <ChevronRightIcon />
      <FolderIcon size={16} />
      {children}
    </Button>
  );
}

function TreeFile({ children, className, ...props }: Button.Props) {
  return (
    <Button {...props} variant="naked" className={cn(className, "w-full justify-start")}>
      <FileIcon size={16} />
      {children}
    </Button>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex items-center gap-2">
      <p>カウント: {count}</p>
      <Button onClick={() => setCount((current) => current + 1)}>増やす</Button>
    </div>
  );
}
