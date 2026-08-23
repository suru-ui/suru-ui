import "../../_fixture";
import { JapaneseYenIcon } from "lucide-react";
import { NumberField } from "@suru-ui/react/number-field";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span>{size}</span>
          <NumberField
            size={size}
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
