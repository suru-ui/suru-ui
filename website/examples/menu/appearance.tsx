import { Menu, Button } from "@suru-ui/react";
import * as React from "react";

const ITEMS: Menu.ItemObject[] = [
  { label: "編集" },
  { label: "複製" },
  {
    color: "red",
    label: "削除",
  },
];

const SIZES = ["sm", "md", "lg"] as const;
const VARIANTS = ["solid", "naked", "liquid"] as const;

export default function MenuAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {SIZES.map((size) => (
          <Menu
            key={size}
            size={size}
            items={ITEMS}
            trigger={<Button variant="liquid">size: {size}</Button>}
          />
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {VARIANTS.map((variant) => (
          <Menu
            key={variant}
            items={ITEMS}
            trigger={<Button variant="liquid">variant: {variant}</Button>}
            variant={variant}
          />
        ))}
      </div>
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Menu items={ITEMS} trigger={<Button variant="liquid">枠線なし</Button>} outlined={false} />
        <Menu items={ITEMS} trigger={<Button disabled>無効</Button>} disabled />
      </div>
    </div>
  );
}
