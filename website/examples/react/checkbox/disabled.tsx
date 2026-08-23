import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <Checkbox disabled />
        無効（未チェック）
      </label>
      <label className="flex items-center gap-2">
        <Checkbox disabled defaultChecked />
        無効（チェック済み）
      </label>
    </div>
  );
}
