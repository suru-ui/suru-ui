import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      <Select items={fruits} variant="naked" size="md" placeholder="選択" className="w-64" />
      <Select items={fruits} variant="liquid" size="md" placeholder="選択" className="w-64" />
    </div>
  );
}
