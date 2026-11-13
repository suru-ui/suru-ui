import { Card } from "@suru-ui/react";
import * as React from "react";

const SIZES = ["sm", "md", "lg"] as const;

export default function AppearanceCardExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        width: "100%",
        display: "grid",
        maxWidth: "28rem",
      }}
    >
      {SIZES.map((size) => (
        <Card
          key={size}
          size={size}
          title={`大きさ: ${size}`}
          description="余白と文字の大きさが変わります。"
        >
          本文の内容は、カードの大きさに合わせて調整されます。
        </Card>
      ))}
      <Card title="枠線なし" outlined={false} description="背景色だけで境界を表現します。">
        枠線を消すと、背景とのコントラストに注意が必要です。
      </Card>
    </div>
  );
}
