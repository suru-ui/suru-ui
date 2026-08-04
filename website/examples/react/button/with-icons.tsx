import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { DeleteIcon, GlobeIcon } from "lucide-react";

export default function WithIcons() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-center gap-3">
        <Button color="blue">
          <GlobeIcon />
          検索
        </Button>
        <Button color="red">
          削除
          <DeleteIcon />
        </Button>
      </div>
      <div className="flex justify-center gap-3">
        <Button
          color="blue"
          slotProps={{
            content: {
              className: "flex-col",
            },
          }}
        >
          <GlobeIcon />
          検索
        </Button>
        <Button
          color="red"
          slotProps={{
            content: {
              className: "flex-col",
            },
          }}
        >
          削除
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
}
