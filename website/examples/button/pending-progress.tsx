import { Button } from "@suru-ui/react";
import * as React from "react";

export default function PendingProgressButtonExample(): React.ReactNode {
  const [pending, setPending] = React.useState(false);
  const [percentage, setPercentage] = React.useState<number>();

  function handleClick(): void {
    if (pending) {
      return;
    }

    setPending(true);
    setPercentage(0);

    let value = 0;
    const timer = window.setInterval(() => {
      value += 20;
      setPercentage(value);

      if (value >= 100) {
        window.clearInterval(timer);
        setPending(false);
        setPercentage(undefined);
      }
    }, 400);
  }

  return (
    <Button
      color="blue"
      pending={pending}
      slotProps={{ pending: { overlay: false } }}
      percentage={percentage}
      onClick={handleClick}
    >
      {pending && percentage !== undefined ? `${percentage}%完了` : "アップロード"}
    </Button>
  );
}
