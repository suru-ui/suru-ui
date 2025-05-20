import mergeProps from "./merge-props";
import useMemoMap from "./use-memo-map";

type UnionToIntersection<T> = (T extends unknown ? (_: T) => void : never) extends
  ((_: infer I) => void) ? (I & T) : never;

function useMergeProps<T1, T2>(props1: T1, props2: T2): T1 & T2;

function useMergeProps<T1, T2, T3>(props1: T1, props2: T2, props3: T3): T1 & T2 & T3;

function useMergeProps<T1, T2, T3, T4>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
): T1 & T2 & T3 & T4;

function useMergeProps<T1, T2, T3, T4, T5>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
  props5: T5,
): T1 & T2 & T3 & T4 & T5;

function useMergeProps<T1, T2, T3, T4, T5, T6>(
  props1: T1,
  props2: T2,
  props3: T3,
  props4: T4,
  props5: T5,
  props6: T6,
): T1 & T2 & T3 & T4 & T5 & T6;

function useMergeProps<T extends unknown[]>(...propsList: T): UnionToIntersection<T[number]> {
  using mm = useMemoMap();
  return propsList.reduce((acc, props) => mergeProps(acc, props, mm)) as any;
}

export default useMergeProps;
