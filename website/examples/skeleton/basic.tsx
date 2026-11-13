import { Skeleton } from "@suru-ui/react";
import * as React from "react";

export default function BasicSkeletonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "20rem",
        border: "1px solid var(--sui-border-1)",
        display: "flex",
        padding: "1.25rem",
        maxWidth: "100%",
        borderRadius: "0.75rem",
        flexDirection: "column",
        backgroundColor: "var(--sui-canvas-1)",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Skeleton
          style={{
            width: "3rem",
            height: "3rem",
            flexShrink: 0,
          }}
          radius="lg"
        />
        <div
          style={{
            gap: "0.5rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Skeleton
            style={{
              width: "60%",
              height: "0.875rem",
            }}
            radius="sm"
          />
          <Skeleton
            style={{
              width: "40%",
              height: "0.75rem",
            }}
            radius="sm"
          />
        </div>
      </div>
      <div
        style={{
          gap: "0.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          style={{
            width: "100%",
            height: "1rem",
          }}
          radius="md"
        />
        <Skeleton
          style={{
            width: "100%",
            height: "1rem",
          }}
          radius="md"
        />
        <Skeleton
          style={{
            width: "72%",
            height: "1rem",
          }}
          radius="md"
        />
      </div>
    </div>
  );
}
