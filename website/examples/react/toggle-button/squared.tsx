import "../../_fixture";
import { ToggleButton } from "@suru-ui/react/toggle-button";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export default function Squared() {
  return (
    <div className="flex flex-wrap gap-3">
      <ToggleButton squared aria-label="太字">
        <BoldIcon />
      </ToggleButton>
      <ToggleButton squared aria-label="斜体">
        <ItalicIcon />
      </ToggleButton>
      <ToggleButton squared aria-label="下線" defaultPressed>
        <UnderlineIcon />
      </ToggleButton>
    </div>
  );
}
