import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="solid">ソリッド</Button>
      <Button variant="naked">ネイキッド</Button>
      <Button variant="liquid">リキッド</Button>
    </div>
  );
}
