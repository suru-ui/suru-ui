import { styled } from "@suru-ui/styled";
import clsx from "clsx";
import * as React from "react";
import { useContext } from "./dots-loader.context";

const I = "SuiDotsLoaderDot";

type SpanCss = {
  color: string | null;
  size: string | number | null;
};

const Span = styled.span<SpanCss>`
${css => css.color === null ? null : `background-color: ${css.color};`}
${css =>
  css.size === null
    ? null
    : typeof css.size === "number"
    ? `width: ${css.size}px; height: ${css.size}px;`
    : `width: ${css.size}; height: ${css.size};`}
`;

type DotParams = {
  number: number;
};

export type DotProps =
  & Omit<React.ComponentProps<typeof Span>, keyof DotParams | "css">
  & DotParams;

export default function SuiDotsLoaderDot(props: DotProps) {
  const {
    size,
    color,
  } = useContext();
  const {
    number,
    className,
    ...otherDotProps
  } = props;

  return (
    <Span
      {...otherDotProps}
      css={{
        size,
        color,
      }}
      className={clsx(className, I, `${I}-${number}`)}
    />
  );
}
