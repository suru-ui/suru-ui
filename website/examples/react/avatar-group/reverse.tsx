import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Reverse() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarGroup reverse={false}>
        <Avatar>1</Avatar>
        <Avatar>2</Avatar>
        <Avatar>3</Avatar>
      </AvatarGroup>
      <AvatarGroup reverse>
        <Avatar>1</Avatar>
        <Avatar>2</Avatar>
        <Avatar>3</Avatar>
      </AvatarGroup>
    </div>
  );
}
