import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Radius() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>none</span>
        <Avatar radius="none">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Avatar radius="sm">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Avatar radius="md">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Avatar radius="lg">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>full</span>
        <Avatar radius="full">名</Avatar>
      </div>
    </div>
  );
}
