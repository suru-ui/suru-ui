import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Outlined() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <ToggleButton variant="naked" outlined>
          ボタン
        </ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <ToggleButton variant="liquid" outlined>
          ボタン
        </ToggleButton>
      </div>
    </div>
  );
}
