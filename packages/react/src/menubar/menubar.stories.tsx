import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Menubar } from "./index.js";

const ORIENTATIONS: readonly Menubar.Orientation[] = ["horizontal", "vertical"];

const meta = preview.meta({
  title: "Menubar",
  component: Menubar<Menubar.ItemObject>,
});

export default meta;

const ctrl = controls(Menubar<Menubar.ItemObject>, {
  loopFocus: {
    control: "boolean",
  },
  orientation: {
    control: "select",
    options: ORIENTATIONS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: [
      {
        items: [
          {
            items: [
              {
                label: "新規作成",
              },
              {
                label: "開く",
              },
            ],
          },
          {
            label: "閉じる",
          },
        ],
        trigger: <Button variant="naked">ファイル</Button>,
      },
      {
        items: [
          {
            label: "切り取り",
          },
          {
            label: "コピー",
          },
          {
            label: "貼り付け",
          },
        ],
        trigger: <Button variant="naked">編集</Button>,
      },
      {
        items: [
          {
            label: "拡大",
          },
          {
            label: "縮小",
          },
        ],
        trigger: <Button variant="naked">表示</Button>,
      },
    ],
    loopFocus: true,
    orientation: "horizontal",
  }),
});
