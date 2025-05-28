import MemoMap, { type MemoKV } from "./memo-map";
import useConstantValue from "./use-constant-value";

export default function useMemoMap(): MemoMap {
  const kv = useConstantValue<MemoKV>({});
  return new MemoMap(kv);
}
