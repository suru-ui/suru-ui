import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

const VARIANTS = ["naked", "liquid"] as const;

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <label key={variant} className="flex items-center gap-2">
          <Checkbox variant={variant} />
          <span>{variant}</span>
        </label>
      ))}
    </div>
  );
}
