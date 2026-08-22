import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span>grey</span>
        <Alert color="grey" title="grey のアラート">
          これは grey 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>blue</span>
        <Alert color="blue" title="blue のアラート">
          これは blue 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>green</span>
        <Alert color="green" title="green のアラート">
          これは green 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>magenta</span>
        <Alert color="magenta" title="magenta のアラート">
          これは magenta 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>orange</span>
        <Alert color="orange" title="orange のアラート">
          これは orange 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>purple</span>
        <Alert color="purple" title="purple のアラート">
          これは purple 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>red</span>
        <Alert color="red" title="red のアラート">
          これは red 色のアラートです。
        </Alert>
      </div>
      <div className="flex flex-col gap-2">
        <span>yellow</span>
        <Alert color="yellow" title="yellow のアラート">
          これは yellow 色のアラートです。
        </Alert>
      </div>
    </div>
  );
}
