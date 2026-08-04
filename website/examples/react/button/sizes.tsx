import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Trash2Icon } from "lucide-react";

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center gap-3">
        <Button size="sm">
          <Trash2Icon />
          Small
        </Button>
        <Button size="md">
          <Trash2Icon />
          Medium
        </Button>
        <Button size="lg">
          <Trash2Icon />
          Large
        </Button>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button size="sm" squared>
          <Trash2Icon />
        </Button>
        <Button size="md" squared>
          <Trash2Icon />
        </Button>
        <Button size="lg" squared>
          <Trash2Icon />
        </Button>
      </div>
      <div className="flex justify-center gap-3 h-[50px]">
        <Button>
          <Trash2Icon />
          ボタン
        </Button>
        <Button squared>
          <Trash2Icon />
        </Button>
      </div>
    </div>
  );
}
