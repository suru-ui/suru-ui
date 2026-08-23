import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {RADII.map((radius) => (
        <RadioGroup key={radius} radius={radius} defaultValue={radius}>
          <label className="flex items-center gap-2">
            <Radio value={radius} />
            {radius}
          </label>
        </RadioGroup>
      ))}
    </div>
  );
}
