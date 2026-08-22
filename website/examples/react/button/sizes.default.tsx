import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Trash2Icon } from "lucide-react";

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <span>sm</span>
          <Button size="sm">
            <Trash2Icon />
            ボタン
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>md</span>
          <Button size="md">
            <Trash2Icon />
            ボタン
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>lg</span>
          <Button size="lg">
            <Trash2Icon />
            ボタン
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <span>sm</span>
          <Button size="sm" squared>
            <Trash2Icon />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>md</span>
          <Button size="md" squared>
            <Trash2Icon />
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>lg</span>
          <Button size="lg" squared>
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
}
