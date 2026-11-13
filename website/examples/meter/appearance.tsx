import { Meter } from "@suru-ui/react";
import * as React from "react";

export default function MeterAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        width: "22rem",
        display: "grid",
      }}
    >
      <Meter color="blue" label="liquid" value={64} variant="liquid" />
      <Meter color="green" label="naked" value={40} variant="naked" outlined={false} />
      <Meter size="lg" color="orange" label="大きめ" value={88} radius="md" outlined />
    </div>
  );
}
