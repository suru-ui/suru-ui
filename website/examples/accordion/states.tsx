import { Accordion } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    title: "基本設定",
    value: "basic",
    content: "アカウントの基本的な情報を変更できます。",
  },
  {
    title: "請求情報",
    value: "billing",
    content: "この項目は無効になっているため、開くことができません。",
    disabled: true,
  },
  {
    title: "詳細設定",
    value: "advanced",
    content: "上級者向けの設定を変更できます。",
  },
];

const INDICATORLESS_ITEMS = [
  {
    title: "インジケーターなし",
    value: "note",
    content: "見出しだけでも開閉できるため、シンプルな表示にできます。",
  },
  {
    title: "区切り線あり",
    value: "separator",
    content: "separator を指定すると、隣接する項目の間に区切り線が表示されます。",
  },
];

export default function StateAccordionExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "2rem",
        width: "100%",
        display: "grid",
        maxWidth: "32rem",
      }}
    >
      <section
        style={{
          gap: "0.5rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#525252",
            fontSize: "0.875rem",
          }}
        >
          項目ごとの無効状態
        </span>
        <Accordion items={ITEMS} defaultValue={["basic"]} />
      </section>
      <section
        style={{
          gap: "0.5rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#525252",
            fontSize: "0.875rem",
          }}
        >
          インジケーターなし
        </span>
        <Accordion items={INDICATORLESS_ITEMS} radius="md" indicator={false} />
      </section>
    </div>
  );
}
