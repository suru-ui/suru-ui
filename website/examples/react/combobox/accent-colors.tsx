import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const fruits = ["りんご", "ばなな", "ぶどう", "みかん", "いちご", "もも"];

const colors = [
  "grey",
  "blue",
  "purple",
  "magenta",
  "red",
  "orange",
  "yellow",
  "green",
] as const;

export default function AccentColors() {
  return (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <Combobox
          key={color}
          accentColor={color}
          items={fruits}
          variant="naked"
          size="md"
          placeholder="選択"
          className="w-64"
        />
      ))}
    </div>
  );
}
