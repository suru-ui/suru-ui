import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";
import { CheckboxGroup } from "@suru-ui/react/checkbox-group";

export default function Basic() {
  return (
    <CheckboxGroup defaultValue={["option-a"]}>
      <label className="flex items-center gap-2">
        <Checkbox value="option-a" />
        オプション A
      </label>
      <label className="flex items-center gap-2">
        <Checkbox value="option-b" />
        オプション B
      </label>
      <label className="flex items-center gap-2">
        <Checkbox value="option-c" />
        オプション C
      </label>
    </CheckboxGroup>
  );
}
