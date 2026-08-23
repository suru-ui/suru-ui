import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

export default function Outlined() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="naked-outlined">
      <label className="flex items-center gap-2">
        <Radio variant="naked" outlined value="naked-outlined" />
        naked + outlined
      </label>
      <label className="flex items-center gap-2">
        <Radio variant="liquid" outlined value="liquid-outlined" />
        liquid + outlined
      </label>
    </RadioGroup>
  );
}
