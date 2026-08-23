import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Vertical() {
  return (
    <div className="flex items-center justify-center gap-10">
      <Slider
        slotProps={{ control: { style: { height: 160 } } }}
        orientation="vertical"
        defaultValue={25}
      />
      <Slider
        slotProps={{ control: { style: { height: 160 } } }}
        orientation="vertical"
        defaultValue={[25, 75]}
      />
    </div>
  );
}
