import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

export default function RadioStatesExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        display: "grid",
      }}
    >
      <div
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
          無効
        </span>
        <RadioGroup
          style={{ gap: "0.5rem" }}
          disabled
          defaultValue="checked"
          aria-label="無効の選択肢"
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
      <div
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
          読み取り専用
        </span>
        <RadioGroup
          style={{ gap: "0.5rem" }}
          readOnly
          defaultValue="a"
          aria-label="読み取り専用の選択肢"
        >
          <label
            style={{
              gap: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Radio value="a" />
            選択中の項目
          </label>
          <label
            style={{
              gap: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Radio value="b" />
            変更できない項目
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}
