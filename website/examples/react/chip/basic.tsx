import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Basic() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>ラベル</Chip>
      <Chip color="blue">ラベル</Chip>
      <Chip variant="solid" color="green">
        ラベル
      </Chip>
    </div>
  );
}
