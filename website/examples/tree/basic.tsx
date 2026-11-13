import { Tree } from "@suru-ui/react";
import { FileIcon, FolderIcon } from "lucide-react";
import * as React from "react";

function label(icon: React.ReactNode, text: string): React.ReactNode {
  return (
    <span
      style={{
        gap: "0.375rem",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {icon}
      {text}
    </span>
  );
}

const items = [
  {
    id: "src",
    items: [
      {
        id: "components",
        items: [
          {
            id: "button",
            label: label(<FileIcon size={14} aria-hidden="true" />, "Button.tsx"),
          },
          {
            id: "input",
            label: label(<FileIcon size={14} aria-hidden="true" />, "Input.tsx"),
          },
        ],
        label: label(<FolderIcon size={14} aria-hidden="true" />, "components"),
      },
      {
        id: "index",
        label: label(<FileIcon size={14} aria-hidden="true" />, "index.ts"),
      },
    ],
    label: label(<FolderIcon size={14} aria-hidden="true" />, "src"),
  },
  {
    id: "public",
    items: [
      {
        id: "favicon",
        label: label(<FileIcon size={14} aria-hidden="true" />, "favicon.ico"),
      },
    ],
    label: label(<FolderIcon size={14} aria-hidden="true" />, "public"),
    disabled: true,
  },
  {
    id: "package",
    label: label(<FileIcon size={14} aria-hidden="true" />, "package.json"),
  },
];

export default function BasicTreeExample(): React.ReactNode {
  return (
    <Tree
      items={items}
      style={{ width: "17rem" }}
      defaultExpandedValue={["src", "components"]}
      aria-label="プロジェクトのファイル"
    />
  );
}
