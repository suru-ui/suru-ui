import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="w-8">sm</span>
        <div className="w-48">
          <Meter size="sm" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-8">md</span>
        <div className="w-48">
          <Meter size="md" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-8">lg</span>
        <div className="w-48">
          <Meter size="lg" value={70} />
        </div>
      </div>
    </div>
  );
}
