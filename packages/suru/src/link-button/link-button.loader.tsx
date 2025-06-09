import clsx from "clsx";
import * as React from "react";
import assertRequiredContext from "../utils/assert-required-context";
import Context from "./link-button.context";

export type LoaderArgs = {};

export type LoaderProps =
  & Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns" | keyof LoaderArgs>
  & LoaderArgs;

export default function SuiLinkButtonLoader(props: LoaderProps): React.ReactElement | null {
  const ctx = React.use(Context);
  assertRequiredContext("LinkButtonLoader", ctx);
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
      className={clsx(className, "sui-link_button_loader")}
      aria-hidden={ariaHidden}
    >
      <circle
        r="3"
        cx="4"
        cy="12"
        className="sui-link_button_loader_dot sui-link_button_loader_dot-1"
      />
      <circle
        r="3"
        cx="12"
        cy="12"
        className="sui-link_button_loader_dot sui-link_button_loader_dot-2"
      />
      <circle
        r="3"
        cx="20"
        cy="12"
        className="sui-link_button_loader_dot sui-link_button_loader_dot-3"
      />
    </svg>
  );
}
