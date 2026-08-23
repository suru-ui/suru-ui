import "../../_fixture";
import { Autocomplete } from "@suru-ui/react/autocomplete";

const colors = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <span>{color}</span>
          <Autocomplete
            color={color}
            items={["東京", "大阪", "京都", "福岡"]}
            placeholder={`${color} の入力欄`}
          />
        </div>
      ))}
    </div>
  );
}
