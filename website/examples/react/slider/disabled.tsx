import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Disabled() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Slider disabled defaultValue={25} />
      <Slider disabled defaultValue={[25, 75]} />
    </div>
  );
}
