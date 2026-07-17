import type { UseRenderElementComponentProps as RenderProps } from "@base-ui/react/internals/useRenderElement";

export default function splitRenderProps<TProps extends { readonly [key: string]: any }>(
  props: TProps,
): [
  renderProps: Pick<TProps, keyof RenderProps<any>>,
  componentProps: Omit<TProps, keyof RenderProps<any>>,
] {
  const { style, render, className, ...componentProps } = props;
  const renderProps: Record<keyof RenderProps<any>, any> = {
    style,
    render,
    className,
  };

  return [renderProps, componentProps];
}
