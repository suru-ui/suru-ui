import type { Height } from "@suru-ui/theme";
import * as React from "react";
import Context from "./character-count-context.js";

import "./character-count.css";

export type CharacterCountSizing = Height;

export type CharacterCountProps = {
  sizing?: CharacterCountSizing;
};

export default function CharacterCount(props: CharacterCountProps): React.ReactElement | null {
  const charCount = React.use(Context);
  if (charCount === null) {
    return null;
  }

  const { sizing = "md" } = props;

  return (
    <span className={`sui_character_count sui_character_count-size_${sizing}`}>
      {charCount}
    </span>
  );
}
