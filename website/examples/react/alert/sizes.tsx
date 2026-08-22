import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Sizes() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col gap-2">
        <span>sm</span>
        <Alert size="sm" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>md</span>
        <Alert size="md" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>lg</span>
        <Alert size="lg" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
    </div>
  );
}
