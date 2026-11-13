import { FileUpload } from "@suru-ui/react";
import * as React from "react";

export default function BasicFileUploadExample(): React.ReactNode {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
      }}
    >
      <FileUpload
        accept={["image/*", ".pdf"]}
        maxFiles={5}
        multiple
        maxFileSize={5 * 1024 * 1024}
      />
    </div>
  );
}
