import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Tree } from "./index.js";

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
    items: [
      {
        id: "components",
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
        label: "components",
      },
      {
        id: "hooks",
        items: [
          {
            id: "use-theme",
            label: "useTheme.ts",
          },
        ],
        label: "hooks",
      },
      {
        id: "index",
        label: "index.ts",
      },
    ],
    label: "src",
  },
  {
    id: "public",
    items: [
      {
        id: "favicon",
        label: "favicon.ico",
      },
    ],
    label: "public",
    disabled: true,
  },
  {
    id: "package",
    label: "package.json",
  },
];

const ctrl = controls(Tree, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  muted: {
    control: "boolean",
  },
  radius: {
    control: "select",
    options: RADII,
  },
  variant: {
    control: "select",
    options: VARIANTS,
  },
  outlined: {
    control: "boolean",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    items: FILE_TREE,
    muted: false,
    radius: undefined,
    variant: "liquid",
    outlined: false,
    className: "w-[240px]",
    defaultExpandedValue: ["src"],
  }),
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "grey",
    items: FILE_TREE,
    muted: false,
    radius: undefined,
    variant: "liquid",
    outlined: false,
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
