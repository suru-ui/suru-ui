import { Select } from "@suru-ui/react";
import * as React from "react";

const LANGUAGES = ["TypeScript", "Rust", "Go", "Python"];

export default function SelectMultipleExample(): React.ReactNode {
  return (
    <Select
      items={LANGUAGES}
      label="言語"
      style={{
        width: "15rem",
        maxWidth: "100%",
      }}
      multiple
      placeholder="言語を選択"
      defaultValue={["TypeScript"]}
    />
  );
}
