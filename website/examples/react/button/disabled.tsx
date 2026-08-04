import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { EllipsisIcon } from "lucide-react";

export default function Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>送信</Button>
      <Button disabled squared>
        <EllipsisIcon />
      </Button>
    </div>
  );
}
