import { Menu, Button } from "@suru-ui/react";
import { SaveIcon, Trash2Icon, FilePlusIcon, FolderOpenIcon } from "lucide-react";
import * as React from "react";

const ITEMS: Menu.ItemObject[] = [
  {
    label: (
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <FilePlusIcon size={16} aria-hidden="true" />
        新規作成
      </span>
    ),
  },
  {
    label: (
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <FolderOpenIcon size={16} aria-hidden="true" />
        開く
      </span>
    ),
  },
  {
    label: (
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <SaveIcon size={16} aria-hidden="true" />
        保存
      </span>
    ),
  },
  {
    color: "red",
    label: (
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Trash2Icon size={16} aria-hidden="true" />
        削除
      </span>
    ),
  },
];

export default function BasicMenuExample(): React.ReactNode {
  return <Menu items={ITEMS} trigger={<Button>ファイル</Button>} />;
}
