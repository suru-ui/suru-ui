import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Colors() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="w-48">
        <Meter color="grey" value={70} label="grey" />
      </div>
      <div className="w-48">
        <Meter color="blue" value={70} label="blue" />
      </div>
      <div className="w-48">
        <Meter color="green" value={70} label="green" />
      </div>
      <div className="w-48">
        <Meter color="magenta" value={70} label="magenta" />
      </div>
      <div className="w-48">
        <Meter color="orange" value={70} label="orange" />
      </div>
      <div className="w-48">
        <Meter color="purple" value={70} label="purple" />
      </div>
      <div className="w-48">
        <Meter color="red" value={70} label="red" />
      </div>
      <div className="w-48">
        <Meter color="yellow" value={70} label="yellow" />
      </div>
    </div>
  );
}
