import { Button, Menubar } from "@suru-ui/react";
import * as React from "react";

export default function BasicMenubarExample(): React.ReactNode {
  return (
    <Menubar
      items={[
        {
          items: [
            { label: "新規作成" },
            { label: "開く" },
            {
              type: "submenu",
              items: [{ label: "設計書" }, { label: "議事録" }],
              label: "最近使った項目",
            },
            { label: "保存" },
          ],
          trigger: <Button variant="naked">ファイル</Button>,
        },
        {
          items: [
            { label: "元に戻す" },
            { label: "やり直す" },
            { label: "切り取り" },
            { label: "コピー" },
          ],
          trigger: <Button variant="naked">編集</Button>,
        },
        {
          items: [{ label: "拡大" }, { label: "縮小" }, { label: "全体を表示" }],
          trigger: <Button variant="naked">表示</Button>,
        },
      ]}
      aria-label="アプリケーションのメニュー"
    />
  );
}
