import { ScrollArea } from "@suru-ui/react";
import * as React from "react";

export default function ScrollAreaAlwaysShowExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        width: "22rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <ScrollArea
        style={{
          border: "1px solid var(--sui-border-1)",
          height: "8rem",
          borderRadius: "0.75rem",
          backgroundColor: "var(--sui-canvas-1)",
        }}
        alwaysShowScrollbar
      >
        <div
          style={{
            gap: "0.5rem",
            display: "grid",
            padding: "1rem",
          }}
        >
          <p style={{ margin: 0 }}>短い内容でもスクロールバーを表示します。</p>
          <p
            style={{
              color: "var(--sui-canvas_text-2)",
              margin: 0,
            }}
          >
            スクロール領域をホバーしていない状態でも、バーの位置を確認できます。
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
