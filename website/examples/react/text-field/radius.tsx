import "../../_fixture";
import { TextField } from "@suru-ui/react/text-field";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {RADII.map((radius) => (
        <div key={radius} className="flex flex-col gap-2">
          <span>{radius}</span>
          <TextField radius={radius} className="w-[320px]" placeholder="田中 太郎" />
        </div>
      ))}
    </div>
  );
}
