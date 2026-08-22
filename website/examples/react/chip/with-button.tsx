import "../../_fixture";
import { XIcon } from "lucide-react";
import { Button } from "@suru-ui/react/button";
import { Chip } from "@suru-ui/react/chip";

export default function WithButton() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex flex-col items-center gap-2">
        <span>solid</span>
        <Chip render={<button type="button" />} variant="solid" color="blue" className="pr-0">
          新着
          <Button
            size="sm"
            color="blue"
            radius="full"
            squared
            variant="solid"
            className="[--sui_button-background_color-normal:transparent]"
          >
            <XIcon />
          </Button>
        </Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>naked</span>
        <Chip render={<button type="button" />} variant="naked" color="blue" className="pr-0">
          新着
          <Button
            size="sm"
            color="blue"
            radius="full"
            squared
            variant="naked"
            className="[--sui_button-background_color-normal:transparent]"
          >
            <XIcon />
          </Button>
        </Chip>
      </div>
      <div className="flex flex-col items-center gap-2">
        <span>liquid</span>
        <Chip render={<button type="button" />} variant="liquid" color="blue" className="pr-0">
          新着
          <Button
            size="sm"
            color="blue"
            radius="full"
            squared
            variant="liquid"
            className="[--sui_button-background_color-normal:transparent]"
          >
            <XIcon />
          </Button>
        </Chip>
      </div>
    </div>
  );
}
