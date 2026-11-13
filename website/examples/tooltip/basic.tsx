import { Button, Tooltip } from "@suru-ui/react";
import * as React from "react";

export default function BasicTooltipExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Tooltip delay={200} trigger={<Button>保存</Button>}>
        編集内容を保存します
      </Tooltip>
      <Tooltip delay={200} trigger={<Button variant="naked">共有</Button>}>
        リンクを共有します
      </Tooltip>
    </div>
  );
}
