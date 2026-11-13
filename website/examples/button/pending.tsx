import { Button } from "@suru-ui/react";
import * as React from "react";

export default function PendingButtonExample(): React.ReactNode {
  const [isPending, startTransition] = React.useTransition();

  function handleClick(): void {
    startTransition(() => new Promise((r) => setTimeout(r, 1500)));
  }

  return (
    <Button color="blue" pending={isPending} onClick={handleClick}>
      保存
    </Button>
  );
}
