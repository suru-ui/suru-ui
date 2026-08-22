import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Radius() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col gap-2">
        <span>none</span>
        <Alert radius="none" title="アラート">
          角を直角にしたアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>sm</span>
        <Alert radius="sm" title="アラート">
          小さい角丸のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>md</span>
        <Alert radius="md" title="アラート">
          標準的な角丸のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>lg</span>
        <Alert radius="lg" title="アラート">
          大きい角丸のアラートです。
        </Alert>
      </div>
    </div>
  );
}
