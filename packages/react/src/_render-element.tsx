import type { HTMLProps } from "@base-ui/react/types";
import { getReactElementRef } from "@base-ui/utils/getReactElementRef";
import { useMergedRefs } from "@base-ui/utils/useMergedRefs";
import * as React from "react";

import mergeProps from "./_merge-props.js";
import type { RenderProps } from "./_use-render.js";

type State = Record<string, any>;

export type RenderElementProps<TState extends State = any> = {
  defaultTagName: keyof React.JSX.IntrinsicElements;

  htmlProps: HTMLProps;

  render: RenderProps<TState>["render"];

  state: TState;
};

export default function RenderElement<TState extends State>(
  props: RenderElementProps<TState>,
): React.ReactNode {
  const { state, render, htmlProps, defaultTagName: DefaultTag } = props;

  return typeof render === "function" ? (
    render(htmlProps, state)
  ) : (
    <RenderStatelessElement element={render || <DefaultTag />} htmlProps={htmlProps} />
  );
}

function RenderStatelessElement(props: { element: React.ReactElement<any>; htmlProps: HTMLProps }) {
  const { element, htmlProps } = props;
  const ref = useMergedRefs(htmlProps.ref, getReactElementRef(element));
  const mergedProps = mergeProps([htmlProps, element.props]);
  mergedProps["ref"] = ref;

  return React.cloneElement(element, mergedProps);
}
