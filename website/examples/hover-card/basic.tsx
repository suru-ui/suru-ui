import { HoverCard } from "@suru-ui/react";
import * as React from "react";

export default function BasicHoverCardExample(): React.ReactNode {
  return (
    <p style={{ margin: 0 }}>
      詳しくは
      <HoverCard
        trigger={
          <a href="#terms" style={{ margin: "0 0.25rem" }}>
            利用規約
          </a>
        }
      >
        利用規約の概要を確認できます。原文を読むにはリンクを開きます。
      </HoverCard>
      をご確認ください。
    </p>
  );
}
