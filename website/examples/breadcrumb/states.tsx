import { Breadcrumb } from "@suru-ui/react";
import * as React from "react";

export default function StateBreadcrumbExample(): React.ReactNode {
  return (
    <Breadcrumb
      items={[
        {
          href: "#",
          label: "ホーム",
        },
        {
          href: "#",
          label: "製品",
          disabled: true,
        },
        { label: "パンくずリスト" },
      ]}
    />
  );
}
