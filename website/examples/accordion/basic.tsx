import { Accordion } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    title: "アコーディオンとは？",
    value: "what",
    content:
      "複数の項目を折りたたんで表示し、必要な項目だけを展開して内容を確認できるコンポーネントです。",
  },
  {
    title: "どのような場面で使いますか？",
    value: "usage",
    content:
      "FAQ や設定画面、商品の詳細情報など、関連する情報をまとめて表示したい場合に適しています。",
  },
  {
    title: "複数の項目を開けますか？",
    value: "multiple",
    content: "multiple を指定すると、複数の項目を同時に展開できます。既定では 1 つだけ開きます。",
  },
];

export default function BasicAccordionExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "32rem",
      }}
    >
      <Accordion items={ITEMS} defaultValue={["what"]} />
    </div>
  );
}
