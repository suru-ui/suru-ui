import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import Loader from "../../loader";
import { $ } from "../../theme";
import { useContext } from "./button.context";

export type LoaderProps = Omit<
  React.ComponentProps<"svg">,
  | "children"
  | "color"
  | "size"
  | "viewBox"
  | "xmlns"
>;

export default function SuiButtonLoader(props: LoaderProps): React.ReactElement | null {
  const {
    size,
    color,
    loading,
    variant,
    disabled,
    outlined,
  } = useContext();

  if (!loading) {
    return null;
  }

  const {
    className,
    ...otherLoaderProps
  } = props;

  return (
    <Loader
      {...otherLoaderProps}
      size={`${$.sui.sizing[size]}`}
      color={disabled
        ? variant === "solid"
          ? $.sui.canvas.main
          : $.sui.canvasText.disabled
        : $.sui[color][variant].canvasText}
      variant="dots"
      className={clsx(
        "SuiButtonLoader",
        `SuiButtonLoader-size-${size}`,
        `SuiButtonLoader-color-${color}`,
        `SuiButtonLoader-variant-${variant}`,
        {
          [classes.loading]: loading,
          [classes.disabled]: disabled,
          "SuiButtonLoader-outlined": outlined,
        },
      )}
    />
  );
}
