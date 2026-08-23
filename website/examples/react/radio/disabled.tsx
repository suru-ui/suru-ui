import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

export default function Disabled() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="checked">
      <label className="flex items-center gap-2">
        <Radio disabled value="unchecked" />
        無効（未チェック）
      </label>
      <label className="flex items-center gap-2">
        <Radio disabled value="checked" />
        無効（チェック済み）
      </label>
    </RadioGroup>
  );
}
