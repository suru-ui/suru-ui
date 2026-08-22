import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Outlined() {
  return (
    <div className="flex flex-col gap-3">
      <Alert outlined title="更新があります">
        新しいバージョンが利用可能です。
      </Alert>
      <Alert outlined color="red" variant="naked" title="エラー">
        問題が発生しました。もう一度お試しください。
      </Alert>
    </div>
  );
}
