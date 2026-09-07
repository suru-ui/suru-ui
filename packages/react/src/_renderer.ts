import type { ComponentRenderFn } from "@base-ui/react";
import type * as React from "react";

type Props = { [key: string]: unknown };

type State = { [key: string]: unknown };

function renderer<TProps, TState>(
  render: React.ReactElement | ComponentRenderFn<TProps, TState>,
  state: TState,
): React.ReactElement | ((props: TProps) => React.ReactElement);

function renderer<TProps, TRenderState, TInputState>(
  render: React.ReactElement | ComponentRenderFn<TProps, TRenderState>,
  state: (state: TInputState) => TRenderState,
): React.ReactElement | ((props: TProps, state: TInputState) => React.ReactElement);

function renderer(
  render: React.ReactElement | ComponentRenderFn<Props, State>,
  renderState: State | ((state: State) => State),
): React.ReactElement | ((props: Props, state: State) => React.ReactElement) {
  if (typeof render !== "function") {
    return render;
  }

  if (typeof renderState !== "function") {
    return (props) => render(props, renderState);
  }

  return (props, inputState) => render(props, renderState(inputState));
}

export default renderer;
