import "../../_fixture";
import { Input } from "@suru-ui/react/input";

const VARIANTS = ["naked", "liquid"] as const;

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <Input variant={variant} disabled className="w-64" defaultValue="入力値" />
          <Input variant={variant} disabled className="w-64" placeholder="プレースホルダー" />
        </div>
      ))}
    </div>
  );
}
