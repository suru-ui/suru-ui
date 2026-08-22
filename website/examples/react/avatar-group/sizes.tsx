import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Sizes() {
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="flex flex-wrap items-end gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span>{size}</span>
          <AvatarGroup size={size}>
            <Avatar>い</Avatar>
            <Avatar>ろ</Avatar>
            <Avatar>は</Avatar>
          </AvatarGroup>
        </div>
      ))}
    </div>
  );
}
