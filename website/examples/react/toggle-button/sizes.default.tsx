import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Sizes() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <ToggleButton size="sm">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <ToggleButton size="md">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <ToggleButton size="lg">ボタン</ToggleButton>
      </div>
    </div>
  );
}
