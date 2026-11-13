import { Button, Menubar } from "@suru-ui/react";
import * as React from "react";

export default function VerticalMenubarExample(): React.ReactNode {
  return (
    <Menubar
      items={[
        {
          items: [{ label: "プロフィールを表示" }, { label: "プロフィールを編集" }],
          trigger: (
            <Button style={{ width: "100%" }} variant="naked">
              プロフィール
            </Button>
          ),
        },
        {
          items: [{ label: "一般" }, { label: "通知" }, { label: "セキュリティー" }],
          trigger: (
            <Button style={{ width: "100%" }} variant="naked">
              設定
            </Button>
          ),
        },
        {
          items: [{ label: "ドキュメント" }, { label: "お問い合わせ" }],
          trigger: (
            <Button style={{ width: "100%" }} variant="naked">
              ヘルプ
            </Button>
          ),
        },
      ]}
      style={{ width: "12rem" }}
      slotProps={{
        menu: {
          size: "sm",
          variant: "liquid",
        },
      }}
      orientation="vertical"
      aria-label="設定メニュー"
    />
  );
}
