import * as React from "react";

type Chart = {
  name: string;
  basePx: number;
  levels: readonly number[];
  baseVar: string;
};

const CHARTS: readonly Chart[] = [
  {
    name: "--sui-rem",
    basePx: 14,
    levels: [1, 2, 3, 4, 6, 8, 12, 16],
    baseVar: "--sui-text-std-md-m-font_size",
  },
  {
    name: "--sui-space",
    basePx: 4,
    levels: [1, 2, 3, 4, 6, 8, 12, 16],
    baseVar: "--sui-space-base",
  },
  {
    name: "--sui-gap",
    basePx: 4,
    levels: [1, 2, 3, 4, 6, 8, 12, 16],
    baseVar: "--sui-gap-base",
  },
  {
    name: "--sui-border_width",
    basePx: 1,
    levels: [1, 2, 4, 8, 16, 24, 32, 48],
    baseVar: "--sui-border_width-base",
  },
];

export default function FunctionScaleExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        width: "min(40rem, calc(100vw - 3rem))",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))",
      }}
    >
      {CHARTS.map((chart) => (
        <section
          key={chart.name}
          style={{
            gap: "0.75rem",
            display: "grid",
            alignContent: "start",
          }}
        >
          <div
            style={{
              gap: "1rem",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <code
              style={{
                color: "var(--sui-canvas_text-1)",
                fontSize: "0.8125rem",
                fontFamily: "var(--sui-font-mono)",
              }}
            >
              {chart.name}(n)
            </code>
            <span
              style={{
                color: "var(--sui-canvas_text-3)",
                fontSize: "0.6875rem",
                fontFamily: "var(--sui-font-mono)",
                whiteSpace: "nowrap",
              }}
            >
              {chart.basePx}px × n
            </span>
          </div>
          <div
            style={{
              gap: "0.625rem",
              display: "grid",
            }}
          >
            {chart.levels.map((level) => (
              <div
                key={level}
                style={{
                  gap: "0.25rem",
                  display: "grid",
                }}
              >
                <div
                  style={{
                    gap: "1rem",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <code
                    style={{
                      color: "var(--sui-canvas_text-1)",
                      fontSize: "0.6875rem",
                      fontFamily: "var(--sui-font-mono)",
                    }}
                  >
                    {level}
                  </code>
                  <span
                    style={{
                      color: "var(--sui-canvas_text-2)",
                      fontSize: "0.6875rem",
                      fontFamily: "var(--sui-font-mono)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {level * chart.basePx}px
                  </span>
                </div>
                <div
                  style={{
                    height: "0.5rem",
                    overflow: "hidden",
                    background: "var(--sui-canvas-3)",
                  }}
                  aria-hidden="true"
                >
                  <div
                    style={{
                      width: `calc(var(${chart.baseVar}) * ${level})`,
                      height: "100%",
                      background: "var(--sui-blue-solid-canvas-normal)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
