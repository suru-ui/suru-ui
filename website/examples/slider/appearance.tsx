import { type SliderSize, type SliderColor, type SliderVariant, Slider } from "@suru-ui/react";
import * as React from "react";

const VARIANTS: readonly SliderVariant[] = ["naked", "liquid"];
const COLORS: readonly SliderColor[] = ["blue", "green", "red"];
const SIZES: readonly SliderSize[] = ["sm", "md", "lg"];

export default function SliderAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        width: "20rem",
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
        {VARIANTS.map((variant) => (
          <div
            key={variant}
            style={{
              gap: "0.25rem",
              display: "grid",
            }}
          >
            <span
              style={{
                color: "var(--sui-canvas_text-2)",
                fontSize: "0.75rem",
              }}
            >
              {variant}
            </span>
            <Slider variant={variant} defaultValue={45} />
          </div>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
        }}
      >
        {COLORS.map((color) => (
          <div
            key={color}
            style={{
              gap: "0.25rem",
              display: "grid",
            }}
          >
            <span
              style={{
                color: "var(--sui-canvas_text-2)",
                fontSize: "0.75rem",
              }}
            >
              {color}
            </span>
            <Slider color={color} defaultValue={60} />
          </div>
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "grid",
        }}
      >
        {SIZES.map((size) => (
          <div
            key={size}
            style={{
              gap: "0.25rem",
              display: "grid",
            }}
          >
            <span
              style={{
                color: "var(--sui-canvas_text-2)",
                fontSize: "0.75rem",
              }}
            >
              {size}
            </span>
            <Slider size={size} defaultValue={35} />
          </div>
        ))}
      </div>
    </div>
  );
}
