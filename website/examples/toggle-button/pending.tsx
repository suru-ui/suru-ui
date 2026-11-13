import { ToggleButton } from "@suru-ui/react";
import { ItalicIcon } from "lucide-react";
import * as React from "react";

function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export default function PendingToggleButtonExample(): React.ReactNode {
  const [pending, startTransition] = React.useTransition();

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <ToggleButton
        color="blue"
        pending={pending}
        onClick={() => {
          startTransition(async () => {
            await sleep(1500);
          });
        }}
      >
        {pending ? "保存中" : "保存"}
      </ToggleButton>
      <ToggleButton color="blue" pending={pending} squared aria-label="保留中の切り替え">
        <ItalicIcon aria-hidden="true" />
      </ToggleButton>
    </div>
  );
}
