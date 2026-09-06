import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const groups = [
  { label: "果物", items: ["りんご", "ばなな", "みかん"] },
  { label: "野菜", items: ["にんじん", "きゅうり", "トマト"] },
] as const;

export default function Grouped() {
  return (
    <Combobox
      items={groups}
      label="食材"
      placeholder="食材を選択"
      variant="naked"
      color="grey"
      size="md"
      className="w-80"
    />
  );
}
