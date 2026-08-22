import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Colors() {
  const colors = ["grey", "blue", "green", "magenta", "orange", "purple", "red", "yellow"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <Chip color={color}>{color}</Chip>
          <span>{color}</span>
        </div>
      ))}
    </div>
  );
}
