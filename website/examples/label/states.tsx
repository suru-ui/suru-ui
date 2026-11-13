import { Label } from "@suru-ui/react";
import * as React from "react";

const COLORS = ["grey", "blue", "red"] as const;

export default function LabelStatesExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      {COLORS.map((color) => (
        <Label key={color} color={color}>
          color: {color}
        </Label>
      ))}
      <Label size="sm">size: sm</Label>
      <Label size="md">size: md</Label>
      <Label size="lg">size: lg</Label>
      <Label disabled>無効なラベル</Label>
    </div>
  );
}
