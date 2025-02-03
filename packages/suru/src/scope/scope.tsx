import { createStore, Provider } from "jotai";
import * as React from "react";
import Context, { type ScopeValue } from "./scope.context";

export type ScopeProps = {
  children?: React.ReactNode;
};

export default function Scope(props: ScopeProps): React.ReactElement {
  const {
    children,
  } = props;
  const store = React.useMemo(createStore, []);
  const value = React.useMemo(
    (): ScopeValue => ({
      store: new Map(),
    }),
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
