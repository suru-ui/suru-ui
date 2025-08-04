import clsx from "clsx";
import type * as React from "react";

export type LoaderProps = Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns">;

export default function SuiButtonLoader(props: LoaderProps): React.ReactElement {
  const {
    className,
    "aria-hidden": ariaHidden = true,
    ...otherLoaderProps
  } = props;

  return (
    <svg
      {...otherLoaderProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={clsx(className, "sui-button-loader")}
      aria-hidden={ariaHidden}
    >
      <SuiButtonLoaderDot r={3} cx={4} cy={12} number={1} />
      <SuiButtonLoaderDot r={3} cx={12} cy={12} number={2} />
      <SuiButtonLoaderDot r={3} cx={20} cy={12} number={3} />
    </svg>
  );
}

function SuiButtonLoaderDot(
  props: {
    r: number;
    cx: number;
    cy: number;
    number: number;
  },
) {
  const {
    r,
    cx,
    cy,
    number,
  } = props;

  return (
    <circle
      r={r}
      cx={cx}
      cy={cy}
      className={`sui-button-loader-dot sui-button-loader-dot_${number}`}
    />
  );
}
