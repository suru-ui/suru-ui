import clsx from "clsx";
import * as React from "react";
import composeRefs from "../compose-refs";
import type MemoMap from "../use-memo-map/memo-map";
import isHandlerProp from "./is-handler-prop-name";

interface Cache extends Pick<MemoMap, "get"> {}

const noCache: Cache = {
  get(_1, factory, _2) {
    return factory();
  },
};

export type AllProps<T = unknown> = React.RefAttributes<T> & React.AllHTMLAttributes<T>;

/**
 * 2 つの props をマージする。
 *
 * @param target マージの対象の props
 * @param source マージする props
 * @param cache キャッシュ
 * @returns マージされた props
 * @example
 * ```ts
 * using cache = useMemoMap();
 * const mergedProps = mergeProps(target, source, cache);
 * ```
 */
function mergeProps<T, U>(target: T, source: U, cache?: Cache): T & U;

function mergeProps(target: AllProps, source: AllProps, cache: Cache = noCache): AllProps {
  const overrideProps: Partial<AllProps> = { ...source };

  for (const name of Object.keys(source) as (keyof AllProps | "__proto__")[]) {
    if (name === "__proto__") {
      continue;
    }

    const slot = target[name];
    const child = source[name];

    switch (true) {
      case name === "ref":
        overrideProps[name] = cache.get(
          name,
          () => composeRefs(slot, child),
          [slot, child],
        );
        break;

      case name === "style":
        overrideProps[name] = cache.get(
          name,
          () =>
            slot && child
              ? { ...slot, ...child } // child が優先される。
              : (slot || child),
          [slot, child],
        );
        break;

      case name === "className":
        overrideProps[name] = cache.get(
          name,
          () => clsx(child, slot), // child を先頭にする。
          [slot, child],
        );
        break;

      case isHandlerProp(name):
        overrideProps[name] = cache.get(
          name,
          () =>
            slot && child
              ? function mergedHandler(this: unknown, ...args: unknown[]) {
                child.apply(this, args); // child を先に呼び出す。
                slot.apply(this, args);
              }
              : (slot || child),
          [slot, child],
        );
        break;
    }
  }

  return {
    ...target,
    ...overrideProps,
  };
}

export default mergeProps;
