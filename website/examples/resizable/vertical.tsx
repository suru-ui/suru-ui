import { Resizable } from "@suru-ui/react";
import * as React from "react";

const panelStyle = {
  gap: "0.5rem",
  color: "var(--sui-canvas_text-2)",
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
} as const;

export default function ResizableVerticalExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "28rem",
        border: "1px solid var(--sui-border-1)",
        height: "20rem",
        maxWidth: "100%",
        overflow: "hidden",
        borderRadius: "0.75rem",
      }}
    >
      <Resizable style={{ height: "100%" }} orientation="vertical">
        <Resizable.Panel
          style={{
            ...panelStyle,
            backgroundColor: "var(--sui-canvas-2)",
          }}
          minSize={20}
          defaultSize={50}
        >
          <strong style={{ color: "var(--sui-canvas_text-1)" }}>上部パネル</strong>
          <span>上下の境界をドラッグして高さを変更できます。</span>
        </Resizable.Panel>
        <Resizable.Handle />
        <Resizable.Panel style={panelStyle} defaultSize={50}>
          <strong style={{ color: "var(--sui-canvas_text-1)" }}>下部パネル</strong>
          <span>縦方向のリサイズ操作を確認できます。</span>
        </Resizable.Panel>
      </Resizable>
    </div>
  );
}
