import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const manyItems = Array.from({ length: 50 }, (_, index) => `候補 ${index + 1}`);

export default function ManyItems() {
  return <Autocomplete items={manyItems} placeholder="候補を検索" />;
}
