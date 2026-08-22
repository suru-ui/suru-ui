import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { EllipsisIcon } from "lucide-react";

export default function FullWidth() {
  return (
    <div className="space-y-3">
      <Button className="w-full">{"width: 100%"}</Button>
      <div className="flex w-[200px] gap-1">
        <Button className="w-full">{"width: 100%"}</Button>
        <Button squared>
          <EllipsisIcon />
        </Button>
      </div>
      <div className="flex w-[200px] gap-1">
        <Button className="flex-1">{"flex: 1"}</Button>
        <Button squared>
          <EllipsisIcon />
        </Button>
      </div>
    </div>
  );
}
