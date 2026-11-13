import { Avatar, AvatarGroup } from "@suru-ui/react";
import * as React from "react";

export default function BasicAvatarGroupExample(): React.ReactNode {
  return (
    <AvatarGroup max={4} size="md" color="auto" radius="full">
      <Avatar>い</Avatar>
      <Avatar>ろ</Avatar>
      <Avatar>は</Avatar>
    </AvatarGroup>
  );
}
