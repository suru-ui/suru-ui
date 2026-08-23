import "../../_fixture";
import { Input } from "@suru-ui/react/input";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {RADII.map((radius) => (
        <div key={radius} className="flex flex-col gap-2">
          <span>{radius}</span>
          <Input radius={radius} className="w-64" placeholder="田中 太郎" />
        </div>
      ))}
    </div>
  );
}
