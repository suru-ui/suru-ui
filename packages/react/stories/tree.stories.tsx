import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Tree } from "../src/tree/index.js";

const COLORS: readonly Tree.Color[] = theme.COLORS;
const SIZES: readonly Tree.Size[] = theme.SIZES;
const RADII: readonly Tree.Radius[] = ["none", ...SIZES, "full"];
const VARIANTS: readonly Tree.Variant[] = ["liquid", "solid"];

const meta = preview.meta({
  title: "Tree",
  component: Tree,
});

export default meta;

type FileNode = Tree.ItemObject;

const FILE_TREE: readonly FileNode[] = [
  {
    id: "src",
    label: "src",
    items: [
      {
        id: "components",
        label: "components",
        items: [
          {
            id: "button",
            label: "Button.tsx",
          },
          {
            id: "input",
            label: "Input.tsx",
          },
        ],
      },
      {
        id: "hooks",
        label: "hooks",
        items: [
          {
            id: "use-theme",
            label: "useTheme.ts",
          },
        ],
      },
      {
        id: "index",
        label: "index.ts",
      },
    ],
  },
  {
    id: "public",
    label: "public",
    disabled: true,
    items: [
      {
        id: "favicon",
        label: "favicon.ico",
      },
    ],
  },
  {
    id: "package",
    label: "package.json",
  },
];

const ctrl = controls(Tree, {
  color: {
    options: COLORS,
    control: "select",
  },
  muted: {
    control: "boolean",
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
  variant: {
    control: "select",
    options: VARIANTS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    size: "md",
    radius: undefined,
    muted: false,
    outlined: false,
    items: FILE_TREE,
    defaultExpandedValue: ["src"],
    className: "w-[240px]",
  }),
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    variant: "liquid",
    color: "grey",
    radius: undefined,
    muted: false,
    outlined: false,
    items: FILE_TREE,
    defaultExpandedValue: ["src"],
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size} className="w-[240px]">
            <p>{size}</p>
            <Tree {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});
