import { Input } from "@suru-ui/react";
import * as React from "react";

const VARIANTS = ["naked", "liquid"] as const;
const SIZES = ["sm", "md", "lg"] as const;

export default function InputAppearanceExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
        maxWidth: 320,
      }}
    >
      {VARIANTS.map((variant) => (
        <Input
          key={variant}
          style={{ width: "100%" }}
          variant={variant}
          placeholder={`variant: ${variant}`}
        />
      ))}
      {SIZES.map((size) => (
        <Input key={size} size={size} style={{ width: "100%" }} placeholder={`size: ${size}`} />
      ))}
      <Input color="blue" style={{ width: "100%" }} variant="liquid" placeholder="color: blue" />
      <Input
        style={{ width: "100%" }}
        variant="liquid"
        outlined={false}
        placeholder="outlined: false"
      />
    </div>
  );
}
