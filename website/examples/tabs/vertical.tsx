import { Tabs } from "@suru-ui/react";
import * as React from "react";

const items = [
  {
    label: "概要",
    value: "overview",
    content: <p>概要を表示します。</p>,
  },
  {
    label: "プロジェクト",
    value: "projects",
    content: <p>プロジェクトを表示します。</p>,
  },
  {
    label: "アカウント",
    value: "account",
    content: <p>アカウントを表示します。</p>,
  },
];

export default function VerticalTabsExample(): React.ReactNode {
  return (
    <Tabs
      items={items}
      style={{ width: "20rem" }}
      variant="segments"
      orientation="vertical"
      defaultValue="overview"
    />
  );
}
