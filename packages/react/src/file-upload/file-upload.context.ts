import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { IUseContext } from "../types.js";

/**
 * {@link FileUploadRoot} が子パーツへ提供するコンテキストです。
 */
export type FileUploadContext = {
  /**
   * 選択できるファイルの種類です。
   */
  readonly accept: string | undefined;

  /**
   * すべての選択済みファイルを削除します。
   */
  readonly clear: () => void;

  /**
   * ファイルアップロード全体を無効にするかどうかです。
   */
  readonly disabled: boolean;

  /**
   * 選択済みのファイルのリストです。
   */
  readonly files: readonly File[];

  /**
   * 複数のファイルを選択できるかどうかです。
   */
  readonly multiple: boolean;

  /**
   * フォーム送信時に使う入力項目の名前です。
   */
  readonly name: string | undefined;

  /**
   * ファイル選択ダイアログを開きます。
   */
  readonly open: () => void;

  /**
   * 指定したファイルを選択済みリストから削除します。
   */
  readonly remove: (file: File) => void;

  /**
   * 必須入力かどうかです。
   */
  readonly required: boolean;

  /**
   * ファイルのリストを選択済みリストへ追加します。
   *
   * ドラッグアンドドロップなど、隠し input 以外の経路からファイルを受け取るときに使います。
   * 検証に失敗したファイルは {@link FileUploadRootProps.onFileReject|onFileReject} へ報告されます。
   */
  readonly selectFiles: (incomingFiles: readonly File[]) => void;

  /**
   * 隠し input 要素へ非同期にアクセスするための ref です。
   *
   * {@link FileUploadHiddenInput} がマウントされた要素を登録します。
   */
  readonly setInputElement: (element: HTMLInputElement | null) => void;
};

/**
 * {@link FileUploadRoot} が子パーツへ提供するコンテキストです。
 */
export const FileUploadContext: React.Context<FileUploadContext | null> =
  React.createContext<FileUploadContext | null>(null);

function useSuiFileUploadContext(optional?: false): FileUploadContext;
function useSuiFileUploadContext(optional?: boolean): FileUploadContext | null;
function useSuiFileUploadContext(optional?: boolean): FileUploadContext | null {
  const ctx = React.use(FileUploadContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "FileUploadContext",
      providerName: "FileUploadRoot",
    });
  }

  return ctx;
}

/**
 * {@link FileUploadContext} を読み取るフックです。
 */
export const useFileUploadContext: IUseContext<FileUploadContext> = useSuiFileUploadContext;

export { FileUploadContext as Context, useFileUploadContext as useContext };
