import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

export default function Disabled() {
  return (
    <RadioGroup disabled defaultValue="option-a">
      <label className="flex items-center gap-2">
        <Radio value="option-a" />
        無効（選択済み）
      </label>
      <label className="flex items-center gap-2">
        <Radio value="option-b" />
        無効（未選択）
      </label>
    </RadioGroup>
  );
}
