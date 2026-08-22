import "../../_fixture";
import { Button } from "@suru-ui/react/button";

import useProgress from "../_use-progress";

export default function Pending() {
  const progress = useProgress();

  return (
    <Button
      value="foo.zip"
      pending={progress.pending}
      onClick={progress.clickHandler}
      percentage={progress.percentage}
    >
      ダウンロード
    </Button>
  );
}
