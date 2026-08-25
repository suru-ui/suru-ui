import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Drawer } from "../src/drawer/index.js";
import * as DrawerParts from "../src/drawer/index.js";

const meta = preview.meta({
  title: "Drawer",
  component: Drawer,
});

export default meta;

const ctrl = controls(Drawer, {});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({}),
  render() {
    return (
      <div className="flex flex-col items-center gap-4">
        <Drawer
          title="通知"
          trigger={<Button>通知を見る</Button>}
          description="新しい通知はありません。"
        />
        <p className="text-sm text-neutral-500">
          トリガーをクリックすると、画面左端からドロワーが表示されます。
        </p>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    const handle = DrawerParts.createHandle();

    return (
      <DrawerParts.Root handle={handle}>
        <DrawerParts.Trigger handle={handle}>
          <Button>通知を見る</Button>
        </DrawerParts.Trigger>
        <DrawerParts.Portal>
          <DrawerParts.Backdrop />
          <DrawerParts.Viewport>
            <DrawerParts.Popup>
              <DrawerParts.Content>
                <DrawerParts.Title>通知</DrawerParts.Title>
                <DrawerParts.Description>新しい通知はありません。</DrawerParts.Description>
                <DrawerParts.Close>
                  <Button>閉じる</Button>
                </DrawerParts.Close>
              </DrawerParts.Content>
            </DrawerParts.Popup>
          </DrawerParts.Viewport>
        </DrawerParts.Portal>
      </DrawerParts.Root>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({}),
  render() {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Drawer open={open} title="制御されたドロワー" onOpenChange={setOpen}>
          <p className="text-sm text-neutral-500">`open` と `onOpenChange` で制御できます。</p>
        </Drawer>
        <Button onClick={() => setOpen(true)}>開く</Button>
      </>
    );
  },
});

export const Right = meta.story({
  name: "右から表示",
  ...ctrl({}),
  render() {
    return (
      <Drawer
        title="設定"
        trigger={<Button>設定を開く</Button>}
        description="右側から表示されるドロワーです。"
        swipeDirection="right"
      />
    );
  },
});

export const Directions = meta.story({
  name: "表示方向",
  ...ctrl({}),
  render() {
    const directions = [
      ["left", "左"],
      ["right", "右"],
      ["up", "上"],
      ["down", "下"],
    ] as const;

    return (
      <div className="flex flex-wrap gap-4">
        {directions.map(([direction, label]) => (
          <Drawer
            key={direction}
            title={`${label}から表示`}
            trigger={<Button>{label}から表示</Button>}
            description={`${label}端から表示されるドロワーです。`}
            swipeDirection={direction}
          />
        ))}
      </div>
    );
  },
});
