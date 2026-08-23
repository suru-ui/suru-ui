import "../../_fixture";
import { CheckCircle2Icon } from "lucide-react";
import { Alert } from "@suru-ui/react/alert";

export default function WithTitle() {
  return (
    <div className="w-[450px]">
      <Alert icon={<CheckCircle2Icon />} color="green" title="更新完了">
        プロフィールを更新しました。
      </Alert>
    </div>
  );
}
