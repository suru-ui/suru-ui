import { Slider } from "@suru-ui/react";
import * as React from "react";

export default function SliderRangeExample(): React.ReactNode {
  const [value, setValue] = React.useState<readonly number[]>([30, 70]);

  return (
    <div
      style={{
        gap: "1rem",
        width: "20rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <Slider
        max={100}
        min={0}
        step={5}
        label="価格帯"
        value={value}
        renderValue={(formatted) => `${formatted[0]} から ${formatted[1]}`}
        onValueChange={setValue}
      />
      <span
        style={{
          color: "var(--sui-canvas_text-2)",
          fontSize: "0.875rem",
        }}
      >
        現在値: {value[0]} から {value[1]}
      </span>
    </div>
  );
}
