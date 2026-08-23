import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

export default function Outlined() {
  return (
    <Autocomplete
      outlined
      items={["東京", "大阪", "京都", "福岡"]}
      placeholder="都市を検索"
    />
  );
}
