import "../../_fixture";
import { Radio } from "@suru-ui/react/radio";
import { RadioGroup } from "@suru-ui/react/radio-group";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <RadioGroup key={size} size={size} defaultValue={size}>
          <label className="flex items-center gap-2">
            <Radio value={size} />
            {
              {
                sm: "Small",
                md: "Medium",
                lg: "Large",
              }[size]
            }
          </label>
        </RadioGroup>
      ))}
    </div>
  );
}
