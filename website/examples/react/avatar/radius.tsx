import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Radius() {
  const radii = ["none", "sm", "md", "lg", "full"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {radii.map((radius) => (
        <div key={radius} className="flex w-24 flex-col items-center gap-2">
          <span>{radius}</span>
          <Avatar radius={radius} src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
            山
          </Avatar>
        </div>
      ))}
    </div>
  );
}
