import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const sizes = ["sm", "md", "lg"] as const;

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size}>
          <Combobox
            size={size}
            items={fruits}
            variant="naked"
            color="grey"
            placeholder="選択"
            className="w-64"
          />
          <div>{size}</div>
        </div>
      ))}
    </div>
  );
}
