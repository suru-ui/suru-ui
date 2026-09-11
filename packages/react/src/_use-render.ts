import mergeProps from "./_merge-props.js";
import type { StateAttributesMapping } from "@base-ui/react/internals/getStateAttributesProps";
import {
  type UseRenderElementComponentProps,
  useRenderElement,
} from "@base-ui/react/internals/useRenderElement";
import type * as React from "react";

type State = Record<string, any>;

type StateArgs<TState extends State> = [keyof TState] extends [never]
  ? {
      state?: undefined;
    }
  : {
      state: TState;
    };

export type RenderProps<TState extends State = any> = UseRenderElementComponentProps<TState>;

export type ElementProps<
  TRenderedElementType extends Element = Element,
  TState extends State = any,
> = RenderProps<TState> & React.RefAttributes<TRenderedElementType> & Record<string, any>;

export type UseRenderArgs<
  TRenderedElementType extends Element,
  TState extends State = any,
  TEnabled extends boolean | undefined = undefined,
> = StateArgs<TState> & {
  defaultTagName: keyof React.JSX.IntrinsicElements;
  props:
    | ElementProps<TRenderedElementType, TState>
    | readonly ElementProps<TRenderedElementType, TState>[];
  enabled?: TEnabled | undefined;
  stateAttributesMapping?: Readonly<StateAttributesMapping<TState>> | undefined;
  /**
   * @deprecated
   */
  ref?:
    | React.Ref<TRenderedElementType>
    | readonly (React.Ref<TRenderedElementType> | undefined)[]
    | undefined;
};

export type UseRenderReturn<TEnabled extends boolean | undefined> = ReturnType<
  typeof useRenderElement<any, any, any, TEnabled>
>;

export default function useRender<
  TRenderedElementType extends Element,
  TState extends State = {},
  TEnabled extends boolean | undefined = undefined,
>(args: UseRenderArgs<TRenderedElementType, TState, TEnabled>): UseRenderReturn<TEnabled> {
  const { ref, props, state, enabled, defaultTagName, stateAttributesMapping } = args;
  const refList = Array.isArray(ref) ? ref.slice() : [ref];
  let renderProps: RenderProps<TState>;
  const elementPropsList = [];
  if (Array.isArray(props)) {
    const propsList = props;
    const renderPropsList: RenderProps<TState>[] = [];
    for (const propsItem of propsList) {
      const { ref: itemRef, style, render, className, ...elementProps } = propsItem;

      const renderProps: RenderProps<TState> = { style, className };
      if ("render" in propsItem) {
        renderProps.render = render;
      }

      if (itemRef !== undefined) {
        refList.push(itemRef);
      }
      renderPropsList.push(renderProps);
      elementPropsList.push(elementProps);
    }

    renderProps = mergeProps(renderPropsList);
  } else {
    const { ref: itemRef, style, render, className, ...elementProps } = props;

    if (itemRef !== undefined) {
      refList.push(itemRef);
    }
    renderProps = { style, className };
    if ("render" in props) {
      renderProps.render = render;
    }
    elementPropsList.push(elementProps);
  }

  return useRenderElement(defaultTagName, renderProps, {
    ref: refList,
    props: elementPropsList,
    state,
    enabled,
    stateAttributesMapping,
  });
}
