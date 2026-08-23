import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

type Prefecture = {
  readonly label: string;
  readonly value: string;
};

const prefectures: readonly Prefecture[] = [
  { label: "東京都", value: "13" },
  { label: "大阪府", value: "27" },
  { label: "京都府", value: "26" },
  { label: "福岡県", value: "40" },
];

export default function ObjectItems() {
  return (
    <Autocomplete items={prefectures} placeholder="都道府県を検索">
      {(item) => <strong>{item.label}</strong>}
    </Autocomplete>
  );
}
