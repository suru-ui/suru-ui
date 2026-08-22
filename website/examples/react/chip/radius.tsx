import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Radius() {
  const radii = ["none", "sm", "md", "lg", "full"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <span>{radius}</span>
          <Chip radius={radius}>ラベル</Chip>
        </div>
      ))}
    </div>
  );
}
