import { Card, Badge, Button } from "@suru-ui/react";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";

export default function ActionCardExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Card
        title="定期レポート"
        action={
          <Button size="sm" squared variant="naked" aria-label="設定を開く">
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        }
        footer={
          <>
            <Button variant="naked">閉じる</Button>
            <Button>設定する</Button>
          </>
        }
        description="毎週のスナップショットを自動で共有します。"
      >
        <div
          style={{
            gap: "0.5rem",
            display: "grid",
          }}
        >
          <span>スケジュールを選び、共有先のチャンネルやメンバーを指定してください。</span>
          <Badge color="green">毎週月曜日</Badge>
        </div>
      </Card>
    </div>
  );
}
