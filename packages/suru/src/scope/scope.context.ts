import type { PrimitiveAtom } from "jotai";
import * as React from "react";

export type State<T = unknown> = {
  key: string;
  cnt: number;
  src: PrimitiveAtom<T | null>;
};

export type Store = Map<string, State<any>>;

export type ScopeValue = {
  store: Store;
};

export default /* @__PURE__ */ React.createContext<ScopeValue>({
  store: new Map(),
});
