import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const radii = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col gap-2">
          <span>{radius}</span>
          <Autocomplete
            radius={radius}
            items={["りんご", "バナナ", "ぶどう", "みかん", "いちご", "もも"]}
            placeholder="検索"
          />
        </div>
      ))}
    </div>
  );
}
