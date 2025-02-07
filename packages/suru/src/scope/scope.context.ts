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

export function createScopeValue(): ScopeValue {
  return {
    store: new Map(),
  };
}

// dprint-ignore
export const Context: React.Context<ScopeValue>
  = /* @__PURE__ */ React.createContext(/* @__PURE__ */ createScopeValue());
