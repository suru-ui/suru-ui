import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Outlined() {
  return (
    <div className="flex flex-wrap gap-3">
      <Chip outlined>ラベル</Chip>
      <Chip outlined color="blue">
        ラベル
      </Chip>
      <Chip outlined color="red">
        ラベル
      </Chip>
    </div>
  );
}
