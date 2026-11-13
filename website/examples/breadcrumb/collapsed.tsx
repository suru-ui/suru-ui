import { Breadcrumb } from "@suru-ui/react";
import * as React from "react";

const ITEMS = [
  {
    href: "#",
    label: "ホーム",
  },
  {
    href: "#",
    label: "製品",
  },
  {
    href: "#",
    label: "ライブラリ",
  },
  {
    href: "#",
    label: "コンポーネント",
  },
  {
    href: "#",
    label: "Breadcrumb",
  },
  { label: "省略表示" },
];

export default function CollapsedBreadcrumbExample(): React.ReactNode {
  return <Breadcrumb items={ITEMS} maxItems={4} />;
}
