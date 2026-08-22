import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Radius() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="w-12">none</span>
        <div className="w-48">
          <Progress radius="none" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">sm</span>
        <div className="w-48">
          <Progress radius="sm" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">md</span>
        <div className="w-48">
          <Progress radius="md" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">lg</span>
        <div className="w-48">
          <Progress radius="lg" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12">full</span>
        <div className="w-48">
          <Progress radius="full" value={70} />
        </div>
      </div>
    </div>
  );
}
