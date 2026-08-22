import "../../_fixture";
import { Meter } from "@suru-ui/react/meter";

export default function Basic() {
  return (
    <div className="w-64">
      <Meter value={70} label="使用量" />
    </div>
  );
}
