import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Colors() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Slider color="grey" defaultValue={25} />
      <Slider color="blue" defaultValue={25} />
      <Slider color="purple" defaultValue={25} />
      <Slider color="magenta" defaultValue={25} />
      <Slider color="red" defaultValue={25} />
      <Slider color="orange" defaultValue={25} />
      <Slider color="yellow" defaultValue={25} />
      <Slider color="green" defaultValue={25} />
    </div>
  );
}
