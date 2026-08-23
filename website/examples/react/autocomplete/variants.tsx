import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span>liquid</span>
        <Autocomplete
          variant="liquid"
          items={["東京", "大阪", "京都", "福岡"]}
          placeholder="都市を検索"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span>naked</span>
        <Autocomplete
          variant="naked"
          items={["東京", "大阪", "京都", "福岡"]}
          placeholder="都市を検索"
        />
      </div>
    </div>
  );
}
