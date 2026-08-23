import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const groups = [
  { label: "果物", items: ["りんご", "ばなな", "みかん"] },
  { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
] as const;

export default function Grouped() {
  return (
    <Select
      items={groups}
      label="食材"
      placeholder="食材を選択"
      variant="naked"
      size="md"
      className="w-80"
    />
  );
}
