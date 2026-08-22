import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>none</span>
        <Chip radius="none">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Chip radius="sm">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Chip radius="md">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Chip radius="lg">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>full</span>
        <Chip radius="full">ラベル</Chip>
      </div>
    </div>
  );
}
