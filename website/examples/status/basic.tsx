import { Status } from "@suru-ui/react";
import * as React from "react";

export default function BasicStatusExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Status ping color="green">
        オンライン
      </Status>
      <Status color="yellow">離席中</Status>
      <Status color="red">取り込み中</Status>
      <Status color="grey">オフライン</Status>
    </div>
  );
}
