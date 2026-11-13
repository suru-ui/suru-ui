import { Skeleton } from "@suru-ui/react";
import * as React from "react";

export default function SkeletonOverlayExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "20rem",
        border: "1px solid var(--sui-border-1)",
        padding: "1.25rem",
        maxWidth: "100%",
        position: "relative",
        borderRadius: "0.75rem",
        backgroundColor: "var(--sui-canvas-1)",
      }}
    >
      <div
        style={{
          gap: "0.5rem",
          color: "var(--sui-canvas_text-2)",
          display: "grid",
        }}
      >
        <strong style={{ color: "var(--sui-canvas_text-1)" }}>読み込み済みの内容</strong>
        <span style={{ fontSize: "0.875rem" }}>
          コンテンツを残したまま、スケルトンを重ねて読み込み中を表現できます。
        </span>
      </div>
      <Skeleton radius="md" overlay animation="pulse" />
    </div>
  );
}
