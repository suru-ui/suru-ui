import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Button } from "../button/index.js";
import { Popover } from "./index.js";
import * as PopoverParts from "./index.js";

const SIZES: readonly Popover.Size[] = theme.SIZES;
const RADII: readonly Popover.Radius[] = ["none", ...theme.SIZES];

const meta = preview.meta({
  title: "Popover",
  component: Popover,
});

export default meta;

const ctrl = controls(Popover, {
  size: {
    control: "select",
    options: SIZES,
  },
  modal: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-start gap-4">
        {SIZES.map((size) => (
          <Popover
            key={size}
            {...props}
            size={size}
            trigger={<Button variant="liquid">{size}</Button>}
          >
            <PopoverParts.Title>大きさ {size}</PopoverParts.Title>
            <PopoverParts.Description>サイズごとの幅と余白を確認します。</PopoverParts.Description>
          </Popover>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線と角丸",
  ...ctrl({
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap items-start gap-4">
        <Popover {...props} trigger={<Button variant="liquid">標準</Button>}>
          <PopoverParts.Title>枠線なし</PopoverParts.Title>
          <PopoverParts.Description>背景色だけで内容を区切ります。</PopoverParts.Description>
        </Popover>
        <Popover {...props} trigger={<Button variant="liquid">枠線あり</Button>} outlined>
          <PopoverParts.Title>枠線あり</PopoverParts.Title>
          <PopoverParts.Description>背景との境界を明確にします。</PopoverParts.Description>
        </Popover>
        {RADII.map((radius) => (
          <Popover
            key={radius}
            {...props}
            radius={radius}
            trigger={<Button variant="liquid">{radius}</Button>}
            outlined
          >
            <PopoverParts.Description>
              角丸 {radius} のポップオーバーです。
            </PopoverParts.Description>
          </Popover>
        ))}
      </div>
    );
  },
});

export const Positions = meta.story({
  name: "配置",
  ...ctrl({
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
              arrow: {},
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
  }),
  render(props) {
    return (
      <Popover {...props} trigger={<Button>長い説明を開く</Button>}>
        <PopoverParts.Title>利用履歴の詳細</PopoverParts.Title>
        <PopoverParts.Description>
          このポップオーバーは長い説明文でも読みやすい幅に収まります。文章が長くなった場合も最大幅の範囲で折り返し、トリガーとの位置関係を保ったまま表示されます。
          このポップオーバーは長い説明文でも読みやすい幅に収まります。文章が長くなった場合も最大幅の範囲で折り返し、トリガーとの位置関係を保ったまま表示されます。
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
    size: "md",
    modal: false,
    radius: undefined,
    outlined: false,
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
