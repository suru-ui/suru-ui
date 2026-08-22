import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex w-full flex-col gap-2">
        <span>muted</span>
        <Alert variant="muted" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span>naked</span>
        <Alert variant="naked" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span>liquid</span>
        <Alert variant="liquid" title="更新があります">
          新しいバージョンが利用可能です。
        </Alert>
      </div>
    </div>
  );
}
