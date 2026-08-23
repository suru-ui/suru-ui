import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="full">
      {RADII.map((radius) => (
        <label key={radius} className="flex items-center gap-2">
          <Radio radius={radius} value={radius} />
          {radius}
        </label>
      ))}
    </RadioGroup>
  );
}
