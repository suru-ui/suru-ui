import { Alert } from "@suru-ui/react";
import { InfoIcon, AlertCircleIcon, CheckCircle2Icon, AlertTriangleIcon } from "lucide-react";
import * as React from "react";

const STATUSES = [
  {
    icon: InfoIcon,
    color: "blue",
    title: "お知らせ",
    description: "新しい更新があります。",
  },
  {
    icon: CheckCircle2Icon,
    color: "green",
    title: "更新完了",
    description: "プロフィールを更新しました。",
  },
  {
    icon: AlertTriangleIcon,
    color: "yellow",
    title: "警告",
    description: "空き容量が残りわずかです。",
  },
  {
    icon: AlertCircleIcon,
    color: "red",
    title: "保存に失敗",
    description: "入力内容を確認して、もう一度お試しください。",
  },
] as const;

export default function AppearanceAlertExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        width: "100%",
        display: "grid",
        maxWidth: "34rem",
      }}
    >
      {STATUSES.map(({ icon: Icon, color, title, description }) => (
        <Alert key={title} icon={<Icon aria-hidden="true" />} color={color} title={title}>
          {description}
        </Alert>
      ))}
    </div>
  );
}
