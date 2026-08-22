import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Trash2Icon } from "lucide-react";

export default function Sizes() {
  return (
    <div className="flex justify-center gap-3 h-[50px]">
      <Button>
        <Trash2Icon />
        ボタン
      </Button>
      <Button squared>
        <Trash2Icon />
      </Button>
    </div>
  );
}
