import "../../_fixture";
import { Switch } from "@suru-ui/react/switch";

export default function Outlined() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <Switch variant="naked" outlined defaultChecked />
        naked + outlined
      </label>
      <label className="flex items-center gap-2">
        <Switch variant="liquid" outlined defaultChecked />
        liquid + outlined
      </label>
    </div>
  );
}
