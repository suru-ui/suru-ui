import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Drawer } from "./index.js";

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
          トリガーをクリックすると、画面下端からドロワーが表示されます。
        </p>
      </div>
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
