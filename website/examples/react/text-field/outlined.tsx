import "../../_fixture";
import { TextField } from "@suru-ui/react/text-field";

const VARIANTS = ["naked", "liquid"] as const;

export default function Outlined() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <TextField variant={variant} outlined className="w-[320px]" placeholder="田中 太郎" />
        </div>
      ))}
    </div>
  );
}
