import { Tabs } from "@suru-ui/react";
import * as React from "react";

const panelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "0.875rem",
  lineHeight: 1.7,
};

const items = [
  {
    label: "概要",
    value: "overview",
    content: <p style={panelStyle}>ワークスペースの概要と最近のアクティビティを表示します。</p>,
  },
  {
    label: "プロジェクト",
    value: "projects",
    content: <p style={panelStyle}>プロジェクトの進捗と期限を表示します。</p>,
  },
  {
    label: "アカウント",
    value: "account",
    content: <p style={panelStyle}>プロフィールと通知の設定を表示します。</p>,
  },
];

export default function BasicTabsExample(): React.ReactNode {
  return (
    <Tabs
      items={items}
      style={{ width: "min(100%, 30rem)" }}
      slotProps={{ panel: { style: { paddingTop: "0.75rem" } } }}
      defaultValue="overview"
    />
  );
}
