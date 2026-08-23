import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      <Combobox
        items={fruits}
        variant="naked"
        accentColor="grey"
        size="md"
        placeholder="選択"
        className="w-64"
      />
      <Combobox
        items={fruits}
        variant="liquid"
        accentColor="grey"
        size="md"
        placeholder="選択"
        className="w-64"
      />
    </div>
  );
}
