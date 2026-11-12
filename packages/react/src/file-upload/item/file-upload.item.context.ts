import * as React from "react";

import { ContextMissingError } from "../../errors.js";
import type { Override, IUseContext } from "../../types.js";
import type { FileUploadContextState } from "../root/file-upload.root.context.js";

/**
 * {@link FileUploadItem} が子パーツへ提供する状態です。
 */
export type FileUploadItemContext = Readonly<
  Override<
    FileUploadContextState,
    {
      /** 表示対象のファイルです。 */
      readonly file: File;
    }
  >
>;

/**
 * {@link FileUploadItem} が子パーツへ提供するコンテキストです。
 */
export const FileUploadItemContext: React.Context<FileUploadItemContext | null> =
  React.createContext<FileUploadItemContext | null>(null);

function useSuiFileUploadItemContext(optional?: false): FileUploadItemContext;
function useSuiFileUploadItemContext(optional?: boolean): FileUploadItemContext | null;
function useSuiFileUploadItemContext(optional?: boolean): FileUploadItemContext | null {
  const ctx = React.use(FileUploadItemContext);

  if (ctx === null && optional !== true) {
    throw new ContextMissingError({
      contextName: "FileUploadItemContext",
      providerName: "FileUploadItem",
    });
  }

  return ctx;
}

export type IUseFileUploadItemContext = IUseContext<FileUploadItemContext>;

/**
 * {@link FileUploadItemContext} を読み取るフックです。
 */
export const useFileUploadItemContext: IUseFileUploadItemContext = useSuiFileUploadItemContext;

export { FileUploadItemContext as ItemContext, useFileUploadItemContext as useItemContext };
