import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const candidates = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export default function ManyItems() {
  return (
    <Select
      items={candidates}
      placeholder="候補を選択"
      variant="naked"
      size="md"
      className="w-64"
    />
  );
}
