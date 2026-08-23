import "../../_fixture";
import { LinkIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

export default function Addons() {
  return (
    <TextField
      className="w-[320px]"
      endAddons={[<LinkIcon key={0} />]}
      startAddons={["https://"]}
      placeholder="example.com"
    />
  );
}
