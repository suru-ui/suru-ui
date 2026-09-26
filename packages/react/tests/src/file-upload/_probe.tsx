import * as React from "react";

import { useFileUploadContext } from "../../../src/file-upload/file-upload.context.js";

/**
 * 選択済みのファイル名をテキストで観察するプローブです。
 * 非同期なファイル選択や削除がコンテキストへ反映されたことを検証するために使用します。
 */
export default function FilesProbe(): React.ReactElement {
  const ctx = useFileUploadContext();

  return (
    <output className="sui_test_file_names">{ctx.files.map((file) => file.name).join(",")}</output>
  );
}
