import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const sizes = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span>{size}</span>
          <Autocomplete
            size={size}
            items={["東京", "大阪", "京都", "福岡"]}
            placeholder="都市を検索"
          />
        </div>
      ))}
    </div>
  );
}
