import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col items-center gap-2">
          <span>grey</span>
          <ToggleButton color="grey" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>blue</span>
          <ToggleButton color="blue" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>purple</span>
          <ToggleButton color="purple" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>magenta</span>
          <ToggleButton color="magenta" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>red</span>
          <ToggleButton color="red" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>orange</span>
          <ToggleButton color="orange" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>yellow</span>
          <ToggleButton color="yellow" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>green</span>
          <ToggleButton color="green" defaultPressed>
            ボタン
          </ToggleButton>
        </div>
      </div>
      <p className="text-sm">色は押下状態でのみ適用されます。</p>
    </div>
  );
}
