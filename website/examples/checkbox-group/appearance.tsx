import { Checkbox, CheckboxGroup } from "@suru-ui/react";
import * as React from "react";

const rowStyle: React.CSSProperties = {
  gap: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
};

export default function CheckboxGroupAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "grid",
      }}
    >
      <CheckboxGroup color="blue" orientation="horizontal" defaultValue={["a"]}>
        <label style={rowStyle}>
          <Checkbox value="a" />
          横並び
        </label>
        <label style={rowStyle}>
          <Checkbox value="b" />
          オプション B
        </label>
        <label style={rowStyle}>
          <Checkbox value="c" />
          オプション C
        </label>
      </CheckboxGroup>
      <CheckboxGroup size="lg" color="green" variant="liquid" defaultValue={["a"]}>
        <label style={rowStyle}>
          <Checkbox value="a" />
          大きめの表示
        </label>
        <label style={rowStyle}>
          <Checkbox value="b" />
          液体の外観
        </label>
      </CheckboxGroup>
    </div>
  );
}
