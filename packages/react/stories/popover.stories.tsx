import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Button } from "../src/button/index.js";
import { Popover } from "../src/popover/index.js";
import * as PopoverParts from "../src/popover/index.js";

const meta = preview.meta({
  title: "Popover",
  component: Popover,
});

export default meta;

const ctrl = controls(Popover, {
  modal: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>ヘルプ</Button>}>
        <PopoverParts.Title>この項目について</PopoverParts.Title>
        <PopoverParts.Description>
          項目をダブルクリックすると編集できます。変更は自動的に保存されます。
        </PopoverParts.Description>
        <PopoverParts.Close>
          <Button>閉じる</Button>
        </PopoverParts.Close>
      </Popover>
    );
  },
});

export const Arrow = meta.story({
  name: "矢印",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover
        {...props}
        trigger={<Button>ヘルプ</Button>}
        slotProps={{
          arrow: {},
        }}
      >
        <PopoverParts.Description>矢印付きのポップオーバーです。</PopoverParts.Description>
      </Popover>
    );
  },
});

export const Positions = meta.story({
  name: "配置",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    const sides = ["top", "bottom", "left", "right"] as const;

    return (
      <div className="flex flex-wrap items-center gap-4">
        {sides.map((side) => (
          <Popover
            key={side}
            {...props}
            trigger={<Button variant="liquid">{side}</Button>}
            slotProps={{
              positioner: { side, sideOffset: 8 },
            }}
          >
            <PopoverParts.Description>{side} に表示されます。</PopoverParts.Description>
          </Popover>
        ))}
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({}),
  render() {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex items-center gap-4">
        <Popover open={open} trigger={<Button>詳細</Button>} onOpenChange={setOpen}>
          <PopoverParts.Description>外部の状態で開閉を制御できます。</PopoverParts.Description>
        </Popover>
        <Button onClick={() => setOpen((prev) => !prev)} variant="liquid">
          切り替える
        </Button>
      </div>
    );
  },
});

export const DisabledTrigger = meta.story({
  name: "無効なトリガー",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <div className="flex items-center gap-4">
        <Popover {...props} trigger={<Button disabled>開けない</Button>}>
          <PopoverParts.Description>この内容は表示されません。</PopoverParts.Description>
        </Popover>
        <Popover {...props} trigger={<Button>開ける</Button>}>
          <PopoverParts.Description>比較用の有効なトリガーです。</PopoverParts.Description>
        </Popover>
      </div>
    );
  },
});

export const Empty = meta.story({
  name: "空の内容",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>空を開く</Button>}>
        {null}
      </Popover>
    );
  },
});

export const LongContent = meta.story({
  name: "長い内容",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>長い説明を開く</Button>}>
        <PopoverParts.Title>利用履歴の詳細</PopoverParts.Title>
        <PopoverParts.Description>
          このポップオーバーは長い説明文でも読みやすい幅に収まります。文章が長くなった場合はポップアップの最大幅や最大高さの範囲で折り返しとスクロールが発生し、トリガーとの位置関係を保ったまま表示されます。
          このポップオーバーは長い説明文でも読みやすい幅に収まります。文章が長くなった場合はポップアップの最大幅や最大高さの範囲で折り返しとスクロールが発生し、トリガーとの位置関係を保ったまま表示されます。
        </PopoverParts.Description>
        <PopoverParts.Close>
          <Button variant="liquid">閉じる</Button>
        </PopoverParts.Close>
      </Popover>
    );
  },
});

export const Edge = meta.story({
  name: "画面端",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <div className="flex justify-between">
        <Popover
          {...props}
          trigger={<Button>左端</Button>}
          slotProps={{
            positioner: { side: "bottom", align: "start", sideOffset: 8 },
          }}
        >
          <PopoverParts.Description>
            画面の端でもはみ出さずに配置されます。
          </PopoverParts.Description>
        </Popover>
        <Popover
          {...props}
          trigger={<Button>右端</Button>}
          slotProps={{
            positioner: { side: "bottom", align: "end", sideOffset: 8 },
          }}
        >
          <PopoverParts.Description>
            画面の端でもはみ出さずに配置されます。
          </PopoverParts.Description>
        </Popover>
      </div>
    );
  },
});

export const UserMenu = meta.story({
  name: "組み合わせと実利用例",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover
        {...props}
        trigger={<Button>田中 太郎</Button>}
        slotProps={{
          arrow: {},
        }}
      >
        <PopoverParts.Title>アカウント</PopoverParts.Title>
        <PopoverParts.Description>
          tanaka@example.com としてログイン中です。
        </PopoverParts.Description>
        <div className="flex flex-col gap-2">
          <PopoverParts.Close>
            <Button variant="liquid">プロフィールを開く</Button>
          </PopoverParts.Close>
          <PopoverParts.Close>
            <Button variant="liquid">設定を開く</Button>
          </PopoverParts.Close>
          <PopoverParts.Close>
            <Button variant="liquid">ログアウト</Button>
          </PopoverParts.Close>
        </div>
      </Popover>
    );
  },
});

export const Accessible = meta.story({
  name: "アクセシビリティー",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>通知の設定</Button>}>
        <PopoverParts.Title>通知の設定</PopoverParts.Title>
        <PopoverParts.Description>
          見出しと説明文があるため、支援技術に内容の名前と説明が伝わります。
        </PopoverParts.Description>
        <PopoverParts.Close>
          <Button>閉じる</Button>
        </PopoverParts.Close>
      </Popover>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    modal: false,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2 text-sm">
        <p>Tab でトリガーに移動し、Enter か Space で開きます。Escape で閉じます。</p>
        <div>
          <Popover {...props} trigger={<Button>キーボードで開く</Button>}>
            <PopoverParts.Title>キーボードで操作できます</PopoverParts.Title>
            <PopoverParts.Description>
              開いた後は Tab で内容に移動し、Escape で閉じてトリガーに戻ります。
            </PopoverParts.Description>
            <PopoverParts.Close>
              <Button>閉じる</Button>
            </PopoverParts.Close>
          </Popover>
        </div>
      </div>
    );
  },
});
