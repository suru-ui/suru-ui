import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Basic() {
  return (
    <Combobox
      items={fruits}
      label="果物"
      placeholder="果物を選択"
      variant="naked"
      accentColor="grey"
      size="md"
      className="w-64"
    />
  );
}
