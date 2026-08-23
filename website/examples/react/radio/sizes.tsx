import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <RadioGroup className="flex flex-col gap-3" defaultValue="md">
      {SIZES.map((size) => (
        <label key={size} className="flex items-center gap-2">
          <Radio size={size} value={size} />
          {
            {
              sm: "Small",
              md: "Medium",
              lg: "Large",
            }[size]
          }
        </label>
      ))}
    </RadioGroup>
  );
}
