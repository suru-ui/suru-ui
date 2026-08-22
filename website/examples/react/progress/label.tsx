import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Label() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-64 flex-col gap-1">
        <span>ラベル付き</span>
        <Progress value={70} label="読み込み中" />
      </div>
      <div className="flex w-64 flex-col gap-1">
        <span>ラベルなし</span>
        <Progress value={70} />
      </div>
    </div>
  );
}
