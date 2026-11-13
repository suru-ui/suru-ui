import { Button } from "@suru-ui/react";
import { EllipsisIcon } from "lucide-react";
import * as React from "react";

export default function WidthButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        width: "360px",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <Button color="blue" style={{ width: "100%" }}>
        width: 100%
      </Button>
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
        }}
      >
        <Button color="blue" style={{ flex: 1 }}>
          flex: 1
        </Button>
        <Button squared aria-label="その他の操作">
          <EllipsisIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
