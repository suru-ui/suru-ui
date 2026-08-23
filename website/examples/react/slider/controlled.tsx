import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";
import * as React from "react";

export default function Controlled() {
  const [value, setValue] = React.useState(25);

  return (
    <div className="w-80">
      <Slider
        value={value}
        onValueChange={(next) => setValue(Array.isArray(next) ? next[0] : next)}
      />
      <p className="mt-2">現在値: {value}</p>
    </div>
  );
}
