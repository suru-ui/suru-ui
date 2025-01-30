import { styled } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import { Context } from "./dots-loader.context";

const I = "SuiDotsLoader";

type SpanCss = {
  size: string | number | null;
};

const Span = styled.span<SpanCss>`${css =>
  css.size === null
    ? null
    : typeof css.size === "number"
    ? `gap: ${css.size / 2}px;`
    : `gap: calc(${css.size} / 2)`}`;

type RootParams = {
  color?: string | undefined | null;
  size?: string | number | undefined | null;
};

export type RootProps =
  & Omit<React.ComponentProps<typeof Span>, keyof RootParams | "css">
  & RootParams;

export default function SuiDotsLoaderRoot(props: RootProps) {
  const {
    size = "0.5em",
    color = "currentColor",
    className,
    ...otherRootProps
  } = props;

  return (
    <Context
      value={React.useMemo(
        () => ({
          size,
          color,
        }),
        [
          size,
          color,
        ],
      )}
    >
      <Span
        {...otherRootProps}
        css={{
          size,
        }}
        className={clsx(className, I)}
      />
    </Context>
  );
}
