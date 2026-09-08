import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Avatar } from "../src/avatar/index.js";
import { Button } from "../src/button/index.js";
import { HoverCard } from "../src/hover-card/index.js";
import * as HoverCardParts from "../src/hover-card/index.js";

const meta = preview.meta({
  title: "HoverCard",
  component: HoverCard,
});

export default meta;

const ctrl = controls(HoverCard, {
  delay: {
    control: "number",
  },
  closeDelay: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    delay: 600,
    closeDelay: 300,
  }),
  render(props) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span>詳しくは</span>
        <HoverCard {...props} trigger={<a href="#terms">利用規約</a>}>
          利用規約の概要を確認できます。原文を読むにはリンクを開きます。
        </HoverCard>
        <span>を確認します。</span>
      </div>
    );
  },
});

export const Arrow = meta.story({
  name: "矢印",
  ...ctrl({
    delay: 0,
    closeDelay: 300,
  }),
  render(props) {
    return (
      <HoverCard
        {...props}
        trigger={<Button>ヘルプ</Button>}
        slotProps={{
          arrow: {},
        }}
      >
        矢印付きのホバーカードです。トリガーとの対応関係を示します。
      </HoverCard>
    );
  },
});

export const Positions = meta.story({
  name: "配置",
  ...ctrl({
    delay: 0,
    closeDelay: 300,
  }),
  render(props) {
    const sides = ["top", "bottom", "left", "right"] as const;

    return (
      <div className="flex flex-wrap items-center gap-4">
        {sides.map((side) => (
          <HoverCard
            key={side}
            {...props}
            trigger={<Button variant="liquid">{side}</Button>}
            slotProps={{
              positioner: { side, sideOffset: 8 },
            }}
          >
            {side} に表示されます。
          </HoverCard>
        ))}
      </div>
    );
  },
});

export const ProfileCard = meta.story({
  name: "プロフィールカード",
  ...ctrl({
    delay: 300,
    closeDelay: 300,
  }),
  render(props) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span>作成者:</span>
        <HoverCard {...props} trigger={<a href="#tanaka">田中 太郎</a>}>
          <div className="flex items-start gap-3">
            <Avatar size="lg" color="blue" radius="full">
              田
            </Avatar>
            <div className="flex flex-col gap-1">
              <span className="font-bold">田中 太郎</span>
              <span className="text-neutral-500">フロントエンドエンジニア</span>
              <span className="text-neutral-500">フォロワー 1,234 人</span>
              <Button variant="liquid">フォローする</Button>
            </div>
          </div>
        </HoverCard>
      </div>
    );
  },
});

type Member = {
  id: string;
  name: string;
  role: string;
};

const MEMBERS: readonly Member[] = [
  { id: "tanaka", name: "田中 太郎", role: "フロントエンドエンジニア" },
  { id: "suzuki", name: "鈴木 花子", role: "デザイナー" },
  { id: "sato", name: "佐藤 次郎", role: "バックエンドエンジニア" },
];

export const SharedPayload = meta.story({
  name: "共有とペイロード",
  ...ctrl({}),
  render() {
    const handle = HoverCardParts.createHandle<Member>();

    return (
      <div className="flex items-center gap-2 text-sm">
        <span>担当:</span>
        {MEMBERS.map((member) => (
          <HoverCardParts.Trigger key={member.id} delay={200} handle={handle} payload={member}>
            <a href={`#${member.id}`}>{member.name}</a>
          </HoverCardParts.Trigger>
        ))}
        <HoverCardParts.Root handle={handle}>
          {({ payload }) => (
            <HoverCardParts.Portal>
              <HoverCardParts.Positioner side="bottom" align="start" sideOffset={8}>
                <HoverCardParts.Content>
                  <HoverCardParts.Viewport>
                    {payload ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-bold">{payload.name}</span>
                        <span className="text-neutral-500">{payload.role}</span>
                      </div>
                    ) : null}
                  </HoverCardParts.Viewport>
                </HoverCardParts.Content>
              </HoverCardParts.Positioner>
            </HoverCardParts.Portal>
          )}
        </HoverCardParts.Root>
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
        <HoverCard
          open={open}
          delay={0}
          trigger={<Button>詳細</Button>}
          closeDelay={300}
          onOpenChange={setOpen}
        >
          外部の状態で開閉を制御できます。
        </HoverCard>
        <Button onClick={() => setOpen((prev) => !prev)} variant="liquid">
          切り替える
        </Button>
      </div>
    );
  },
});

export const Delays = meta.story({
  name: "遅延の比較",
  ...ctrl({}),
  render() {
    return (
      <div className="flex items-center gap-4">
        <HoverCard delay={0} trigger={<Button>すぐ開く</Button>} closeDelay={300}>
          遅延なしで開きます。
        </HoverCard>
        <HoverCard delay={1200} trigger={<Button variant="liquid">ゆっくり開く</Button>}>
          1.2 秒の遅延の後に開きます。誤って触れただけでは開きません。
        </HoverCard>
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツ",
  ...ctrl({}),
  render() {
    const handle = HoverCardParts.createHandle();

    return (
      <HoverCardParts.Root handle={handle}>
        <HoverCardParts.Trigger delay={0} handle={handle}>
          <Button>詳細</Button>
        </HoverCardParts.Trigger>
        <HoverCardParts.Portal>
          <HoverCardParts.Backdrop />
          <HoverCardParts.Positioner side="bottom" align="start" sideOffset={8}>
            <HoverCardParts.Content>
              <HoverCardParts.Arrow />
              ここに内容を表示します。
            </HoverCardParts.Content>
          </HoverCardParts.Positioner>
        </HoverCardParts.Portal>
      </HoverCardParts.Root>
    );
  },
});
