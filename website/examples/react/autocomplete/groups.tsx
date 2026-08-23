import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const groups = [
  {
    label: "果物",
    items: ["りんご", "みかん", "ぶどう", "もも"],
  },
  {
    label: "野菜",
    items: ["にんじん", "キャベツ", "トマト", "ピーマン"],
  },
] as const;

export default function Groups() {
  return <Autocomplete items={groups} placeholder="食材を検索" />;
}
