import { NumberField } from "@suru-ui/react";
import * as React from "react";

export default function BasicNumberFieldExample(): React.ReactNode {
  return (
    <NumberField
      max={10}
      min={1}
      step={1}
      style={{ width: "20rem" }}
      decrement
      increment
      scrubArea="数量"
      slotProps={{ input: { "aria-label": "数量" } }}
      placeholder="数量を入力"
      defaultValue={3}
    />
  );
}
