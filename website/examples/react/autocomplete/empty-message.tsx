import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

export default function EmptyMessage() {
  return (
    <Autocomplete
      items={["東京", "大阪", "京都", "福岡"]}
      placeholder="都市を検索"
      empty="該当する都市がありません。"
    />
  );
}
