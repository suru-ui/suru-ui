import "../../_fixture";
import { Input } from "@suru-ui/react/input";

const VARIANTS = ["naked", "liquid"] as const;

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <Input variant={variant} className="w-64" placeholder="田中 太郎" />
        </div>
      ))}
    </div>
  );
}
