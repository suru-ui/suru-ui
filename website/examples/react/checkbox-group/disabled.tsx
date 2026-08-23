import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";
import { CheckboxGroup } from "@suru-ui/react/checkbox-group";

export default function Disabled() {
  return (
    <CheckboxGroup disabled defaultValue={["option-a"]}>
      <label className="flex items-center gap-2">
        <Checkbox value="option-b" />
        無効（未選択）
      </label>
      <label className="flex items-center gap-2">
        <Checkbox value="option-a" />
        無効（選択済み）
      </label>
    </CheckboxGroup>
  );
}
