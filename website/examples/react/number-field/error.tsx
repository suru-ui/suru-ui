import "../../_fixture";
import { Field } from "@suru-ui/react/field";
import { JapaneseYenIcon } from "lucide-react";
import { NumberField } from "@suru-ui/react/number-field";

export default function Error() {
  return (
    <Field invalid>
      <NumberField
        className="w-[320px]"
        scrubArea="数量"
        decrement
        increment
        step={1}
        startAddons={[<JapaneseYenIcon key={0} />]}
        defaultValue={100}
      />
    </Field>
  );
}
