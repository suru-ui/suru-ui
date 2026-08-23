import "../../_fixture";
import { InfoIcon, CheckCircle2Icon, AlertCircleIcon } from "lucide-react";
import { Alert } from "@suru-ui/react/alert";

export default function WithIcon() {
  return (
    <div className="flex w-[450px] flex-col gap-3">
      <Alert icon={<InfoIcon />}>新しい更新があります。</Alert>
      <Alert icon={<CheckCircle2Icon />} color="green">
        保存しました。
      </Alert>
      <Alert icon={<AlertCircleIcon />} color="red">
        保存できませんでした。
      </Alert>
    </div>
  );
}
