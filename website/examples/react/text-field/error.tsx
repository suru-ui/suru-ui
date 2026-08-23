import "../../_fixture";
import { Field } from "@suru-ui/react/field";
import { LinkIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

export default function Error() {
  return (
    <Field invalid>
      <TextField
        className="w-[320px]"
        endAddons={[<LinkIcon key={0} />]}
        startAddons={["https://"]}
        defaultValue="不正な値"
      />
    </Field>
  );
}
