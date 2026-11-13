import { AspectRatio } from "@suru-ui/react";
import * as React from "react";

export default function BasicAspectRatioExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "36rem",
      }}
    >
      <AspectRatio
        ratio="16 / 9"
        style={{
          background: "linear-gradient(135deg, #1d4ed8, #7c3aed)",
        }}
        radius="md"
      >
        <div
          style={{
            color: "#ffffff",
            height: "100%",
            display: "flex",
            fontSize: "1.5rem",
            alignItems: "center",
            fontWeight: 600,
            justifyContent: "center",
          }}
        >
          16:9
        </div>
      </AspectRatio>
    </div>
  );
}
