import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../../src/buttons/button/index.js";
import { Drawer } from "../../src/overlays/drawer/index.js";
import * as DrawerParts from "../../src/overlays/drawer/index.js";

const meta = preview.meta({
  title: "Overlays / Drawer",
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
          trigger={<Button>通知を見る</Button>}
          title="通知"
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
        <DrawerParts.Trigger handle={handle}>通知を見る</DrawerParts.Trigger>
        <DrawerParts.Portal>
          <DrawerParts.Backdrop />
          <DrawerParts.Viewport>
            <DrawerParts.Popup>
              <DrawerParts.Content>
                <DrawerParts.Title>通知</DrawerParts.Title>
                <DrawerParts.Description>新しい通知はありません。</DrawerParts.Description>
                <DrawerParts.Close>閉じる</DrawerParts.Close>
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
        <Drawer open={open} onOpenChange={setOpen} title="制御されたドロワー">
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
        trigger={<Button>設定を開く</Button>}
        swipeDirection="right"
        title="設定"
        description="右側から表示されるドロワーです。"
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
            trigger={<Button>{label}から表示</Button>}
            swipeDirection={direction}
            title={`${label}から表示`}
            description={`${label}端から表示されるドロワーです。`}
          />
        ))}
      </div>
    );
  },
});
