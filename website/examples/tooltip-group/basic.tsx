import { Button, Tooltip, TooltipGroup } from "@suru-ui/react";
import * as React from "react";

export default function BasicTooltipGroupExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <p
        style={{
          color: "#666",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        最初は遅延後に表示され、閉じた直後に隣のツールチップを開くとすぐに表示されます。
      </p>
      <TooltipGroup delay={600} timeout={400} closeDelay={0}>
        <div
          style={{
            gap: "0.75rem",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Tooltip trigger={<Button>保存</Button>}>保存します</Tooltip>
          <Tooltip trigger={<Button>共有</Button>}>リンクを共有します</Tooltip>
          <Tooltip trigger={<Button>削除</Button>}>削除します</Tooltip>
        </div>
      </TooltipGroup>
    </div>
  );
}
