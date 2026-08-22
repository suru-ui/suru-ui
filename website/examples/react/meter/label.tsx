import "../../_fixture";
import { Meter, MeterTrack, MeterIndicator } from "@suru-ui/react/meter";

export default function Label() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-64 flex-col gap-1">
        <span>ラベル付き</span>
        <Meter value={70} label="使用量" />
      </div>
      <div className="flex w-64 flex-col gap-1">
        <span>ラベルなし</span>
        <Meter value={70}>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      </div>
    </div>
  );
}
