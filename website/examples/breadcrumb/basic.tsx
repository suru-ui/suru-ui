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
    label: "Suru UI",
  },
  { label: "パンくずリスト" },
];

export default function BasicBreadcrumbExample(): React.ReactNode {
  return <Breadcrumb items={ITEMS} />;
}
