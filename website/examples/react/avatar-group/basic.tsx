import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Basic() {
  return (
    <AvatarGroup>
      <Avatar src="https://i.pravatar.cc/128?img=11" alt="い">
        い
      </Avatar>
      <Avatar src="https://i.pravatar.cc/128?img=12" alt="ろ">
        ろ
      </Avatar>
      <Avatar src="https://i.pravatar.cc/128?img=13" alt="は">
        は
      </Avatar>
    </AvatarGroup>
  );
}
