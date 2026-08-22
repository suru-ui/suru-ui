import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Outlined() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <Button variant="solid" outlined>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <Button variant="naked" outlined>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <Button variant="liquid" outlined>
          ボタン
        </Button>
      </div>
    </div>
  );
}
