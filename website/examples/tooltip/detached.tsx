import { Button, Tooltip } from "@suru-ui/react";
import * as React from "react";

export default function DetachedTooltipExample(): React.ReactNode {
  const [handle] = React.useState(() => Tooltip.createHandle());

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Tooltip.Trigger delay={200} handle={handle}>
        <Button color="red">削除</Button>
      </Tooltip.Trigger>
      <Tooltip delay={200} handle={handle}>
        この操作は元に戻せません
      </Tooltip>
    </div>
  );
}
