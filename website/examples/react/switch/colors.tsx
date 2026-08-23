import "../../_fixture";
import { Switch } from "@suru-ui/react/switch";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <label key={color} className="flex items-center gap-2">
          <Switch color={color} defaultChecked />
          {color}
        </label>
      ))}
    </div>
  );
}
