import { Menu, Button } from "@suru-ui/react";
import * as React from "react";

export default function MenuItemTypesExample(): React.ReactNode {
  const [sidebar, setSidebar] = React.useState(true);
  const [sort, setSort] = React.useState("name");

  const items: Menu.ItemObject[] = [
    {
      label: "プロフィール",
    },
    {
      type: "checkbox",
      label: "サイドバーを表示",
      checked: sidebar,
      onCheckedChange: setSidebar,
    },
    {
      type: "radio-group",
      items: [
        {
          type: "radio",
          label: "名前順",
          value: "name",
        },
        {
          type: "radio",
          label: "更新日順",
          value: "updated",
        },
      ],
      value: sort,
      onValueChange: setSort,
    },
    {
      type: "submenu",
      items: [{ label: "リンクをコピー" }, { label: "メールで送る" }],
      label: "共有",
    },
    {
      href: "https://example.com/docs",
      type: "link",
      label: "ドキュメント",
      target: "_blank",
    },
  ];

  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
        justifyItems: "start",
      }}
    >
      <Menu items={items} trigger={<Button>操作</Button>} />
      <p
        style={{
          color: "#475569",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        サイドバー: {sidebar ? "表示" : "非表示"} / 並べ替え: {sort}
      </p>
    </div>
  );
}
