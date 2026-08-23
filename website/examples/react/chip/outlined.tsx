import "../../_fixture";
import { Chip } from "@suru-ui/react/chip";

export default function Outlined() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <Chip variant="solid" outlined color="blue">
          新着
        </Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <Chip variant="naked" outlined color="blue">
          新着
        </Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <Chip variant="liquid" outlined color="blue">
          新着
        </Chip>
      </div>
    </div>
  );
}
