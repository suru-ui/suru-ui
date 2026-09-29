import * as theme from "@suru-ui/theme";
import { ChevronRightIcon } from "lucide-react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Badge } from "../src/badge/index.js";
import { Button } from "../src/button/index.js";
import {
  Card,
  Root as CardPartsRoot,
  Title as CardPartsTitle,
  Action as CardPartsAction,
  Footer as CardPartsFooter,
  Header as CardPartsHeader,
  Content as CardPartsContent,
  Description as CardPartsDescription,
} from "../src/card/index.js";
import { Image } from "../src/image/index.js";

const RADII: readonly Card.Radius[] = ["none", ...theme.SIZES];
const SIZES: readonly Card.Size[] = theme.SIZES;

const LANDSCAPE_IMAGE = "https://picsum.photos/seed/suru-card/640/320";

const meta = preview.meta({
  title: "Card",
  component: Card,
});

export default meta;

const ctrl = controls(Card, {
  action: {
    control: false,
  },
  children: {
    control: "text",
  },
  description: {
    control: "text",
  },
  footer: {
    control: false,
  },
  outlined: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  size: {
    control: "select",
    options: SIZES,
  },
  title: {
    control: "text",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    title: "アカウントを作成",
    description: "メールアドレスを入力してアカウントを作成します。",
    children: "アカウントを作成すると、保存した設定がすべての端末で同期されます。",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-[420px]">
        <Card
          {...props}
          footer={
            <Button color="grey" size={props.size}>
              アカウントを作成
            </Button>
          }
        />
      </div>
    );
  },
});

export const WithAction = meta.story({
  name: "操作付き",
  ...ctrl({
    title: "定期レポート",
    description: "毎週のスナップショットを自動で共有します。",
    children: "スケジュールを選び、共有先のチャンネルやメンバーを指定してください。",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-[420px]">
        <Card
          {...props}
          action={
            <Button size="sm" variant="naked" aria-label="設定を開く">
              <ChevronRightIcon />
            </Button>
          }
          footer={
            <>
              <Button size={props.size} variant="naked">
                閉じる
              </Button>
              <Button size={props.size}>設定する</Button>
            </>
          }
        />
      </div>
    );
  },
});

export const WithImage = meta.story({
  name: "画像付き",
  ...ctrl({
    title: "デザインシステム勉強会",
    description: "コンポーネント API とアクセシビリティの実践的な話です。",
    children: "登壇者は後日発表します。",
    size: "md",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="w-[420px]">
        <CardPartsRoot size={props.size} radius={props.radius} outlined={props.outlined}>
          <Image
            alt="イベントのカバー画像"
            fit="cover"
            src={LANDSCAPE_IMAGE}
            style={{ width: "100%", height: 180 }}
          />
          <CardPartsHeader>
            <CardPartsTitle>{props.title}</CardPartsTitle>
            <CardPartsDescription>{props.description}</CardPartsDescription>
            <CardPartsAction>
              <Badge color="blue">おすすめ</Badge>
            </CardPartsAction>
          </CardPartsHeader>
          <CardPartsContent>{props.children}</CardPartsContent>
          <CardPartsFooter>
            <Button size={props.size}>イベントを見る</Button>
          </CardPartsFooter>
        </CardPartsRoot>
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    title: "定期レポート",
    description: "毎週のスナップショットを自動で共有します。",
    children: "スケジュールを選び、共有先のチャンネルやメンバーを指定してください。",
    radius: undefined,
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[420px] flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-start gap-1">
            <span>{size}</span>
            <Card {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    title: "定期レポート",
    description: "毎週のスナップショットを自動で共有します。",
    children: "スケジュールを選び、共有先のチャンネルやメンバーを指定してください。",
    size: "md",
    outlined: true,
  }),
  render(props) {
    return (
      <div className="flex w-[420px] flex-col gap-4">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-start gap-1">
            <span>{radius}</span>
            <Card {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Outlined = meta.story({
  name: "枠線",
  ...ctrl({
    title: "枠線付き",
    description: "既定では枠線を表示しません。",
    children: "枠線なしのカードは背景色だけで境界を表現しません。",
    size: "md",
    radius: undefined,
  }),
  render(props) {
    return (
      <div className="flex w-[420px] flex-col gap-4">
        <Card {...props} outlined />
        <Card {...props} title="枠線なし" outlined={false} />
      </div>
    );
  },
});

export const Composition = meta.story({
  name: "合成",
  render() {
    return (
      <CardPartsRoot className="w-[420px]">
        <CardPartsHeader>
          <CardPartsTitle>パーツを組み合わせる</CardPartsTitle>
          <CardPartsDescription>ヘッダーや本文を自由に配置できます。</CardPartsDescription>
          <CardPartsAction>
            <Badge color="green">新着</Badge>
          </CardPartsAction>
        </CardPartsHeader>
        <CardPartsContent>
          <p className="m-0">タイトルや説明を省いて、本文だけを表示することもできます。</p>
        </CardPartsContent>
        <CardPartsFooter>
          <Button variant="liquid">あとで</Button>
          <Button>確認する</Button>
        </CardPartsFooter>
      </CardPartsRoot>
    );
  },
});
