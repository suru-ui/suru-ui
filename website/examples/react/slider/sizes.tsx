import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Sizes() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <div>
        <Slider size="sm" defaultValue={25} />
        <div>sm</div>
      </div>
      <div>
        <Slider size="md" defaultValue={25} />
        <div>md</div>
      </div>
      <div>
        <Slider size="lg" defaultValue={25} />
        <div>lg</div>
      </div>
    </div>
  );
}
