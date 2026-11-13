import { type SkeletonRadius, type SkeletonAnimation, Skeleton } from "@suru-ui/react";
import * as React from "react";

const ANIMATIONS: readonly SkeletonAnimation[] = ["pulse", "shine", "none"];
const RADII: readonly SkeletonRadius[] = ["none", "sm", "md", "lg"];

export default function SkeletonAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        width: "22rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
        }}
      >
        {ANIMATIONS.map((animation) => (
          <div
            key={animation}
            style={{
              gap: "1rem",
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "4rem 1fr",
            }}
          >
            <span
              style={{
                color: "var(--sui-canvas_text-2)",
                fontSize: "0.75rem",
              }}
            >
              {animation}
            </span>
            <Skeleton style={{ height: "1rem" }} radius="md" animation={animation} />
          </div>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
        }}
      >
        {RADII.map((radius) => (
          <div
            key={radius}
            style={{
              gap: "1rem",
              display: "grid",
              alignItems: "center",
              gridTemplateColumns: "4rem 1fr",
            }}
          >
            <span
              style={{
                color: "var(--sui-canvas_text-2)",
                fontSize: "0.75rem",
              }}
            >
              {radius}
            </span>
            <Skeleton style={{ height: "1.75rem" }} radius={radius} />
          </div>
        ))}
      </div>
    </div>
  );
}
