import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <Button variant="solid">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <Button variant="naked">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <Button variant="liquid">ボタン</Button>
      </div>
    </div>
  );
}
