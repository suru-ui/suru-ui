import "../../_fixture";
import { TagIcon, CheckIcon } from "lucide-react";
import { Chip } from "@suru-ui/react/chip";

export default function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip>
        <TagIcon />
        タグ
      </Chip>
      <Chip color="green">
        <CheckIcon />
        完了
      </Chip>
    </div>
  );
}
