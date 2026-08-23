import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

export default function Checked() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked={false} />
        未チェック
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        チェック済み
      </label>
    </div>
  );
}
