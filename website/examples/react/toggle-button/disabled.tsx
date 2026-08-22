import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton disabled>ボタン</ToggleButton>
    </div>
  );
}
