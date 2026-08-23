import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Outlined() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Slider variant="naked" outlined defaultValue={25} />
      <Slider variant="liquid" outlined defaultValue={50} />
    </div>
  );
}
