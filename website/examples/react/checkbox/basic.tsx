import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

export default function Basic() {
  return (
    <label className="flex items-center gap-2">
      <Checkbox />
      設定を有効にする
    </label>
  );
}
