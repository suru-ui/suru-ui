import "../../_fixture";
import { Switch } from "@suru-ui/react/switch";

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <Switch disabled />
        無効（オフ）
      </label>
      <label className="flex items-center gap-2">
        <Switch disabled defaultChecked />
        無効（オン）
      </label>
    </div>
  );
}
