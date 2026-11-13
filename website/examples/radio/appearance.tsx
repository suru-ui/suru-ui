import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

const groups = [
  {
    size: "sm",
    color: "grey",
    label: "小さめ",
    variant: "naked",
    outlined: true,
  },
  {
    size: "md",
    color: "blue",
    label: "liquid",
    variant: "liquid",
    outlined: true,
  },
  {
    size: "lg",
    color: "green",
    label: "枠線なし",
    variant: "liquid",
    outlined: false,
  },
] as const;

export default function RadioAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        display: "grid",
      }}
    >
      {groups.map((group) => (
        <div
          key={group.label}
          style={{
            gap: "0.375rem",
            display: "grid",
          }}
        >
          <span
            style={{
              color: "#71717a",
              fontSize: "0.75rem",
            }}
          >
            {group.label}
          </span>
          <RadioGroup
            size={group.size}
            color={group.color}
            style={{ gap: "0.5rem" }}
            variant={group.variant}
            outlined={group.outlined}
            defaultValue="checked"
            aria-label={`${group.label}の選択肢`}
          >
            <label
              style={{
                gap: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Radio value="checked" />
              選択済み
            </label>
            <label
              style={{
                gap: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Radio value="unchecked" />
              未選択
            </label>
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
