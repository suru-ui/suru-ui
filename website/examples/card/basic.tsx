import { Card, Button } from "@suru-ui/react";
import * as React from "react";

export default function BasicCardExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Card
        title="アカウントを作成"
        footer={<Button>アカウントを作成</Button>}
        description="メールアドレスを入力してアカウントを作成します。"
      >
        アカウントを作成すると、保存した設定がすべての端末で同期されます。
      </Card>
    </div>
  );
}
