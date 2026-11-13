import { Avatar } from "@suru-ui/react";
import * as React from "react";

const AVATAR_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#c7d2fe"/><circle cx="32" cy="24" r="12" fill="#4f46e5"/><path d="M12 60c0-12 9-20 20-20s20 8 20 20" fill="#4f46e5"/></svg>',
)}`;

export default function BasicAvatarExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar alt="プロフィール画像" src={AVATAR_IMAGE} size="lg">
        名
      </Avatar>
      <Avatar size="lg" color="blue" radius="full">
        名
      </Avatar>
      <Avatar size="lg" color="green" radius="md">
        S
      </Avatar>
    </div>
  );
}
