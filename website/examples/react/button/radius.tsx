import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>none</span>
        <Button radius="none">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Button radius="sm">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Button radius="md">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Button radius="lg">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>full</span>
        <Button radius="full">ボタン</Button>
      </div>
    </div>
  );
}
