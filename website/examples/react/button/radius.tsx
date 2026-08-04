import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button radius="none">NONE</Button>
      <Button radius="rounded">ROUNDED</Button>
      <Button radius="full">FULL</Button>
    </div>
  );
}
