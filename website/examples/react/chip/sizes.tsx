import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Chip size="sm">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Chip size="md">ラベル</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Chip size="lg">ラベル</Chip>
      </div>
    </div>
  );
}
