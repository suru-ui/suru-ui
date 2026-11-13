import { Tree } from "@suru-ui/react";
import * as React from "react";

const items = [
  {
    id: "src",
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
    label: "src",
  },
  {
    id: "package",
    label: "package.json",
  },
];

export default function AppearanceTreeExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "17rem",
        display: "grid",
      }}
    >
      <Tree
        color="blue"
        items={items}
        variant="liquid"
        defaultValue={["button"]}
        defaultExpandedValue={["src"]}
        aria-label="liquid のツリー"
      />
      <Tree
        color="blue"
        items={items}
        variant="solid"
        defaultValue={["button"]}
        defaultExpandedValue={["src"]}
        aria-label="solid のツリー"
      />
      <Tree
        items={items}
        muted
        outlined={false}
        defaultExpandedValue={["src"]}
        aria-label="控えめなツリー"
      />
    </div>
  );
}
