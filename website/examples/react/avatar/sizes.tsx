import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <Avatar size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <Avatar size="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
    </div>
  );
}
