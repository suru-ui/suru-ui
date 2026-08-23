import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function WithIndicator() {
  return (
    <div className="w-[450px]">
      <Alert icon color="green">
        プロフィールを更新しました。
      </Alert>
    </div>
  );
}
