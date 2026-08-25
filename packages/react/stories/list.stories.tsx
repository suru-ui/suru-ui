import { SIZES } from "@suru-ui/theme";
import { FileIcon, CircleIcon, FolderIcon } from "lucide-react";

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

export const WithIndicators = meta.story({
  name: "アイコン付き",
  ...ctrl({
    size: "md",
    ordered: false,
  }),
  render(props) {
    return (
      <List {...props}>
        <List.Item>
          <List.Indicator>
            <FolderIcon />
          </List.Indicator>
          ドキュメント
        </List.Item>
        <List.Item>
          <List.Indicator>
            <FileIcon />
          </List.Indicator>
          報告書.pdf
        </List.Item>
        <List.Item>
          <List.Indicator>
            <CircleIcon />
          </List.Indicator>
          下書き
        </List.Item>
      </List>
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
