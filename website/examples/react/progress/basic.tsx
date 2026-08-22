import "../../_fixture";
import { Progress } from "@suru-ui/react/progress";

export default function Basic() {
  return (
    <div className="flex w-64 flex-col gap-1">
      <Progress value={70} label="使用量" />
    </div>
  );
}
