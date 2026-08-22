import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";
import { Button } from "@suru-ui/react/button";

export default function WithActions() {
  return (
    <Alert
      icon
      color="blue"
      title="更新があります"
      actions={
        <>
          <Button variant="naked">後で</Button>
          <Button>再読み込み</Button>
        </>
      }
    >
      新しいバージョンが利用可能です。ページを再読み込みしてください。
    </Alert>
  );
}
