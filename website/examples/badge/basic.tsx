import { Badge } from "@suru-ui/react";
import { BellIcon } from "lucide-react";
import * as React from "react";

export default function BasicBadgeExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <BellIcon aria-hidden="true" />
        通知
        <Badge color="red">3</Badge>
      </span>
      <span
        style={{
          gap: "0.5rem",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        未読
        <Badge color="blue" variant="dot" aria-label="未読の通知があります" />
      </span>
      <Badge color="green" variant="standard">
        対応済み
      </Badge>
    </div>
  );
}
