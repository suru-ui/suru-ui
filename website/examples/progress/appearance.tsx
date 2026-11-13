import { Progress } from "@suru-ui/react";
import * as React from "react";

export default function ProgressAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Progress color="blue" label="liquid" value={42} variant="liquid" />
      <Progress color="green" label="naked" value={68} variant="naked" outlined={false} />
      <Progress size="lg" color="orange" label="大きめ" value={86} radius="md" />
    </div>
  );
}
