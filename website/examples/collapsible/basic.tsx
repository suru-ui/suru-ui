import { Button, Collapsible } from "@suru-ui/react";
import * as React from "react";

export default function BasicCollapsibleExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "22rem",
        border: "1px solid #d4d4d4",
        padding: "0.5rem 0.75rem",
        borderRadius: "0.75rem",
      }}
    >
      <Collapsible
        trigger={
          <Button
            style={{
              width: "100%",
              justifyContent: "space-between",
            }}
            variant="naked"
          >
            Suru UI とは
            <Collapsible.Indicator />
          </Button>
        }
        slotProps={{
          content: {
            style: {
              fontSize: "0.875rem",
              lineHeight: 1.7,
              paddingBlock: "0.5rem",
            },
          },
        }}
      >
        Suru UI は、Base UI を基盤とした React
        コンポーネントライブラリーです。アクセシビリティーを保ちながら、一貫した外観を提供します。
      </Collapsible>
    </div>
  );
}
