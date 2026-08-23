import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export default function ManyItems() {
  return (
    <Combobox
      items={manyItems}
      placeholder="候補を検索"
      variant="naked"
      accentColor="grey"
      size="md"
      className="w-64"
    />
  );
}
