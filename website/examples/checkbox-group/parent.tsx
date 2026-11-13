import { Checkbox, CheckboxGroup } from "@suru-ui/react";
import * as React from "react";

const FRUITS = ["fuji-apple", "gala-apple", "granny-smith-apple"];

const rowStyle = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
} as const;

const childRowStyle = {
  ...rowStyle,
  paddingInlineStart: "1.5rem",
} as const;

export default function CheckboxGroupParentExample(): React.ReactNode {
  return (
    <CheckboxGroup allValues={FRUITS} defaultValue={["fuji-apple"]}>
      <label style={rowStyle}>
        <Checkbox parent />
        すべて選択
      </label>
      <label style={childRowStyle}>
        <Checkbox value="fuji-apple" />
        ふじ
      </label>
      <label style={childRowStyle}>
        <Checkbox value="gala-apple" />
        ガラ
      </label>
      <label style={childRowStyle}>
        <Checkbox value="granny-smith-apple" />
        グラニースミス
      </label>
    </CheckboxGroup>
  );
}
