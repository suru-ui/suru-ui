import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Sizes() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Avatar size="sm">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Avatar size="md">名</Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Avatar size="lg">名</Avatar>
      </div>
    </div>
  );
}
