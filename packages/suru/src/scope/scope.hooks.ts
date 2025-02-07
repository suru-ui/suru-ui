import { atom, type SetStateAction, useAtomValue, useSetAtom } from "jotai";
import { selectAtom } from "jotai/utils";
import * as React from "react";
import { Context, type ScopeValue, type State, type Store } from "./scope.context";

export function useScope(): ScopeValue {
  const value = React.use(Context);

  if (__DEV__) {
    React.useDebugValue(value);
  }

  return value;
}

function getState<T = unknown>(store: Store, key: string): State<T> {
  if (!store.has(key)) {
    store.set(key, {
      key,
      cnt: 0,
      src: atom<T | null>(null),
    });
  }

  return store.get(key)!;
}

function useStateGC(store: Store, state: State<any>) {
  React.useEffect(
    () => {
      ++state.cnt;

      return () => {
        if (--state.cnt <= 0) {
          store.delete(state.key);
        }
      };
    },
    [state],
  );
}

export function useSetState<T = unknown>(
  scope: ScopeValue,
  key: string,
): React.Dispatch<SetStateAction<T | null>> {
  const { store } = scope;
  const state = getState<T>(store, key);
  useStateGC(store, state);

  const setValue = useSetAtom(state.src);

  return setValue;
}

export function useStateValue<T = unknown>(
  scope: ScopeValue,
  key: string,
): T | null {
  const { store } = scope;
  const state = getState<T>(store, key);
  useStateGC(store, state);

  const value = useAtomValue(state.src);

  return value;
}

export function useStateValueWithSelector<T = unknown, U = unknown>(
  scope: ScopeValue,
  key: string,
  selector: (value: T | null, prevSlice?: U) => U,
  equalityFn?: ((a: U, b: U) => boolean) | undefined,
): U {
  const { store } = scope;
  const state = getState<T>(store, key);
  useStateGC(store, state);

  const src = selectAtom(state.src, selector, equalityFn);
  const value = useAtomValue(src);

  return value;
}
