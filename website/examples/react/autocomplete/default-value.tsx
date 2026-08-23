import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const fruits = ["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"];

export default function DefaultValue() {
  return <Autocomplete defaultValue="りんご" items={fruits} placeholder="検索" />;
}
