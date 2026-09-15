import { type FileUploadFileError } from "./file-upload.root.jsx";

export const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

// ファイルサイズを 1024 進法の人間が読める形式へ整形します。
export function formatFileSize(bytes: number): string {
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const formattedValue = unitIndex === 0 ? String(value) : value.toFixed(1).replace(/\.0$/, "");

  return `${formattedValue} ${SIZE_UNITS[unitIndex]}`;
}

// 追加されたファイルを受け入れられるか検証し、合格と不合格に振り分けます。
export function validateFiles(
  incomingFiles: readonly File[],
  currentFiles: readonly File[],
  options: {
    readonly maxFileSize: number;
    readonly maxFiles: number;
    readonly minFileSize: number;
    readonly multiple: boolean;
  },
): {
  accepted: File[];
  rejected: FileUploadFileError[];
} {
  const accepted: File[] = [];
  const rejected: FileUploadFileError[] = [];
  // 単一選択では既存の選択を置き換えるため、常に 1 件を受け付けます。
  let remaining = options.multiple ? Math.max(0, options.maxFiles - currentFiles.length) : 1;

  for (const file of incomingFiles) {
    if (file.size < options.minFileSize) {
      rejected.push({ file, reason: "min_size" });
      continue;
    }

    if (file.size > options.maxFileSize) {
      rejected.push({ file, reason: "max_size" });
      continue;
    }

    if (remaining <= 0) {
      rejected.push({ file, reason: "max_files" });
      continue;
    }

    accepted.push(file);
    remaining -= 1;

    if (!options.multiple) {
      break;
    }
  }

  return { accepted, rejected };
}
