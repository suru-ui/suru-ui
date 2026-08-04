import "../../_fixture";
import * as ButtonParts from "@suru-ui/react/button";
import * as React from "react";

import useProgress from "../_use-progress";

export default function Pending() {
  const progress = useProgress();

  return (
    <ButtonParts.Root value="foo.zip" pending={progress.pending} onClick={progress.clickHandler}>
      <ButtonParts.Content className="w-[100px]">
        <ButtonParts.Pending defaultVisibility="hidden">
          <ButtonParts.CircularProgress>
            <ButtonParts.CircularProgressTrack />
            <ButtonParts.CircularProgressFill>
              <ButtonParts.CircularProgressFillRotation />
            </ButtonParts.CircularProgressFill>
          </ButtonParts.CircularProgress>
        </ButtonParts.Pending>

        <span className="flex-1">
          {progress.pending && progress.percentage !== undefined
            ? `${Math.trunc(progress.percentage)}%完了`
            : "アップロード"}
        </span>
      </ButtonParts.Content>
    </ButtonParts.Root>
  );
}
