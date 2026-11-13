import { ContextMenu } from "@suru-ui/react";
import { CheckIcon } from "lucide-react";
import * as React from "react";

const areaStyle: React.CSSProperties = {
  color: "#525252",
  width: "20rem",
  border: "1px dashed #a3a3a3",
  height: "10rem",
  display: "flex",
  fontSize: "0.875rem",
  alignItems: "center",
  background: "#f5f5f5",
  borderRadius: "0.75rem",
  justifyContent: "center",
};

export default function ContextMenuStatefulExample(): React.ReactNode {
  const [showGrid, setShowGrid] = React.useState(true);
  const [density, setDensity] = React.useState("comfortable");

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
      }}
    >
      <ContextMenu
        items={[
          {
            type: "checkbox",
            label: "グリッドを表示",
            checked: showGrid,
            onCheckedChange: setShowGrid,
          },
          {
            type: "radio-group",
            items: [
              {
                type: "radio",
                label: "ゆったり",
                value: "comfortable",
              },
              {
                type: "radio",
                label: "コンパクト",
                value: "compact",
              },
            ],
            value: density,
            onValueChange: setDensity,
          },
        ]}
        trigger={<div style={areaStyle}>右クリックで表示を切り替える</div>}
        checkboxIndicator={<CheckIcon size={14} aria-hidden="true" />}
      />
      <p
        style={{
          color: "#525252",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        グリッド: {showGrid ? "表示" : "非表示"}、密度: {density}
      </p>
    </div>
  );
}
