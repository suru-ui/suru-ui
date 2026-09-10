import { RenderProps } from "./_use-render.js";
import { Override } from "./types.js";

type State = Record<string, any>;

function proxyRenderProps<TInputState extends State, TOverrideState extends State>(
  state: TOverrideState,
  renderProps: Required<RenderProps<Override<TInputState, TOverrideState>>>,
): Required<RenderProps<TInputState>>;

function proxyRenderProps<TInputState extends State, TRenderState extends State>(
  getState: (state: TInputState) => TRenderState,
  renderProps: Required<RenderProps<TRenderState>>,
): Required<RenderProps<TInputState>>;

function proxyRenderProps(
  arg0: State | ((state: State) => State),
  renderProps: Required<RenderProps<State>>,
): Required<RenderProps<State>> {
  const { style, render, className } = renderProps;
  if (typeof arg0 !== "function") {
    const state = arg0;

    return {
      style: typeof style !== "function" ? style : style(state),
      render: typeof render !== "function" ? render : (props) => render(props, state),
      className: typeof className !== "function" ? className : className(state),
    };
  } else {
    const getState = arg0;

    return {
      style: typeof style !== "function" ? style : (state) => style(getState(state)),
      render:
        typeof render !== "function" ? render : (props, state) => render(props, getState(state)),
      className:
        typeof className !== "function" ? className : (state) => className(getState(state)),
    };
  }
}

export default proxyRenderProps;
