import { Button } from "@suru-ui/react";
import { GlobeIcon, DeleteIcon } from "lucide-react";
import * as React from "react";

export default function IconButtonExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.75rem",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Button>
        <GlobeIcon aria-hidden="true" />
        公開
      </Button>
      <Button>
        削除
        <DeleteIcon aria-hidden="true" />
      </Button>
      <Button color="red" squared aria-label="削除">
        <DeleteIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
