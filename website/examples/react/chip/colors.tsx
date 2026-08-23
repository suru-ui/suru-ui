import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>grey</span>
        <Chip color="grey">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>blue</span>
        <Chip color="blue">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>green</span>
        <Chip color="green">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>magenta</span>
        <Chip color="magenta">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>orange</span>
        <Chip color="orange">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>purple</span>
        <Chip color="purple">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>red</span>
        <Chip color="red">新着</Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>yellow</span>
        <Chip color="yellow">新着</Chip>
      </div>
    </div>
  );
}
