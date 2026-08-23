import "../../_fixture";
import { LinkIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

const VARIANTS = ["naked", "liquid"] as const;

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <TextField
            variant={variant}
            disabled
            className="w-[320px]"
            endAddons={[<LinkIcon key={0} />]}
            startAddons={["https://"]}
            defaultValue="入力値"
          />
          <TextField
            variant={variant}
            disabled
            className="w-[320px]"
            endAddons={[<LinkIcon key={0} />]}
            startAddons={["https://"]}
            placeholder="プレースホルダー"
          />
        </div>
      ))}
    </div>
  );
}
