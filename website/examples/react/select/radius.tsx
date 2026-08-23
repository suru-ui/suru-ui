import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const radii = ["none", "sm", "md", "lg", "full"] as const;

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {radii.map((radius) => (
        <div key={radius}>
          <Select
            radius={radius}
            items={fruits}
            variant="naked"
            size="md"
            placeholder="選択"
            className="w-64"
          />
          <div>{radius}</div>
        </div>
      ))}
    </div>
  );
}
