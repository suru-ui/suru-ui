import * as React from "react";
import { type RenderProps, useRenderProps } from "react-aria-components";

import composeRefs from "./_compose-refs.js";

interface DOMRenderFunction<TValues> extends NonNullable<RenderProps<TValues, any>["render"]> {}

export default function useRender<TValues>(params: {
  readonly defaultTagName: keyof React.JSX.IntrinsicElements;
  readonly render: DOMRenderFunction<TValues> | undefined;
  readonly values: TValues;
  readonly props: RenderProps<TValues, any> & React.RefAttributes<any> & Record<string, unknown>;
}): React.JSX.Element {
  const { props, render: renderParam, values, defaultTagName: ElementType } = params;

  const renderProps = useRenderProps({
    ...props,
    render: renderParam!,
    values,
    defaultStyle: undefined!,
    defaultChildren: undefined!,
    defaultClassName: undefined!,
  });
  const {
    style,
    render,
    children,
    className,
    // "data-rac": dataRac
  } = renderProps;

  const { ref: forwardedRef, ...otherProps } = props;

  // https://github.com/adobe/react-spectrum/blob/1c84a49a1faf50b571c84e00bcf9c60b22ddd03e/packages/react-aria-components/src/utils.tsx#L460-L475
  const elementRef = React.useRef<HTMLElement | null>(null);
  const ref = React.useMemo(
    () => composeRefs(forwardedRef, elementRef),
    [forwardedRef, elementRef],
  );
  React.useLayoutEffect(() => {
    if (/** process.env.NODE_ENV !== "production" && */ render) {
      if (!elementRef.current) {
        console.warn(
          "Ref was not connected to DOM element returned by custom `render` function. Did you forget to pass through or merge the `ref`?",
        );
      } else if (elementRef.current.localName !== ElementType) {
        console.warn(
          `Unexpected DOM element returned by custom \`render\` function. Expected <${ElementType}>, got <${elementRef.current.localName}>. This may break the component behavior and accessibility.`,
        );
      }
    }
  }, [ElementType, render]);

  const domProps: any = { ...otherProps, ref, style, children, className };
  if (render) {
    return render(domProps, values);
  }

  return <ElementType {...domProps} />;
}
