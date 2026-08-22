import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Radius() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <span>none</span>
        <AvatarGroup radius="none">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>sm</span>
        <AvatarGroup radius="sm">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>md</span>
        <AvatarGroup radius="md">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>lg</span>
        <AvatarGroup radius="lg">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>full</span>
        <AvatarGroup radius="full">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
        </AvatarGroup>
      </div>
    </div>
  );
}
