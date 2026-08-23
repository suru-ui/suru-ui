import "../../_fixture";
import { Select } from "@suru-ui/react/select";

const languages = ["TypeScript", "Rust", "Go", "Python"];

export default function Multiple() {
  return (
    <Select
      items={languages}
      label="言語"
      multiple
      defaultValue={["TypeScript"]}
      placeholder="言語を選択"
      variant="naked"
      size="md"
      className="w-80"
    >
      {(item) => item}
    </Select>
  );
}
