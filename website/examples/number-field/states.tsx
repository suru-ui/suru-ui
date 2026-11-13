import { NumberField } from "@suru-ui/react";
import * as React from "react";

export default function NumberFieldStatesExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "20rem",
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
          読み取り専用
        </span>
        <NumberField
          readOnly
          decrement
          increment
          slotProps={{ input: { "aria-label": "読み取り専用の数量" } }}
          defaultValue={12}
        />
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
          無効
        </span>
        <NumberField
          disabled
          decrement
          increment
          slotProps={{ input: { "aria-label": "無効の数量" } }}
          defaultValue={8}
        />
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
          範囲外の入力
        </span>
        <NumberField
          max={100}
          min={0}
          decrement
          increment
          slotProps={{ input: { "aria-label": "範囲外の数量" } }}
          defaultValue={150}
          allowOutOfRange
        />
      </div>
    </div>
  );
}
