import "../../_fixture";
import { LinkIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

const VARIANTS = ["naked", "liquid"] as const;

export default function Variants() {
  return (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <TextField
            variant={variant}
            className="w-[320px]"
            endAddons={[<LinkIcon key={0} />]}
            startAddons={["https://"]}
            placeholder="example.com"
          />
        </div>
      ))}
    </div>
  );
}
