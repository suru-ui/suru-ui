import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Basic() {
  return (
    <Select
      items={fruits}
      label="果物"
      placeholder="果物を選択"
      variant="naked"
      size="md"
      className="w-64"
    />
  );
}
