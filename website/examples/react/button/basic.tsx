import "../../_fixture";
import { Button } from "@suru-ui/react/button";

export default function Basic() {
  return (
    <Button onClick={() => console.log("ボタンがクリックされました")}>クリックしてください</Button>
  );
}
