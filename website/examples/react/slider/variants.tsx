import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Variants() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Slider variant="naked" defaultValue={25} />
      <Slider variant="liquid" defaultValue={50} />
    </div>
  );
}
