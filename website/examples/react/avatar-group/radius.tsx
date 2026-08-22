import "../../_fixture";
import { Avatar } from "@suru-ui/react/avatar";
import { AvatarGroup } from "@suru-ui/react/avatar-group";

export default function Radius() {
  const radii = ["none", "sm", "md", "lg", "full"] as const;

  return (
    <div className="flex flex-wrap items-end gap-6">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-2">
          <span>{radius}</span>
          <AvatarGroup radius={radius}>
            <Avatar>い</Avatar>
            <Avatar>ろ</Avatar>
            <Avatar>は</Avatar>
          </AvatarGroup>
        </div>
      ))}
    </div>
  );
}
