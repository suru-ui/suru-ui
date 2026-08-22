import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Colors() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarGroup>
        <Avatar>い</Avatar>
        <Avatar>ろ</Avatar>
        <Avatar>は</Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
      </AvatarGroup>
      <AvatarGroup color="blue">
        <Avatar>い</Avatar>
        <Avatar>ろ</Avatar>
        <Avatar>は</Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
      </AvatarGroup>
    </div>
  );
}
