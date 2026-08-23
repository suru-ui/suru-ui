import "../../_fixture";
import { LinkIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span>{size}</span>
          <TextField
            size={size}
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
