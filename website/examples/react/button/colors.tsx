import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button color="grey">grey</Button>
      <Button color="blue">blue</Button>
      <Button color="purple">purple</Button>
      <Button color="magenta">magenta</Button>
      <Button color="red">red</Button>
      <Button color="orange">orange</Button>
      <Button color="yellow">yellow</Button>
      <Button color="green">green</Button>
    </div>
  );
}
