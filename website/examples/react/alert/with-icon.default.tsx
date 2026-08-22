import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function WithIconDefault() {
  return (
    <Alert icon title="エラー">
      問題が発生しました。もう一度お試しください。
    </Alert>
  );
}
