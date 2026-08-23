import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";
import { CheckboxGroup } from "@suru-ui/react/checkbox-group";

const fruits = ["fuji-apple", "gala-apple", "granny-smith-apple"];

export default function Parent() {
  return (
    <CheckboxGroup allValues={fruits} className="gap-1">
      <label className="flex items-center gap-2">
        <Checkbox parent />
        すべて選択
      </label>
      <label className="flex items-center gap-2 pis-6">
        <Checkbox value="fuji-apple" />
        ふじ
      </label>
      <label className="flex items-center gap-2 pis-6">
        <Checkbox value="gala-apple" />
        ガラ
      </label>
      <label className="flex items-center gap-2 pis-6">
        <Checkbox value="granny-smith-apple" />
        グラニースミス
      </label>
    </CheckboxGroup>
  );
}
