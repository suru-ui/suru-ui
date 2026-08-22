import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function PendingIndeterminate() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton pending indeterminate>
        保存
      </ToggleButton>
    </div>
  );
}
