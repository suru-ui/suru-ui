import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { GlobeIcon, DeleteIcon } from "lucide-react";

export default function WithIcons() {
  return (
    <div className="flex justify-center gap-3">
      <Button>
        <GlobeIcon />
        ボタン
      </Button>
      <Button>
        ボタン
        <DeleteIcon />
      </Button>
    </div>
  );
}
