import { createStore, Provider } from "jotai";
import * as React from "react";
import { Context, createScopeValue } from "./scope.context";

export type ScopeProps = {
  children?: React.ReactNode;
};

export default function Scope(props: ScopeProps): React.ReactElement {
  const {
    children,
  } = props;
  const store = React.useMemo(createStore, []);
  const value = React.useMemo(
    () => createScopeValue(),
    [],
  );

  return (
    <Provider store={store}>
      <Context value={value}>
        {children}
      </Context>
    </Provider>
  );
}
