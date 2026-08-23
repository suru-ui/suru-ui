import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

import * as React from "react";

export default function Controlled() {
  const [value, setValue] = React.useState("option-a");

  return (
    <RadioGroup
      value={value}
      className="flex flex-col gap-3"
      onValueChange={(nextValue) => setValue(String(nextValue))}
    >
      <label className="flex items-center gap-2">
        <Radio value="option-a" />
        選択肢 A
      </label>
      <label className="flex items-center gap-2">
        <Radio value="option-b" />
        選択肢 B
      </label>
    </RadioGroup>
  );
}
