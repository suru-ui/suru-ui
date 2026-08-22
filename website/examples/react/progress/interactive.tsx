import "../../_fixture";
import { Button } from "@suru-ui/react/button";
import { Progress } from "@suru-ui/react/progress";

import useProgress from "../_use-progress";

export default function Interactive() {
  const progress = useProgress();

  return (
    <div className="flex w-64 flex-col gap-3">
      <Button value="foo.zip" pending={progress.pending} onClick={progress.clickHandler}>
        ダウンロード
      </Button>
      <Progress
        label="ダウンロード"
        value={progress.percentage ?? null}
        className={progress.pending ? "" : "invisible"}
      />
    </div>
  );
}
