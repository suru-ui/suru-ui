import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Muted() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <Button color="red" muted variant="solid" outlined>
          削除
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <Button color="red" muted variant="naked" outlined>
          削除
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <Button color="red" muted variant="liquid" outlined>
          削除
        </Button>
      </div>
    </div>
  );
}
