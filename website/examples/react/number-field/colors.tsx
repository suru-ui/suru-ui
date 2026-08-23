import "../../_fixture";
import { JapaneseYenIcon } from "lucide-react";
import { NumberField } from "@suru-ui/react/number-field";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <NumberField
          key={color}
          color={color}
          outlined
          className="w-[320px]"
          scrubArea="金額"
          decrement
          increment
          step={1}
          placeholder={color}
          startAddons={[<JapaneseYenIcon key={0} />]}
        />
      ))}
    </div>
  );
}
