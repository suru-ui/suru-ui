import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <label key={color} className="flex items-center gap-2">
          <Checkbox color={color} defaultChecked />
          {color}
        </label>
      ))}
    </div>
  );
}
