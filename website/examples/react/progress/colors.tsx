import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Colors() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="w-48">
        <Progress color="grey" value={70} label="grey" />
      </div>
      <div className="w-48">
        <Progress color="blue" value={70} label="blue" />
      </div>
      <div className="w-48">
        <Progress color="green" value={70} label="green" />
      </div>
      <div className="w-48">
        <Progress color="magenta" value={70} label="magenta" />
      </div>
      <div className="w-48">
        <Progress color="orange" value={70} label="orange" />
      </div>
      <div className="w-48">
        <Progress color="purple" value={70} label="purple" />
      </div>
      <div className="w-48">
        <Progress color="red" value={70} label="red" />
      </div>
      <div className="w-48">
        <Progress color="yellow" value={70} label="yellow" />
      </div>
    </div>
  );
}
