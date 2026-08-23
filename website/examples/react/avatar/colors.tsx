import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>grey</span>
        <Avatar color="grey">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>blue</span>
        <Avatar color="blue">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>green</span>
        <Avatar color="green">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>magenta</span>
        <Avatar color="magenta">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>orange</span>
        <Avatar color="orange">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>purple</span>
        <Avatar color="purple">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>red</span>
        <Avatar color="red">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>yellow</span>
        <Avatar color="yellow">名</Avatar>
      </div>
    </div>
  );
}
