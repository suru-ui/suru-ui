import type { StateAttributesMapping } from "@base-ui/react/internals/getStateAttributesProps";
import {
  useRenderElement,
  type UseRenderElementComponentProps,
} from "@base-ui/react/internals/useRenderElement";

import splitRenderProps from "./_split-render-props.js";

export type RenderProps<TState = any> = UseRenderElementComponentProps<TState>;

export type UseRenderArgs<
  TRenderedElementType extends Element,
  TState extends Record<string, unknown> = {},
  TEnabled extends boolean | undefined = undefined,
> = {
  defaultTagName: keyof React.JSX.IntrinsicElements | undefined;
  ref: React.Ref<TRenderedElementType> | React.Ref<TRenderedElementType>[] | undefined;
  props: (RenderProps<TState> & Record<string, unknown>) | undefined;
} & ([keyof TState] extends [never]
  ? {
      state?: undefined;
    }
  : {
      state: TState;
    }) & {
    enabled?: TEnabled | undefined;
    stateAttributesMapping?: StateAttributesMapping<TState> | undefined;
  };

export type UseRenderReturn<TEnabled extends boolean | undefined> = ReturnType<
  typeof useRenderElement<any, any, any, TEnabled>
>;

export default function useRender<
  TRenderedElementType extends Element,
  TState extends Record<string, unknown> = {},
  TEnabled extends boolean | undefined = undefined,
>(args: UseRenderArgs<TRenderedElementType, TState, TEnabled>): UseRenderReturn<TEnabled> {
  const { ref, props = {}, state, enabled, defaultTagName, stateAttributesMapping } = args;
  const [renderProps, elementProps] = splitRenderProps(props);

  return useRenderElement(defaultTagName, renderProps as {}, {
    ref,
    state,
    props: elementProps,
    enabled,
    stateAttributesMapping,
  });
}
