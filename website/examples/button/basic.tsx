import { Button } from "@suru-ui/react";
import * as React from "react";

export default function BasicButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Button color="blue">保存</Button>
      <Button variant="naked">キャンセル</Button>
      <Button color="red" variant="naked" outlined>
        削除
      </Button>
    </div>
  );
}
