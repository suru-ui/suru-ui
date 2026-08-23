import "../../_fixture";
import { JapaneseYenIcon } from "lucide-react";
import { NumberField } from "@suru-ui/react/number-field";

const RADII = ["none", "sm", "md", "lg", "full"] as const;

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      {RADII.map((radius) => (
        <div key={radius} className="flex flex-col gap-2">
          <span>{radius}</span>
          <NumberField
            radius={radius}
            className="w-[320px]"
            scrubArea="数量"
            decrement
            increment
            step={1}
            startAddons={[<JapaneseYenIcon key={0} />]}
            defaultValue={100}
          />
        </div>
      ))}
    </div>
  );
}
