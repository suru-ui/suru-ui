import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function PendingDeterminate() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton pending percentage={65}>
        アップロード
      </ToggleButton>
    </div>
  );
}
