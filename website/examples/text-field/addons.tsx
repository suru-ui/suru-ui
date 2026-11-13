import { TextField } from "@suru-ui/react";
import { LinkIcon, SearchIcon } from "lucide-react";
import * as React from "react";

export default function AddonsTextFieldExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
        maxWidth: "22rem",
      }}
    >
      <TextField
        endAddons={[<LinkIcon key="link" aria-hidden="true" />]}
        slotProps={{ input: { "aria-label": "URL" } }}
        placeholder="example.com"
        startAddons={["https://"]}
      />
      <TextField
        type="search"
        slotProps={{ input: { "aria-label": "検索" } }}
        placeholder="ドキュメントを検索"
        startAddons={[<SearchIcon key="search" aria-hidden="true" />]}
      />
    </div>
  );
}
