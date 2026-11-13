import { ScrollArea } from "@suru-ui/react";
import * as React from "react";

const PARAGRAPHS = Array.from({ length: 8 }, (_, index) => (
  <p
    key={index}
    style={{
      color: "var(--sui-canvas_text-2)",
      margin: 0,
      lineHeight: 1.7,
    }}
  >
    {index + 1}.
    スクロール領域はネイティブのスクロール操作を保ちながら、細いスクロールバーを表示します。キーボードやタッチ操作にも対応します。
  </p>
));

export default function BasicScrollAreaExample(): React.ReactNode {
  return (
    <ScrollArea
      style={{
        width: "22rem",
        border: "1px solid var(--sui-border-1)",
        height: "16rem",
        maxWidth: "100%",
        borderRadius: "0.75rem",
        backgroundColor: "var(--sui-canvas-1)",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
          padding: "1rem",
        }}
      >
        {PARAGRAPHS}
      </div>
    </ScrollArea>
  );
}
