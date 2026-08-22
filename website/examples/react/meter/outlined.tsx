import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Outlined() {
  return (
    <div className="flex w-64 flex-col gap-3">
      <Meter outlined value={70} label="使用量" />
      <Meter outlined color="blue" value={50} label="使用量" />
      <Meter outlined color="red" value={30} label="使用量" />
    </div>
  );
}
