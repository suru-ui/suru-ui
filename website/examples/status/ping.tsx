import { type StatusRippleSize, Status } from "@suru-ui/react";
import * as React from "react";

const RIPPLE_SIZES: readonly StatusRippleSize[] = ["sm", "md", "lg"];

export default function StatusPingExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Status color="green">静止</Status>
        <Status ping color="green">
          処理中
        </Status>
      </div>
      <div
        style={{
          gap: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {RIPPLE_SIZES.map((rippleSize) => (
          <Status key={rippleSize} ping color="blue" rippleSize={rippleSize}>
            rippleSize: {rippleSize}
          </Status>
        ))}
      </div>
    </div>
  );
}
