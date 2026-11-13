import { Button, NumberField } from "@suru-ui/react";
import * as React from "react";

export default function ControlledNumberFieldExample(): React.ReactNode {
  const [value, setValue] = React.useState<number | null>(5);

  return (
    <div
      style={{
        gap: "0.75rem",
        width: "20rem",
        display: "grid",
      }}
    >
      <NumberField
        max={20}
        min={0}
        step={1}
        value={value}
        decrement
        increment
        scrubArea="数量"
        slotProps={{ input: { "aria-label": "数量" } }}
        onValueChange={(nextValue) => {
          setValue(nextValue);
        }}
      />
      <span
        style={{
          color: "#52525b",
          fontSize: "0.875rem",
        }}
      >
        現在の値: {value ?? "未入力"}
      </span>
      <Button
        size="sm"
        variant="liquid"
        onClick={() => {
          setValue(null);
        }}
      >
        入力をクリア
      </Button>
    </div>
  );
}
