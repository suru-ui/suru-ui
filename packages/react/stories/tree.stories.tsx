import { SIZES } from "@suru-ui/theme";
import { FolderIcon } from "lucide-react";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Tree } from "../src/tree/index.js";

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
    children: [
      {
        id: "components",
        label: "components",
        children: [
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
        children: [
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
    children: [
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

const MEDIA_TREE: readonly FileNode[] = [
  {
    id: "documents",
    label: "Documents",
    children: [
      {
        id: "report",
        label: "report.pdf",
      },
      {
        id: "photo",
        label: "photo.png",
      },
    ],
  },
  {
    id: "music",
    label: "Music",
  },
];

const ctrl = controls(Tree, {
  items: {
    control: false,
  },
  radius: {
    control: "select",
    options: ["none", "sm", "md", "lg"],
  },
  selectionMode: {
    control: "select",
    options: ["none", "single", "multiple"],
  },
  size: {
    control: "select",
    options: SIZES,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    items: FILE_TREE,
    defaultExpandedValue: ["src"],
    radius: "md",
    selectionMode: "single",
    size: "md",
  }),
});

export const SelectionModes = meta.story({
  name: "選択モード",
  ...ctrl({
    items: FILE_TREE,
    defaultExpandedValue: ["src"],
    radius: "md",
    size: "md",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {(["none", "single", "multiple"] as const).map((selectionMode) => (
          <div key={selectionMode} className="w-80">
            <p>{`選択モード "${selectionMode}"`}</p>
            <Tree {...props} selectionMode={selectionMode} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    items: FILE_TREE,
    defaultExpandedValue: ["src"],
    radius: "md",
    selectionMode: "single",
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {SIZES.map((size) => (
          <div key={size} className="w-80">
            <p>{`サイズ "${size}"`}</p>
            <Tree {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const Keyboard = meta.story({
  name: "キーボード操作",
  ...ctrl({
    items: FILE_TREE,
    defaultExpandedValue: ["src", "components"],
    radius: "md",
    selectionMode: "single",
    size: "md",
  }),
  render(props) {
    return (
      <div className="w-80">
        <Tree {...props} />
        <p className="mt-2">
          上下で移動し、左右で折りたたみと展開を切り替え、` * ` ですべて展開します。
        </p>
      </div>
    );
  },
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    items: FILE_TREE,
    radius: "md",
    selectionMode: "multiple",
    size: "md",
  }),
  render(props) {
    const [value, setValue] = React.useState<readonly string[]>([]);
    const [expandedValue, setExpandedValue] = React.useState<readonly string[]>(["src"]);

    return (
      <div className="h-64 w-80 overflow-auto">
        <Tree
          {...props}
          value={value}
          expandedValue={expandedValue}
          onValueChange={setValue}
          onExpandedValueChange={setExpandedValue}
        />
        <p className="mt-2">選択: {value.length > 0 ? value.join(", ") : "なし"}</p>
      </div>
    );
  },
});

export const CustomParts = meta.story({
  name: "パーツの差し替え",
  ...ctrl({
    items: MEDIA_TREE,
    defaultExpandedValue: ["documents"],
    radius: "md",
    selectionMode: "single",
    size: "md",
  }),
  render(props) {
    return (
      <div className="h-64 w-80 overflow-auto">
        <Tree
          {...props}
          slotProps={{
            indicator: {
              children: <FolderIcon />,
            },
          }}
        />
      </div>
    );
  },
});
