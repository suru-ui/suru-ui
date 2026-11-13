import { Input } from "@suru-ui/react";
import * as React from "react";

export default function InputStatesExample(): React.ReactNode {
  const [value, setValue] = React.useState("すーるー");

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
        maxWidth: 320,
      }}
    >
      <Input
        style={{ width: "100%" }}
        value={value}
        placeholder="制御された入力欄"
        onValueChange={setValue}
      />
      <Input style={{ width: "100%" }} disabled defaultValue="無効な入力欄" />
      <Input style={{ width: "100%" }} readOnly defaultValue="読み取り専用" />
      <Input type="search" style={{ width: "100%" }} placeholder="検索キーワード" />
      <p
        style={{
          color: "#475569",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        入力値: {value === "" ? "(空)" : value}
      </p>
    </div>
  );
}
