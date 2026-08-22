import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { EllipsisIcon } from "lucide-react";

export default function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <div className="flex gap-1">
          <Button variant="solid" disabled>
            送信
          </Button>
          <Button squared variant="solid" disabled>
            <EllipsisIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <div className="flex gap-1">
          <Button variant="naked" disabled>
            送信
          </Button>
          <Button squared variant="naked" disabled>
            <EllipsisIcon />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <div className="flex gap-1">
          <Button variant="liquid" disabled>
            送信
          </Button>
          <Button squared variant="liquid" disabled>
            <EllipsisIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
