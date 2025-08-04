import { type KeyValueStore, MemoMap, mergeProps } from "@suru-ui/slot";
import * as React from "react";

type NonNullable<T> = [T & {}] extends [never] ? {} : T;

type MergedProps<T> = (T extends unknown ? (_: T) => void : never) extends ((_: infer I) => void)
  ? (NonNullable<I> & NonNullable<T>)
  : never;

function useMergeProps<T1, T2>(props1: T1, props2: T2): NonNullable<T1> & NonNullable<T2>;

function useMergeProps<T1, T2, T3>(
  props1: T1,
  props2: T2,
  props3: T3,
): NonNullable<T1> & NonNullable<T2> & NonNullable<T3>;

function useMergeProps<T1, T2, T3, T4>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
): NonNullable<T1> & NonNullable<T2> & NonNullable<T3> & NonNullable<T4>;

function useMergeProps<T1, T2, T3, T4, T5>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
  props5: T5,
): NonNullable<T1> & NonNullable<T2> & NonNullable<T3> & NonNullable<T4> & NonNullable<T5>;

function useMergeProps<T1, T2, T3, T4, T5, T6>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
  props5: T5,
  props6: T6,
):
  & NonNullable<T1>
  & NonNullable<T2>
  & NonNullable<T3>
  & NonNullable<T4>
  & NonNullable<T5>
  & NonNullable<T6>;

function useMergeProps<T extends unknown[]>(...propsList: T): MergedProps<T[number]>;

function useMergeProps(...propsList: unknown[]) {
  const kvsList = React.useRef<KeyValueStore[]>([]).current;
  const nProps = propsList.length - 1;
  if (kvsList.length < nProps) {
    for (let i = kvsList.length; i < nProps; i++) {
      kvsList.push(new Map());
    }
  } else if (kvsList.length > nProps) {
    kvsList.splice(nProps);
  }

  const mmList = kvsList.map(kvs => new MemoMap(kvs));
  let acc: any = propsList[0];
  for (let i = 1; i < propsList.length; i++) {
    using mm = mmList[i - 1];
    acc = mergeProps(acc, propsList[i], mm);
  }

  return acc;
}

export default useMergeProps;
