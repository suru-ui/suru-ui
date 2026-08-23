import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="grey">
      {COLORS.map((color) => (
        <label key={color} className="flex items-center gap-2">
          <Radio color={color} value={color} />
          {color}
        </label>
      ))}
    </RadioGroup>
  );
}
