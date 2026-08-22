import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="w-12">none</span>
        <div className="w-48">
          <Meter radius="none" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">sm</span>
        <div className="w-48">
          <Meter radius="sm" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">md</span>
        <div className="w-48">
          <Meter radius="md" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">lg</span>
        <div className="w-48">
          <Meter radius="lg" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">full</span>
        <div className="w-48">
          <Meter radius="full" value={70} />
        </div>
      </div>
    </div>
  );
}
