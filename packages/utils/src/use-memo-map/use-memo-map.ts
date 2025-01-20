import useConstantValue from "../use-constant-value";
import MemoMap, { type MemoKV } from "./memo-map";

export default function useMemoMap(): MemoMap {
  const kv = useConstantValue<MemoKV>({});
  return new MemoMap(kv);
}
