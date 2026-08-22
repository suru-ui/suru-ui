import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="w-8">sm</span>
        <div className="w-48">
          <Progress size="sm" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-8">md</span>
        <div className="w-48">
          <Progress size="md" value={70} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-8">lg</span>
        <div className="w-48">
          <Progress size="lg" value={70} />
        </div>
      </div>
    </div>
  );
}
