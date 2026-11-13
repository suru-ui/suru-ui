import { Accordion } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    title: "プロフィール",
    value: "profile",
    content: "表示名、アイコン、自己紹介を変更できます。",
  },
  {
    title: "通知",
    value: "notifications",
    content: "メール、プッシュ通知、アプリ内通知の受け取り方を設定します。",
  },
  {
    title: "セキュリティー",
    value: "security",
    content: "パスワードの変更と二段階認証の設定を行えます。",
  },
];

export default function MultipleAccordionExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "32rem",
      }}
    >
      <Accordion items={ITEMS} multiple defaultValue={["profile", "notifications"]} />
    </div>
  );
}
