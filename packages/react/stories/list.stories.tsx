import { SIZES } from "@suru-ui/theme";
import { BellIcon, FileIcon, CheckIcon, CircleIcon, FolderIcon } from "lucide-react";

import { preview, controls } from "../.config/storybook/preview.js";
import { List } from "../src/list/index.js";

const meta = preview.meta({
  title: "List",
  component: List,
});

export default meta;

const ctrl = controls(List, {
  ordered: {
    control: "boolean",
  },
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props}>
        <List.Item>最初の項目</List.Item>
        <List.Item>2 番目の項目</List.Item>
        <List.Item>3 番目の項目</List.Item>
      </List>
    );
  },
});

export const Items = meta.story({
  name: "項目の配列",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List
        {...props}
        items={[
          { content: "最初の項目" },
          { content: "2 番目の項目" },
          { content: "3 番目の項目" },
        ]}
      />
    );
  },
});

export const CustomRenderer = meta.story({
  name: "独自の描画",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props} items={["りんご", "ばなな", "みかん"]}>
        {(fruit, index) => (
          <List.Item key={index}>
            <List.Indicator>
              <CircleIcon />
            </List.Indicator>
            {fruit}
          </List.Item>
        )}
      </List>
    );
  },
});

export const WithIndicators = meta.story({
  name: "アイコン付き",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List
        {...props}
        items={[
          { content: "ドキュメント", indicator: <FolderIcon /> },
          { content: "報告書.pdf", indicator: <FileIcon /> },
          { content: "下書き", indicator: <CircleIcon /> },
        ]}
      />
    );
  },
});

export const SlotProps = meta.story({
  name: "スロットの一括指定",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List
        {...props}
        items={[{ content: "最初の項目" }, { content: "2 番目の項目", disabled: true }]}
        slotProps={{ item: { lang: "ja" } }}
      />
    );
  },
});

export const Ordered = meta.story({
  name: "順序付きリスト",
  ...ctrl({
    size: "md",
  }),
  render(props) {
    return (
      <List {...props} ordered>
        <List.Item>注文を受け付ける</List.Item>
        <List.Item>商品を発送する</List.Item>
        <List.Item>配達を完了する</List.Item>
      </List>
    );
  },
});

export const Nested = meta.story({
  name: "入れ子",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props}>
        <List.Item>果物</List.Item>
        <List.Item>
          野菜
          <List {...props}>
            <List.Item>にんじん</List.Item>
            <List.Item>だいこん</List.Item>
          </List>
        </List.Item>
        <List.Item>穀物</List.Item>
      </List>
    );
  },
});

export const Disabled = meta.story({
  name: "無効な項目",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props}>
        <List.Item>選択可能な項目</List.Item>
        <List.Item disabled>選択不可の項目</List.Item>
        <List.Item>選択可能な項目</List.Item>
      </List>
    );
  },
});

export const Empty = meta.story({
  name: "空のリスト",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return <List {...props} items={[]} />;
  },
});

export const LongText = meta.story({
  name: "長いテキスト",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <div className="max-w-64">
        <List {...props}>
          <List.Item>
            とても長い項目のテキストが折り返されても先頭位置が揃ったまま読みやすく表示されることを確認します
          </List.Item>
          <List.Item>
            <List.Indicator>
              <FileIcon />
            </List.Indicator>
            アイコン付きの長い項目も同じように折り返され、2
            行目以降がアイコンの下に回り込まずに揃うことを確認します
          </List.Item>
        </List>
      </div>
    );
  },
});

export const ComplexData = meta.story({
  name: "複雑なデータ",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    const notifications = [
      { id: "n1", title: "コメントがあります", read: false },
      { id: "n2", title: "レビューを承認しました", read: true },
      { id: "n3", title: "新しいフォロワー", read: false },
    ];

    return (
      <List {...props} items={notifications}>
        {(notification) => (
          <List.Item key={notification.id} disabled={notification.read}>
            <List.Indicator>{notification.read ? <CheckIcon /> : <BellIcon />}</List.Indicator>
            {notification.title}
          </List.Item>
        )}
      </List>
    );
  },
});

export const Notifications = meta.story({
  name: "通知一覧",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <section className="flex max-w-80 flex-col gap-2" aria-label="通知">
        <h2 className="text-sm font-bold">通知</h2>
        <List
          {...props}
          items={[
            { content: "田中さんがコメントしました", indicator: <BellIcon /> },
            { content: "請求書の支払期限が近づいています", indicator: <FileIcon /> },
            { content: "同期が完了しました", indicator: <CheckIcon />, disabled: true },
          ]}
        />
      </section>
    );
  },
});

export const Labeled = meta.story({
  name: "ラベル付き",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props} aria-label="買い物リスト">
        <List.Item>牛乳</List.Item>
        <List.Item>卵</List.Item>
        <List.Item>食パン</List.Item>
      </List>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    ordered: false,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span>{size}</span>
            <List {...props} size={size}>
              <List.Item>最初の項目</List.Item>
              <List.Item>2 番目の項目</List.Item>
              <List.Item>3 番目の項目</List.Item>
            </List>
          </div>
        ))}
      </div>
    );
  },
});
