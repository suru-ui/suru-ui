import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <ToggleButton variant="naked">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <ToggleButton variant="liquid">ボタン</ToggleButton>
      </div>
    </div>
  );
}
