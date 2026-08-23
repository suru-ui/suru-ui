import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const sizes = ["sm", "md", "lg"] as const;

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <Select
          key={size}
          size={size}
          items={fruits}
          label={size}
          variant="naked"
          placeholder="選択"
          className="w-64"
        />
      ))}
    </div>
  );
}
