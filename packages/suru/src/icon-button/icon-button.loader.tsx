import clsx from "clsx";
import type * as React from "react";

export type LoaderProps = Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns">;

export default function SuiIconButtonLoader(props: LoaderProps): React.ReactElement {
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
      className={clsx(className, "sui-icon_button-loader")}
      aria-hidden={ariaHidden}
    >
      <SuiIconButtonLoaderRing />
    </svg>
  );
}

function SuiIconButtonLoaderRing() {
  return (
    <circle
      r="10"
      cx="12"
      cy="12"
      className="sui-icon_button-loader-ring"
    />
  );
}
