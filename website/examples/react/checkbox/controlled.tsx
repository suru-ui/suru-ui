import { Checkbox } from "@suru-ui/react/checkbox";

import "../../_fixture";
import * as React from "react";

export default function Controlled() {
  const [checked, setChecked] = React.useState(false);

  return (
    <label className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={(next) => setChecked(next)} />
      クリックで切り替え: {checked ? "ON" : "OFF"}
    </label>
  );
}
