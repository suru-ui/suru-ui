import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Colors() {
  const colors = [
    "grey",
    "blue",
    "green",
    "magenta",
    "orange",
    "purple",
    "red",
    "yellow",
  ] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <Avatar color={color}>{color.slice(0, 1).toUpperCase()}</Avatar>
          <span>{color}</span>
        </div>
      ))}
    </div>
  );
}
