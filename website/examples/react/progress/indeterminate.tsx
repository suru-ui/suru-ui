import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Indeterminate() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span>不確定状態</span>
        <Progress value={null} />
      </div>
      <div className="flex flex-col gap-1">
        <span>確定状態</span>
        <Progress value={70} />
      </div>
    </div>
  );
}
