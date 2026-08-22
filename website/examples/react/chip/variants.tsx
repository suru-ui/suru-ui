import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Variants() {
  const variants = ["solid", "naked", "liquid"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <span>{variant}</span>
          <Chip variant={variant}>新着</Chip>
        </div>
      ))}
    </div>
  );
}
