import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";
import type { FileUploadItemState } from "./file-upload.item.jsx";

/**
 * {@link FileUploadItem} が子パーツへ提供する状態です。
 */
export type FileUploadItemContext = Readonly<FileUploadItemState>;

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

export type IUseFileUploadItemContext = IUseContext<FileUploadItemContext>;

/**
 * {@link FileUploadItemContext} を読み取るフックです。
 */
export const useFileUploadItemContext: IUseFileUploadItemContext = useSuiFileUploadItemContext;

export { FileUploadItemContext as ItemContext, useFileUploadItemContext as useItemContext };
