import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

export default function Horizontal() {
  return (
    <RadioGroup className="gap-3" orientation="horizontal" defaultValue="option-a">
      <label className="flex items-center gap-2">
        <Radio value="option-a" />
        オプション A
      </label>
      <label className="flex items-center gap-2">
        <Radio value="option-b" />
        オプション B
      </label>
    </RadioGroup>
  );
}
