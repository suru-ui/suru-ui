import type { BaseUIComponentProps } from "@base-ui/react/internals/types";
import { useControlled } from "@base-ui/utils/useControlled";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";
import { validateFiles } from "./_file-upload.jsx";
import {
  type FileUploadContextSize,
  type FileUploadContextColor,
  type FileUploadContextState,
  type FileUploadContextRadius,
  type FileUploadContextVariant,
  FileUploadContext,
} from "./file-upload.context.js";

/**
 * ファイルアップロードの配色です。
 */
export type FileUploadRootColor = FileUploadContextColor;

/**
 * ファイルアップロードの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type FileUploadRootRadius = FileUploadContextRadius;

/**
 * ファイルアップロードの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type FileUploadRootSize = FileUploadContextSize;

/**
 * ファイルアップロードの主な外観の種類です。
 *
 * - `"naked"`: 背景のないドロップゾーン
 * - `"liquid"`: 薄い塗りつぶし
 */
export type FileUploadRootVariant = FileUploadContextVariant;

/**
 * ファイルが検証で拒否された理由です。
 *
 * - `"invalid_type"`: ファイルの種類が `accept` に一致しない
 * - `"max_files"`: 選択できるファイル数を超えている
 * - `"min_size"`: ファイルサイズが小さすぎる
 * - `"max_size"`: ファイルサイズが大きすぎる
 */
export type FileUploadFileErrorReason = "invalid_type" | "max_files" | "min_size" | "max_size";

/**
 * 検証で拒否されたファイルとその理由です。
 */
export type FileUploadFileError = {
  /**
   * 拒否されたファイルです。
   */
  readonly file: File;

  /**
   * 拒否された理由です。
   */
  readonly reason: FileUploadFileErrorReason;
};

/**
 * ファイルが受け入れられたことを表すイベントの詳細です。
 */
export type FileUploadAcceptEventDetails = {
  /**
   * 受け入れられたファイルのリストです。
   */
  readonly files: readonly File[];
};

/**
 * ファイルが拒否されたことを表すイベントの詳細です。
 */
export type FileUploadRejectEventDetails = {
  /**
   * 今回の選択で受け入れられたファイルのリストです。
   */
  readonly acceptedFiles: readonly File[];

  /**
   * 今回の選択で拒否されたファイルとその理由のリストです。
   */
  readonly rejectedFiles: readonly FileUploadFileError[];
};

/**
 * {@link FileUploadRoot} が持つ状態です。
 */
export type FileUploadRootState = FileUploadContextState;

export namespace FileUploadRootProps {
  export type Render = RenderProps<FileUploadRootState>;

  export type SuruUI = {
    /**
     * 選択できるファイルの種類を指定します。
     *
     * HTML の `accept` 属性と同じ形式の文字列、またはその配列を指定します。
     *
     * - 文字列の例: `"image/png,.pdf"`
     * - 配列の例: `["image/png", ".pdf"]`
     *
     * この指定はファイル選択ダイアログのフィルターとドラッグ&ドロップの検証に使われます。
     * 一致しないファイルは {@link FileUploadRootProps.onFileReject|onFileReject} へ報告されます。
     */
    accept?: string | readonly string[] | undefined;

    /**
     * ファイルの色を指定します。
     *
     * @default "grey"
     */
    color?: FileUploadRootColor | undefined;

    /**
     * 非制御で初期表示するファイルのリストを指定します。
     */
    defaultValue?: readonly File[] | undefined;

    /**
     * ファイルアップロード全体を無効にするかどうかを指定します。
     *
     * 子パーツの props より優先されます。
     *
     * @default false
     */
    disabled?: boolean | undefined;

    /**
     * 1 つのファイルのサイズの上限をバイト単位で指定します。
     *
     * 上限を超えたファイルは {@link FileUploadRootProps.onFileReject|onFileReject} へ報告されます。
     *
     * @default Number.POSITIVE_INFINITY
     */
    maxFileSize?: number | undefined;

    /**
     * 選択できるファイル数の上限を指定します。
     *
     * 上限を超えたファイルは {@link FileUploadRootProps.onFileReject|onFileReject} へ報告されます。
     *
     * @default Number.POSITIVE_INFINITY
     */
    maxFiles?: number | undefined;

    /**
     * 1 つのファイルのサイズの下限をバイト単位で指定します。
     *
     * 下限に満たないファイルは {@link FileUploadRootProps.onFileReject|onFileReject} へ報告されます。
     *
     * @default 0
     */
    minFileSize?: number | undefined;

    /**
     * 複数のファイルを選択できるかどうかを指定します。
     *
     * `false` の場合、新しい選択で既存の選択を置き換えます。
     *
     * @default false
     */
    multiple?: boolean | undefined;

    /**
     * フォーム送信時に使う入力項目の名前を指定します。
     */
    name?: string | undefined;

    /**
     * ファイルが検証に合格したときに呼ばれます。
     */
    onFileAccept?: ((details: FileUploadAcceptEventDetails) => void) | undefined;

    /**
     * ファイルが検証で拒否されたときに呼ばれます。
     */
    onFileReject?: ((details: FileUploadRejectEventDetails) => void) | undefined;

    /**
     * 選択済みファイルのリストが変わったときに呼ばれます。
     */
    onValueChange?: ((files: File[]) => void) | undefined;

    /**
     * ファイルアップロードの角丸を指定します。
     *
     * 既定値は {@link FileUploadRootProps.size|size} です。
     */
    radius?: FileUploadRootRadius | undefined;

    /**
     * 必須入力かどうかを指定します。
     *
     * @default false
     */
    required?: boolean | undefined;

    /**
     * ファイルアップロードのサイズを指定します。
     *
     * @default "md"
     */
    size?: FileUploadRootSize | undefined;

    /**
     * 制御されたファイルのリストを指定します。
     */
    value?: readonly File[] | undefined;

    /**
     * ファイルアップロードの主な外観を指定します。
     *
     * @default "liquid"
     */
    variant?: FileUploadRootVariant | undefined;
  };

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"div", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadRoot} に渡す props です。
 */
export type FileUploadRootProps = FileUploadRootProps.Render &
  FileUploadRootProps.SuruUI &
  FileUploadRootProps.BaseUI &
  FileUploadRootProps.HTML;

export type IFileUploadRoot = IComponent<FileUploadRootProps>;

/**
 * ファイルアップロードのルートコンポーネントです。
 *
 * ファイルの選択状態を管理し、子パーツへ状態とスタイルを伝播します。
 */
export const FileUploadRoot: IFileUploadRoot = function SuiFileUploadRoot(props) {
  const {
    name,
    size = "md",
    color = "grey",
    value,
    accept,
    radius = size,
    variant = "liquid",
    children,
    disabled = false,
    maxFiles = Number.POSITIVE_INFINITY,
    multiple = false,
    required = false,
    maxFileSize = Number.POSITIVE_INFINITY,
    minFileSize = 0,
    defaultValue,
    onFileAccept,
    onFileReject,
    onValueChange,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherDivProps
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useControlled<readonly File[]>({
    name: "FileUpload",
    state: "value",
    default: defaultValue ?? [],
    controlled: value,
  });

  const commit = React.useCallback(
    (nextFiles: readonly File[]) => {
      setFiles(nextFiles);
      onValueChange?.(nextFiles.slice());
    },
    [onValueChange, setFiles],
  );

  const setInputElement = React.useCallback((element: HTMLInputElement | null) => {
    inputRef.current = element;
  }, []);

  const open = React.useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const clear = React.useCallback(() => {
    commit([]);
  }, [commit]);

  const remove = React.useCallback(
    (file: File) => {
      commit(files.filter((candidate) => candidate !== file));
    },
    [commit, files],
  );

  const selectFiles = React.useCallback(
    (incomingFiles: readonly File[]) => {
      const { accepted, rejected } = validateFiles(incomingFiles, files, {
        accept,
        maxFiles,
        multiple,
        maxFileSize,
        minFileSize,
      });
      if (rejected.length > 0) {
        onFileReject?.({ acceptedFiles: accepted, rejectedFiles: rejected });
      }
      if (accepted.length > 0) {
        const nextFiles = multiple ? [...files, ...accepted] : accepted;
        commit(nextFiles);
        onFileAccept?.({ files: accepted });
      }
    },
    [
      accept,
      commit,
      files,
      maxFileSize,
      maxFiles,
      minFileSize,
      multiple,
      onFileAccept,
      onFileReject,
    ],
  );

  const renderState = React.useMemo<FileUploadRootState>(
    () => ({
      name,
      size,
      color,
      files,
      accept:
        typeof accept === "string" ? accept : accept === undefined ? undefined : accept.join(","),
      radius,
      variant,
      disabled,
      multiple,
      required,
    }),
    [accept, color, disabled, files, multiple, name, radius, required, size, variant],
  );

  const ctx = React.useMemo<FileUploadContext>(
    () => ({ ...renderState, open, clear, remove, selectFiles, setInputElement }),
    [clear, open, remove, renderState, selectFiles, setInputElement],
  );

  const element = useRender({
    props: [
      otherDivProps,
      {
        children,
        className: cn<FileUploadRootState>(
          "sui_file_upload",
          (state) => `sui_file_upload-size_${state.size}`,
          (state) => `sui_file_upload-color_${state.color}`,
          (state) => `sui_file_upload-radius_${state.radius}`,
          (state) => `sui_file_upload-variant_${state.variant}`,
          (state) => state.disabled && "sui_file_upload-disabled",
        ),
        "data-scope": dataScope,
      },
    ],
    state: renderState,
    defaultTagName: "div",
  });

  return <FileUploadContext value={ctx}>{element}</FileUploadContext>;
};

export { FileUploadRoot as Root };

export namespace Root {
  export type State = FileUploadRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadRootProps.Render;

    export type SuruUI = FileUploadRootProps.SuruUI;

    export type BaseUI = FileUploadRootProps.BaseUI;

    export type HTML = FileUploadRootProps.HTML;
  }

  export type AcceptEventDetails = FileUploadAcceptEventDetails;

  export type Color = FileUploadRootColor;

  export type FileError = FileUploadFileError;

  export type FileErrorReason = FileUploadFileErrorReason;

  export type Radius = FileUploadRootRadius;

  export type RejectEventDetails = FileUploadRejectEventDetails;

  export type Size = FileUploadRootSize;

  export type Variant = FileUploadRootVariant;
}
