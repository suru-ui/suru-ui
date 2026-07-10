import type * as React from "react";
import type { RenderProps } from "react-aria-components";

export interface ReactComponent<
  TProps = {},
  TNode extends React.ReactNode | Promise<React.ReactNode> = React.JSX.Element,
> extends Omit<React.FunctionComponent, never> {
  (props: TProps): TNode;
}

export type $InferRenderValues<TReactComponent extends React.ComponentType> =
  React.ComponentProps<TReactComponent> extends Pick<RenderProps<infer TRenderValues>, "children">
    ? TRenderValues
    : never;

export type $OverrideProps<TTargetProps, TSourceProps> = Omit<TTargetProps, keyof TSourceProps> &
  TSourceProps;
