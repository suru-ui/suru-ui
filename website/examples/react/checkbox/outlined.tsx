import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

export default function Outlined() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <Checkbox variant="naked" outlined />
        naked + outlined
      </label>
      <label className="flex items-center gap-2">
        <Checkbox variant="liquid" outlined />
        liquid + outlined
      </label>
    </div>
  );
}
