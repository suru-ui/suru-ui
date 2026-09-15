import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link FileUploadItem} が子パーツへ提供するコンテキストです。
 */
export type FileUploadItemContext = {
  /**
   * 表示対象のファイルです。
   */
  readonly file: File;
};

/**
 * {@link FileUploadItem} が子パーツへ提供するコンテキストです。
 */
export const FileUploadItemContext: React.Context<FileUploadItemContext | null> =
  React.createContext<FileUploadItemContext | null>(null);

function useSuiFileUploadItemContext(optional?: false): FileUploadItemContext;
function useSuiFileUploadItemContext(optional?: boolean): FileUploadItemContext | null;
function useSuiFileUploadItemContext(optional?: boolean): FileUploadItemContext | null {
  const ctx = React.use(FileUploadItemContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "FileUploadItemContext",
      providerName: "FileUploadItem",
    });
  }

  return ctx;
}

/**
 * {@link FileUploadItemContext} を読み取るフックです。
 */
export const useFileUploadItemContext: IUseContext<FileUploadItemContext> =
  useSuiFileUploadItemContext;

export { FileUploadItemContext as ItemContext, useFileUploadItemContext as useItemContext };
