import "../../_fixture";
import { Field } from "@suru-ui/react/field";
import { Input } from "@suru-ui/react/input";

export default function Error() {
  return (
    <Field invalid>
      <Input className="w-64" defaultValue="不正な値" />
    </Field>
  );
}
