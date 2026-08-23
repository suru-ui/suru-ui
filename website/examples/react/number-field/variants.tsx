import "../../_fixture";
import { JapaneseYenIcon } from "lucide-react";
import { NumberField } from "@suru-ui/react/number-field";

const VARIANTS = ["naked", "liquid"] as const;

export default function Variants() {
  return (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <span>{variant}</span>
          <NumberField
            variant={variant}
            className="w-[320px]"
            scrubArea="金額"
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
