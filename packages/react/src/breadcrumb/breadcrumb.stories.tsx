import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import {
  Item as BreadcrumbPartsItem,
  Link as BreadcrumbPartsLink,
  List as BreadcrumbPartsList,
  Root as BreadcrumbPartsRoot,
  Separator as BreadcrumbPartsSeparator,
  Breadcrumb,
} from "./index.js";

const COLORS: readonly Breadcrumb.Color[] = theme.COLORS;
const SIZES: readonly Breadcrumb.Size[] = theme.SIZES;

const items = [
  { href: "#", label: "ホーム" },
  { href: "#", label: "製品" },
  { href: "#", label: "Suru UI" },
  { label: "パンくずリスト" },
];

const collapsedItems = [
  { href: "#", label: "ホーム" },
  { href: "#", label: "製品" },
  { href: "#", label: "ライブラリ" },
  { href: "#", label: "コンポーネント" },
  { href: "#", label: "Breadcrumb" },
  { label: "省略表示" },
];

const meta = preview.meta({
  title: "Breadcrumb",
  component: Breadcrumb,
});

export default meta;

const ctrl = controls(Breadcrumb, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  maxItems: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    items,
  }),
  render(props) {
    return <Breadcrumb {...props} />;
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    color: "grey",
    items,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-start gap-1">
            <span>{color}</span>
            <Breadcrumb {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    size: "md",
    color: "grey",
    items,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-6">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-start gap-3">
            <span>{size}</span>
            <Breadcrumb {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効なリンク",
  ...ctrl({
    size: "md",
    color: "grey",
    items,
  }),
  render(props) {
    return (
      <Breadcrumb
        {...props}
        items={[
          { href: "#", label: "ホーム" },
          { href: "#", label: "製品", disabled: true },
          { label: "パンくずリスト" },
        ]}
      />
    );
  },
});

export const Collapsed = meta.story({
  name: "省略表示",
  ...ctrl({
    size: "md",
    color: "grey",
    items: collapsedItems,
    maxItems: 4,
  }),
  render(props) {
    return <Breadcrumb {...props} />;
  },
});

export const Parts = meta.story({
  name: "パーツで組み立てる",
  ...ctrl({
    size: "md",
    color: "grey",
    items,
  }),
  render(props) {
    const { size, color } = props;

    return (
      <BreadcrumbPartsRoot size={size} color={color}>
        <BreadcrumbPartsList>
          <BreadcrumbPartsItem>
            <BreadcrumbPartsLink href="#">ホーム</BreadcrumbPartsLink>
          </BreadcrumbPartsItem>
          <BreadcrumbPartsSeparator>／</BreadcrumbPartsSeparator>
          <BreadcrumbPartsItem>
            <BreadcrumbPartsLink href="#">製品</BreadcrumbPartsLink>
          </BreadcrumbPartsItem>
          <BreadcrumbPartsSeparator>／</BreadcrumbPartsSeparator>
          <BreadcrumbPartsItem>
            <BreadcrumbPartsLink current>Suru UI</BreadcrumbPartsLink>
          </BreadcrumbPartsItem>
        </BreadcrumbPartsList>
      </BreadcrumbPartsRoot>
    );
  },
});
