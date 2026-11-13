import { Combobox } from "@suru-ui/react";
import * as React from "react";

const LANGUAGES = ["TypeScript", "JavaScript", "Rust", "Go", "Python"];

export default function ComboboxMultipleExample(): React.ReactNode {
  return (
    <div style={{ width: "20rem" }}>
      <Combobox items={LANGUAGES} multiple placeholder="言語を追加" defaultValue={["TypeScript"]} />
    </div>
  );
}
