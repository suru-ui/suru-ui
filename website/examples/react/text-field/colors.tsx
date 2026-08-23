import "../../_fixture";
import { PenToolIcon } from "lucide-react";
import { TextField } from "@suru-ui/react/text-field";

const COLORS = ["grey", "blue", "purple", "magenta", "red", "orange", "yellow", "green"] as const;

const VALUES = {
  grey: "grey グレー",
  blue: "blue ブルー",
  purple: "purple パープル",
  magenta: "magenta マゼンタ",
  red: "red レッド",
  orange: "orange オレンジ",
  yellow: "yellow イエロー",
  green: "green グリーン",
} as const;

export default function Colors() {
  return (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <TextField
          key={color}
          color={color}
          outlined
          className="w-64"
          endAddons={[<PenToolIcon key={0} />]}
          startAddons={["色"]}
          placeholder="色"
          defaultValue={VALUES[color]}
        />
      ))}
    </div>
  );
}
