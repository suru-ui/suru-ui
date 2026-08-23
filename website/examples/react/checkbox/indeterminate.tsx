import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

export default function Indeterminate() {
  return (
    <label className="flex items-center gap-2">
      <Checkbox indeterminate />
      中間状態
    </label>
  );
}
