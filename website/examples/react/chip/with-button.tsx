import "../../_fixture";
import { XIcon } from "lucide-react";
import { Button } from "@suru-ui/react/button";
import { Chip } from "@suru-ui/react/chip";

export default function WithButton() {
  const variants = ["solid", "naked", "liquid"] as const;

  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <span>{variant}</span>
          <Chip render={<button type="button" />} variant={variant} color="blue" className="pr-0">
            新着
            <Button
              size="sm"
              color="blue"
              radius="full"
              squared
              variant={variant}
              className="[--sui_button-background_color-normal:transparent]"
            >
              <XIcon />
            </Button>
          </Chip>
        </div>
      ))}
    </div>
  );
}
