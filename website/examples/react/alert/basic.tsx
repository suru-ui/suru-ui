import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Basic() {
  return (
    <Alert title="更新があります">
      新しいバージョンが利用可能です。ページを再読み込みしてください。
    </Alert>
  );
}
