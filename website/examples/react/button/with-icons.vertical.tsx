import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { GlobeIcon } from "lucide-react";

export default function WithIcons() {
  return (
    <div className="flex justify-center gap-3">
      <Button
        slotProps={{
          content: {
            className: "flex-col gap-[8px]",
          },
        }}
      >
        <GlobeIcon className="size-[28px]" />
        ボタン
      </Button>
    </div>
  );
}
