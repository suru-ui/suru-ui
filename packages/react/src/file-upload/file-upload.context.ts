import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import { ContextMissingError } from "../errors.js";
import type { Override, IUseContext } from "../types.js";

/**
 * ファイルアップロードの配色です。
 */
export type FileUploadContextColor = Color;

/**
 * ファイルアップロードの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type FileUploadContextRadius = "none" | Size | "full";

/**
 * ファイルアップロードの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type FileUploadContextSize = Size;

/**
 * ファイルアップロードの主な外観の種類です。
 *
 * - `"naked"`: 背景のないドロップゾーン
 * - `"liquid"`: 薄い塗りつぶし
 */
export type FileUploadContextVariant = "naked" | "liquid";

/**
 * {@link FileUploadRoot} が子パーツへ提供する状態です。
 */
export type FileUploadContextState = {
  /**
   * 選択できるファイルの種類です。
   */
  readonly accept: string | undefined;

  /**
   * ファイルアップロードの配色です。
   */
  readonly color: FileUploadContextColor;

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
   * ファイルアップロードの角丸です。
   */
  readonly radius: FileUploadContextRadius;

  /**
   * 必須入力かどうかです。
   */
  readonly required: boolean;

  /**
   * ファイルアップロードの大きさです。
   */
  readonly size: FileUploadContextSize;

  /**
   * ファイルアップロードの主な外観です。
   */
  readonly variant: FileUploadContextVariant;
};

/**
 * {@link FileUploadRoot} が子パーツへ提供するコンテキストです。
 */
export type FileUploadContext = Readonly<
  Override<
    FileUploadContextState,
    {
      /**
       * すべての選択済みファイルを削除します。
       */
      readonly clear: () => void;

      /**
       * ファイル選択ダイアログを開きます。
       */
      readonly open: () => void;

      /**
       * 指定したファイルを選択済みリストから削除します。
       */
      readonly remove: (file: File) => void;

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
    }
  >
>;

/**
 * ファイルアップロードの状態と操作を子要素へ伝播するコンテキストです。
 */
export const FileUploadContext: React.Context<FileUploadContext | null> =
  React.createContext<FileUploadContext | null>(null);

export type IUseFileUploadContext = IUseContext<FileUploadContext>;

/**
 * {@link FileUploadContext} を読み取るフックです。
 */
export const useFileUploadContext: IUseFileUploadContext = function useSuiFileUploadContext(
  optional?: boolean,
): any {
  const ctx = React.use(FileUploadContext);
  if (ctx === null && !optional) {
    throw new ContextMissingError({
      contextName: "FileUploadContext",
      providerName: "FileUploadRoot",
    });
  }

  return ctx;
};

export { FileUploadContext as Context, useFileUploadContext as useContext };

export namespace Context {
  export type Color = FileUploadContextColor;

  export type Radius = FileUploadContextRadius;

  export type Size = FileUploadContextSize;

  export type Variant = FileUploadContextVariant;
}
