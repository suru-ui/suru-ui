import { Tabs } from "@suru-ui/react";
import * as React from "react";

const items = [
  {
    label: "概要",
    value: "overview",
    content: <p>概要を表示します。</p>,
  },
  {
    label: "詳細",
    value: "details",
    content: <p>詳細を表示します。</p>,
  },
  {
    label: "履歴",
    value: "history",
    content: <p>変更履歴を表示します。</p>,
  },
];

export default function AppearanceTabsExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        width: "min(100%, 30rem)",
        display: "grid",
      }}
    >
      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.8125rem",
          }}
        >
          line
        </p>
        <Tabs items={items} variant="line" defaultValue="overview" />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.8125rem",
          }}
        >
          segments + solid
        </p>
        <Tabs items={items} variant="segments" defaultValue="overview" activeVariant="solid" />
      </div>
      <div>
        <p
          style={{
            margin: "0 0 0.5rem",
            fontSize: "0.8125rem",
          }}
        >
          segments + naked
        </p>
        <Tabs
          items={items}
          variant="segments"
          outlined={false}
          defaultValue="overview"
          activeVariant="naked"
        />
      </div>
    </div>
  );
}
