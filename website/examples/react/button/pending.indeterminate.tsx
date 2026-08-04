import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Trash2Icon } from "lucide-react";
import * as React from "react";

export default function Pending() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button pending>検索</Button>
      <Button pending squared>
        <Trash2Icon />
      </Button>
    </div>
  );
}
