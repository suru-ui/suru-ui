import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <Avatar color="grey">G</Avatar>
        <span>grey</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="blue">B</Avatar>
        <span>blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="green">G</Avatar>
        <span>green</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="magenta">M</Avatar>
        <span>magenta</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="orange">O</Avatar>
        <span>orange</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="purple">P</Avatar>
        <span>purple</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="red">R</Avatar>
        <span>red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Avatar color="yellow">Y</Avatar>
        <span>yellow</span>
      </div>
    </div>
  );
}
