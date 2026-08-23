import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {RADII.map((radius) => (
        <label key={radius} className="flex items-center gap-2">
          <Checkbox radius={radius} defaultChecked />
          {radius}
        </label>
      ))}
    </div>
  );
}
