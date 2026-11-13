import { Button, FileUpload } from "@suru-ui/react";
import * as React from "react";

export default function FileUploadControlledExample(): React.ReactNode {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div
      style={{
        gap: "0.75rem",
        width: "100%",
        display: "grid",
        maxWidth: 420,
      }}
    >
      <FileUpload value={files} multiple onValueChange={setFiles} />
      <div
        style={{
          gap: "0.75rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.875rem" }}>{files.length} 件を選択中です。</span>
        <Button
          size="sm"
          variant="naked"
          onClick={() => {
            setFiles([]);
          }}
        >
          すべて削除
        </Button>
      </div>
    </div>
  );
}
