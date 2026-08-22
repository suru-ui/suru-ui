import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Sizes() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span>{size}</span>
          <Chip size={size}>ラベル</Chip>
        </div>
      ))}
    </div>
  );
}
