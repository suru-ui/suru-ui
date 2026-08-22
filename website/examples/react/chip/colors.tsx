import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <Chip color="grey">grey</Chip>
        <span>grey</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="blue">blue</Chip>
        <span>blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="green">green</Chip>
        <span>green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="magenta">magenta</Chip>
        <span>magenta</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="orange">orange</Chip>
        <span>orange</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="purple">purple</Chip>
        <span>purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="red">red</Chip>
        <span>red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Chip color="yellow">yellow</Chip>
        <span>yellow</span>
      </div>
    </div>
  );
}
