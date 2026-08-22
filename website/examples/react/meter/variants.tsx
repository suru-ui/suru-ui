import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Variants() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span>naked</span>
        <Meter variant="naked" value={70} />
      </div>
      <div className="flex flex-col gap-1">
        <span>liquid</span>
        <Meter variant="liquid" value={70} />
      </div>
    </div>
  );
}
