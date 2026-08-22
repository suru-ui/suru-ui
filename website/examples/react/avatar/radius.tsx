import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex w-24 flex-col items-center gap-2">
        <span>none</span>
        <Avatar radius="none" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex w-24 flex-col items-center gap-2">
        <span>sm</span>
        <Avatar radius="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex w-24 flex-col items-center gap-2">
        <span>md</span>
        <Avatar radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex w-24 flex-col items-center gap-2">
        <span>lg</span>
        <Avatar radius="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
      <div className="flex w-24 flex-col items-center gap-2">
        <span>full</span>
        <Avatar radius="full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d">
          山
        </Avatar>
      </div>
    </div>
  );
}
