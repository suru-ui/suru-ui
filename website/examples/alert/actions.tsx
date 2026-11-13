import { Alert, Button } from "@suru-ui/react";
import { AlertCircleIcon } from "lucide-react";
import * as React from "react";

export default function ActionsAlertExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "34rem",
      }}
    >
      <Alert
        icon={<AlertCircleIcon aria-hidden="true" />}
        color="red"
        title="保存できませんでした"
        actions={
          <>
            <Button variant="naked">閉じる</Button>
            <Button color="red">再試行</Button>
          </>
        }
        actionsPosition="side"
      >
        入力内容を確認して、もう一度お試しください。
      </Alert>
    </div>
  );
}
