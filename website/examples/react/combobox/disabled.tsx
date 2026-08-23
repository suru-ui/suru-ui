import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <Combobox
        items={fruits}
        disabled
        defaultValue="りんご"
        variant="naked"
        accentColor="grey"
        size="md"
        className="w-64"
      />
      <Combobox
        items={fruits}
        disabled
        placeholder="選択"
        variant="naked"
        accentColor="grey"
        size="md"
        className="w-64"
      />
    </div>
  );
}
