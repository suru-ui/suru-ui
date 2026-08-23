import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Radius() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <div>
        <Slider radius="none" defaultValue={25} />
        <div>none</div>
      </div>
      <div>
        <Slider radius="sm" defaultValue={50} />
        <div>sm</div>
      </div>
      <div>
        <Slider radius="md" defaultValue={75} />
        <div>md</div>
      </div>
      <div>
        <Slider radius="lg" defaultValue={100} />
        <div>lg</div>
      </div>
      <div>
        <Slider radius="full" defaultValue={25} />
        <div>full</div>
      </div>
    </div>
  );
}
