import { Avatar, AvatarGroup } from "@suru-ui/react";
import * as React from "react";

export default function SurplusAvatarGroupExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "grid",
      }}
    >
      <section
        style={{
          gap: "0.5rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#525252",
            fontSize: "0.875rem",
          }}
        >
          max=4
        </span>
        <AvatarGroup max={4} size="md">
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
          <Avatar>に</Avatar>
          <Avatar>ほ</Avatar>
          <Avatar>へ</Avatar>
        </AvatarGroup>
      </section>
      <section
        style={{
          gap: "0.5rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#525252",
            fontSize: "0.875rem",
          }}
        >
          reverse
        </span>
        <AvatarGroup max={4} size="md" reverse>
          <Avatar>い</Avatar>
          <Avatar>ろ</Avatar>
          <Avatar>は</Avatar>
          <Avatar>に</Avatar>
          <Avatar>ほ</Avatar>
          <Avatar>へ</Avatar>
        </AvatarGroup>
      </section>
    </div>
  );
}
