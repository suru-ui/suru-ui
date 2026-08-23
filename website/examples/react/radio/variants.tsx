import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

export default function Variants() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="naked">
      <label className="flex items-center gap-2">
        <Radio variant="naked" value="naked" />
        naked
      </label>
      <label className="flex items-center gap-2">
        <Radio variant="liquid" value="liquid" />
        liquid
      </label>
    </RadioGroup>
  );
}
