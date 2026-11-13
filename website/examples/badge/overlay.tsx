import { Badge, Avatar } from "@suru-ui/react";
import * as React from "react";

export default function BadgeOverlayExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "2rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          position: "relative",
        }}
      >
        <Avatar size="lg" color="blue" radius="full">
          円
        </Avatar>
        <Badge color="red" overlap="circular" variant="dot" position="top-right" />
      </div>
      <div
        style={{
          display: "inline-flex",
          position: "relative",
        }}
      >
        <Avatar size="lg" color="green" radius="none">
          角
        </Avatar>
        <Badge ring color="red" overlap="rectangular" position="bottom-right">
          12
        </Badge>
      </div>
    </div>
  );
}
