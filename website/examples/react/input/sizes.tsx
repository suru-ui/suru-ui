import "../../_fixture";
import { Input } from "@suru-ui/react/input";

const SIZES = ["sm", "md", "lg"] as const;

export default function Sizes() {
  return (
    <div className="flex flex-col gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span>{size}</span>
          <Input size={size} className="w-64" placeholder="田中 太郎" />
        </div>
      ))}
    </div>
  );
}
