import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Outlined() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Progress outlined value={70} label="読み込み中" />
      <Progress outlined color="blue" value={50} label="読み込み中" />
      <Progress outlined color="red" value={30} label="読み込み中" />
    </div>
  );
}
