import { FileUpload } from "@suru-ui/react";
import * as React from "react";

const REASON_LABELS: Record<string, string> = {
  max_size: "ファイルサイズが大きすぎます",
  min_size: "ファイルサイズが小さすぎます",
  max_files: "選択できる件数を超えています",
  invalid_type: "種類が許可されていません",
};

export default function FileUploadValidationExample(): React.ReactNode {
  const [rejected, setRejected] = React.useState<readonly string[]>([]);

  return (
    <div
      style={{
        gap: "0.75rem",
        width: "100%",
        display: "grid",
        maxWidth: 420,
      }}
    >
      <FileUpload
        maxFiles={3}
        multiple
        maxFileSize={1024 * 1024}
        onFileReject={(details) => {
          setRejected(
            details.rejectedFiles.map(
              ({ file, reason }) => `${file.name}: ${REASON_LABELS[reason] ?? reason}`,
            ),
          );
        }}
      />
      <p
        style={{
          color: "#475569",
          margin: 0,
          fontSize: "0.875rem",
        }}
      >
        PNG などの画像を最大 3 件、各 1 MB まで受け付けます。
      </p>
      {rejected.length > 0 && (
        <ul
          style={{
            color: "#b91c1c",
            margin: 0,
            fontSize: "0.875rem",
            paddingLeft: "1.25rem",
          }}
        >
          {rejected.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
