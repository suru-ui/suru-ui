import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";

export default function Basic() {
  return (
    <ToggleButton onClick={() => console.log("トグルボタンが切り替えられました")}>
      トグル
    </ToggleButton>
  );
}
