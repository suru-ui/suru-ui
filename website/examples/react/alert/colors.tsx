import "../../_fixture";
import { Alert } from "@suru-ui/react/alert";

export default function Colors() {
  const colors = [
    "grey",
    "blue",
    "green",
    "magenta",
    "orange",
    "purple",
    "red",
    "yellow",
  ] as const;

  return (
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex flex-col gap-2">
          <span>{color}</span>
          <Alert color={color} title={`${color} のアラート`}>
            これは {color} 色のアラートです。
          </Alert>
        </div>
      ))}
    </div>
  );
}
