import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <RadioGroup key={color} color={color} defaultValue={color}>
          <label className="flex items-center gap-2">
            <Radio value={color} />
            {color}
          </label>
        </RadioGroup>
      ))}
    </div>
  );
}
