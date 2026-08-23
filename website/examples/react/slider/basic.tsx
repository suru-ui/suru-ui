import "../../_fixture";
import { Slider } from "@suru-ui/react/slider";

export default function Basic() {
  return (
    <div className="w-80">
      <Slider defaultValue={25} />
    </div>
  );
}
