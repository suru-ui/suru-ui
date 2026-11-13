import { Alert } from "@suru-ui/react";
import { InfoIcon } from "lucide-react";
import * as React from "react";

export default function BasicAlertExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "28rem",
      }}
    >
      <Alert icon={<InfoIcon aria-hidden="true" />} title="お知らせ">
        新しい更新があります。設定画面から変更内容を確認できます。
      </Alert>
    </div>
  );
}
