import "./loader.css";

import clsx from "clsx";
import * as primitive from "../primitive";
import * as Loader from "./core";

export type Variant = "circle" | "dots";

export type SizeUnit = "em" | "rem" | "px" | "%";

type Params = {
  color?: string | primitive.PrimitiveObject | undefined | null;
  size?: number | string | primitive.PrimitiveObject | undefined | null;
  maxSize?: number | string | undefined | null;
  minSize?: number | string | undefined | null;
  variant?: Variant | undefined;
};

export type Props =
  & Omit<React.ComponentProps<"svg">, "children" | "viewBox" | "xmlns" | keyof Params>
  & Params;

export default function SuiLoader(props: Props): React.ReactElement {
  const {
    size: sizeProp = "1em",
    color,
    maxSize: maxSizeProp,
    minSize: minSizeProp,
    variant = "circle",
    className: classNameProp,
    ...otherLoaderProps
  } = props;
  const className = clsx(
    classNameProp,
    "SuiLoader",
    `SuiLoader-variant-${variant}`,
  );
  const size = primitive.default(sizeProp);
  const maxSize = primitive.default(maxSizeProp);
  const minSize = primitive.default(minSizeProp);
  const dataAttrs = {
    "data-sui-loader-size": typeof size === "number" ? `${size}px` : size,
    "data-sui-loader-color": primitive.string(color)?.toString(),
    "data-sui-loader-maxsize": typeof maxSize === "number" ? `${maxSize}px` : maxSize,
    "data-sui-loader-minsize": typeof minSize === "number" ? `${minSize}px` : minSize,
  };

  switch (variant) {
    case "circle":
      return (
        <Loader.Circle
          {...otherLoaderProps}
          className={className}
          {...dataAttrs}
        />
      );

    case "dots":
      return (
        <Loader.Dots
          {...otherLoaderProps}
          className={className}
          {...dataAttrs}
        />
      );
  }
}
