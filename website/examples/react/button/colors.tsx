import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>grey</span>
        <Button color="grey">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>blue</span>
        <Button color="blue">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>purple</span>
        <Button color="purple">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>magenta</span>
        <Button color="magenta">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>red</span>
        <Button color="red">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>orange</span>
        <Button color="orange">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>yellow</span>
        <Button color="yellow">ボタン</Button>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>green</span>
        <Button color="green">ボタン</Button>
      </div>
    </div>
  );
}
