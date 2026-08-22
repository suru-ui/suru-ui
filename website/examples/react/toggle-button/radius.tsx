import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>none</span>
        <ToggleButton radius="none">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <ToggleButton radius="sm">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <ToggleButton radius="md">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <ToggleButton radius="lg">ボタン</ToggleButton>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>full</span>
        <ToggleButton radius="full">ボタン</ToggleButton>
      </div>
    </div>
  );
}
