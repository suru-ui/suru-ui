import MemoMap, { type MemoKV } from "./memo-map";
import useConstantValue from "./use-constant-value";

export default function useMemoMapList(n: number): readonly MemoMap[] {
  const kvList = useConstantValue<MemoKV[]>([]);
  if (kvList.length < n) {
    for (let i = kvList.length; i < n; i++) {
      kvList.push({});
    }
  } else if (kvList.length > n) {
    kvList.splice(n);
  }

  return kvList.map(kv => new MemoMap(kv));
}
