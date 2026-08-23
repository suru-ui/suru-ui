import "../../_fixture";
import { Checkbox } from "@suru-ui/react/checkbox";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <label key={size} className="flex items-center gap-2">
          <Checkbox size={size} defaultChecked />
          {
            {
              sm: "Small",
              md: "Medium",
              lg: "Large",
            }[size]
          }
        </label>
      ))}
    </div>
  );
}
