import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function LabelAndValue() {
  return (
    <div className="flex w-80 flex-col gap-6">
      <Slider
        slotProps={{
          label: { children: "音量" },
          value: {},
        }}
        defaultValue={25}
      />
      <Slider
        slotProps={{
          label: { children: "レンジ" },
          value: {},
        }}
        defaultValue={[25, 75]}
      />
    </div>
  );
}
