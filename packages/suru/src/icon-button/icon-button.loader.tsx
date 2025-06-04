import clsx from "clsx";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./icon-button.context";

export type LoaderArgs = {};

export type LoaderProps =
  & Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns" | keyof LoaderArgs>
  & LoaderArgs;

export default function SuiIconButtonLoader(props: LoaderProps): React.ReactElement | null {
  const ctx = React.use(Context);
  assertRequiredContext("IconButtonLoader", ctx);
  const { loading } = ctx;
  if (!loading) {
    return null;
  }

  const {
    className,
    "aria-hidden": ariaHidden = true,
    ...otherLoaderProps
  } = props;

  return (
    <svg
      {...otherLoaderProps as {}}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={clsx(className, "sui-icon_button_loader")}
      aria-hidden={ariaHidden}
    >
      <circle cx="12" cy="12" r="10" className="sui-icon_button_loader_circle" />
    </svg>
  );
}
