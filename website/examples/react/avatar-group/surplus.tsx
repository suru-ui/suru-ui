import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Surplus() {
  return (
    <div className="flex flex-wrap gap-6">
      <AvatarGroup max={4}>
        <Avatar>い</Avatar>
        <Avatar>ろ</Avatar>
        <Avatar>は</Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
        <Avatar>へ</Avatar>
      </AvatarGroup>
      <AvatarGroup max={3}>
        <Avatar>い</Avatar>
        <Avatar>ろ</Avatar>
        <Avatar>は</Avatar>
        <Avatar>に</Avatar>
        <Avatar>ほ</Avatar>
        <Avatar>へ</Avatar>
      </AvatarGroup>
    </div>
  );
}
