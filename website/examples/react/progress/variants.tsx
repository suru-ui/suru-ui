import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Variants() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span>naked</span>
        <Progress variant="naked" value={70} />
      </div>
      <div className="flex flex-col gap-1">
        <span>liquid</span>
        <Progress variant="liquid" value={70} />
      </div>
    </div>
  );
}
