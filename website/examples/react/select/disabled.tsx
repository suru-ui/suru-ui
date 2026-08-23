import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <Select
        items={fruits}
        disabled
        defaultValue="りんご"
        placeholder="選択"
        variant="naked"
        size="md"
        className="w-64"
      />
      <Select
        items={fruits}
        disabled
        placeholder="選択"
        variant="naked"
        size="md"
        className="w-64"
      />
    </div>
  );
}
