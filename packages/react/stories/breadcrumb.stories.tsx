import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import {
  Item as BreadcrumbPartsItem,
  Link as BreadcrumbPartsLink,
  List as BreadcrumbPartsList,
  Root as BreadcrumbPartsRoot,
  Separator as BreadcrumbPartsSeparator,
  Breadcrumb,
} from "../src/breadcrumb/index.js";

const items = [
  { label: "ホーム", href: "#" },
  { label: "製品", href: "#" },
  { label: "Suru UI", href: "#" },
  { label: "パンくずリスト" },
];

const meta = preview.meta({
  title: "Navigation / Breadcrumb",
  component: Breadcrumb,
});

export default meta;

const ctrl = controls(Breadcrumb, {
  color: {
    options: COLORS,
    control: "select",
  },
  size: {
    options: SIZES,
    control: "select",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    color: "grey",
    size: "md",
    items,
  }),
  render(props) {
    return <Breadcrumb {...props} />;
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    color: "grey",
    size: "md",
    items,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
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
    color: "grey",
    size: "md",
    items,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-start gap-1">
            <span>{size}</span>
            <Breadcrumb {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Parts = meta.story({
  name: "パーツで組み立てる",
  ...ctrl({
    color: "grey",
    size: "md",
    items,
  }),
  render(props) {
    const { color, size } = props;

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
