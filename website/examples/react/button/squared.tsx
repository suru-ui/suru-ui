import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { CogIcon, EllipsisIcon, Trash2Icon } from "lucide-react";

export default function Squared() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button squared>
        <EllipsisIcon />
      </Button>
      <Button squared>
        <CogIcon />
      </Button>
      <Button squared>
        <Trash2Icon />
      </Button>
    </div>
  );
}
