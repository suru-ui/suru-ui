import "../../_fixture";
import { NumberField } from "@suru-ui/react/number-field";

export default function Basic() {
  return (
    <NumberField
      className="w-[320px]"
      scrubArea="数量"
      decrement
      increment
      step={1}
      defaultValue={100}
    />
  );
}
