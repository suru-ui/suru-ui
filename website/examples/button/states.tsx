import { Button } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["solid", "naked", "liquid"] as const;

export default function StateButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VARIANTS.map((variant) => (
          <Button key={variant} color="red" muted variant={variant}>
            muted {variant}
          </Button>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VARIANTS.map((variant) => (
          <Button key={variant} color="red" variant={variant} outlined>
            outlined {variant}
          </Button>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            disabled {variant}
          </Button>
        ))}
      </div>
    </div>
  );
}
