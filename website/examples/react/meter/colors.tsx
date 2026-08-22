import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="grey" value={70} label="grey" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="blue" value={70} label="blue" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="green" value={70} label="green" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="magenta" value={70} label="magenta" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="orange" value={70} label="orange" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="purple" value={70} label="purple" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="red" value={70} label="red" />
      </div>
      <div className="flex w-48 flex-col items-start gap-2">
        <Meter color="yellow" value={70} label="yellow" />
      </div>
    </div>
  );
}
