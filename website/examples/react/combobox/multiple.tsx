import "../../_fixture";
import { Combobox } from "@suru-ui/react/combobox";

const languages = ["TypeScript", "Rust", "Go", "Python"];

export default function Multiple() {
  return (
    <Combobox
      items={languages}
      label="言語"
      multiple
      defaultValue={["TypeScript"]}
      placeholder="言語を追加"
      variant="naked"
      color="grey"
      size="md"
      className="w-80"
    />
  );
}
