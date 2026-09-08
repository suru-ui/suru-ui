import { useControlled } from "@base-ui/utils/useControlled";
import type { Size, Color } from "@suru-ui/theme";
import * as React from "react";

import useRender, { type RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import { ContextMissingError } from "../errors.js";
import type { IComponent, IUseContext } from "../types.js";

import "./file-upload.css";

// Context
// -------

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
   * ドラッグ&ドロップなど、隠し input 以外の経路からファイルを受け取るときに使います。
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

// Root
// ----

/**
 * ファイルアップロードの配色です。
 */
export type FileUploadRootColor = Color;

/**
 * ファイルアップロードの角丸です。
 *
 * - `"none"`: 角を直角にする
 * - `"sm"`: 小さい角丸
 * - `"md"`: 標準的な角丸
 * - `"lg"`: 大きい角丸
 * - `"full"`: 完全な丸形
 */
export type FileUploadRootRadius = "none" | Size | "full";

/**
 * ファイルアップロードの大きさです。
 *
 * - `"sm"`: 小さいサイズ
 * - `"md"`: 標準的なサイズ
 * - `"lg"`: 大きいサイズ
 */
export type FileUploadRootSize = Size;

/**
 * ファイルアップロードの主な外観の種類です。
 *
 * - `"naked"`: 背景のないドロップゾーン
 * - `"liquid"`: 薄い塗りつぶし
 */
export type FileUploadRootVariant = "naked" | "liquid";

/**
 * ファイルが検証で拒否された理由です。
 *
 * - `"max_files"`: 選択できるファイル数を超えている
 * - `"min_size"`: ファイルサイズが小さすぎる
 * - `"max_size"`: ファイルサイズが大きすぎる
 */
export type FileUploadFileErrorReason = "max_files" | "min_size" | "max_size";

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
export type FileUploadRootState = {};

/**
 * {@link FileUploadRoot} に渡す props です。
 */
export type FileUploadRootProps = Omit<
  React.ComponentProps<"div">,
  keyof RenderProps | "defaultValue"
> &
  RenderProps<FileUploadRootState> & {
    /**
     * 選択できるファイルの種類を指定します。
     *
     * HTML の `accept` 属性と同じ形式の文字列、またはその配列を指定します。
     *
     * - 文字列の例: `"image/png,.pdf"`
     * - 配列の例: `["image/png", ".pdf"]`
     *
     * この指定はファイル選択ダイアログのフィルターに使われ、ブラウザーが対応している場合はドラッグ&ドロップにも適用されます。
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

/**
 * ファイルアップロードのルートコンポーネントです。
 *
 * ファイルの選択状態を管理し、子パーツへ状態とスタイルを伝播します。
 */
export const FileUploadRoot: IComponent<FileUploadRootProps> = function SuiFileUploadRoot(props) {
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
    className,
    maxFileSize = Number.POSITIVE_INFINITY,
    minFileSize = 0,
    defaultValue,
    onFileAccept,
    onFileReject,
    onValueChange,
    ...otherDivProps
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useControlled<readonly File[]>({
    controlled: value,
    default: defaultValue ?? [],
    name: "FileUpload",
    state: "value",
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
        maxFileSize,
        maxFiles,
        minFileSize,
        multiple,
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
    [commit, files, maxFileSize, maxFiles, minFileSize, multiple, onFileAccept, onFileReject],
  );

  const ctx = React.useMemo<FileUploadContext>(
    () => ({
      accept:
        typeof accept === "string" ? accept : accept === undefined ? undefined : accept.join(","),
      disabled,
      files,
      multiple,
      name,
      required,
      clear,
      open,
      remove,
      selectFiles,
      setInputElement,
    }),
    [
      accept,
      clear,
      disabled,
      files,
      multiple,
      name,
      open,
      remove,
      required,
      selectFiles,
      setInputElement,
    ],
  );

  const element = useRender({
    defaultTagName: "div",
    props: [
      otherDivProps,
      {
        children,
        className: cn(
          className,
          "sui_file_upload",
          `sui_file_upload-size_${size}`,
          `sui_file_upload-color_${color}`,
          `sui_file_upload-radius_${radius}`,
          `sui_file_upload-variant_${variant}`,
          disabled && "sui_file_upload-disabled",
        ),
        "data-scope": "",
      },
    ],
  });

  return <FileUploadContext value={ctx}>{element}</FileUploadContext>;
};

export { FileUploadRoot as Root };

/**
 * {@link FileUploadRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FileUploadRootState}
   */
  export type State = FileUploadRootState;

  /**
   * {@link FileUploadRootProps}
   */
  export type Props = FileUploadRootProps;

  /**
   * {@link FileUploadAcceptEventDetails}
   */
  export type AcceptEventDetails = FileUploadAcceptEventDetails;

  /**
   * {@link FileUploadRootColor}
   */
  export type Color = FileUploadRootColor;

  /**
   * {@link FileUploadFileError}
   */
  export type FileError = FileUploadFileError;

  /**
   * {@link FileUploadFileErrorReason}
   */
  export type FileErrorReason = FileUploadFileErrorReason;

  /**
   * {@link FileUploadRootRadius}
   */
  export type Radius = FileUploadRootRadius;

  /**
   * {@link FileUploadRejectEventDetails}
   */
  export type RejectEventDetails = FileUploadRejectEventDetails;

  /**
   * {@link FileUploadRootSize}
   */
  export type Size = FileUploadRootSize;

  /**
   * {@link FileUploadRootVariant}
   */
  export type Variant = FileUploadRootVariant;
}

// HiddenInput
// -----------

/**
 * {@link FileUploadHiddenInput} が持つ状態です。
 */
export type FileUploadHiddenInputState = {};

/**
 * {@link FileUploadHiddenInput} に渡す props です。
 *
 * `type`、`accept`、`multiple`、`required`、`name`、`onChange` はルートの設定から自動的に与えられます。
 */
export type FileUploadHiddenInputProps = Omit<
  React.ComponentProps<"input">,
  keyof RenderProps | "accept" | "children" | "multiple" | "name" | "onChange" | "required" | "type"
> &
  RenderProps<FileUploadHiddenInputState>;

/**
 * ファイル選択ダイアログの実体になる隠し input 要素です。
 *
 * {@link FileUploadRoot} の子として配置し、スクリーンリーダーとフォーム送信のために DOM に残ります。
 */
export const FileUploadHiddenInput: IComponent<FileUploadHiddenInputProps> =
  function SuiFileUploadHiddenInput(props) {
    const ctx = useFileUploadContext();

    return useRender({
      defaultTagName: "input",
      props: [
        props,
        {
          ref: ctx.setInputElement,
          accept: ctx.accept,
          disabled: ctx.disabled,
          multiple: ctx.multiple,
          name: ctx.name,
          required: ctx.required,
          type: "file",
          onChange(event: React.ChangeEvent<HTMLInputElement>) {
            const selectedFiles = Array.from(event.target.files ?? []);
            // 同じファイルを再度選んでも change イベントが発火するように、値を必ずリセットします。
            event.target.value = "";
            ctx.selectFiles(selectedFiles);
          },
          className: "sui_file_upload_hidden_input",
        },
      ],
    });
  };

export { FileUploadHiddenInput as HiddenInput };

/**
 * {@link FileUploadHiddenInput} の状態や props をまとめた型名前空間です。
 */
export namespace HiddenInput {
  /**
   * {@link FileUploadHiddenInputState}
   */
  export type State = FileUploadHiddenInputState;

  /**
   * {@link FileUploadHiddenInputProps}
   */
  export type Props = FileUploadHiddenInputProps;
}

// Trigger
// -------

/**
 * {@link FileUploadTrigger} が持つ状態です。
 */
export type FileUploadTriggerState = {};

/**
 * {@link FileUploadTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadTriggerProps = Omit<
  React.ComponentProps<"button">,
  keyof RenderProps | "onClick" | "type"
> &
  RenderProps<FileUploadTriggerState>;

/**
 * ファイル選択ダイアログを開くボタンです。
 */
export const FileUploadTrigger: IComponent<FileUploadTriggerProps> = function SuiFileUploadTrigger(
  props,
) {
  const ctx = useFileUploadContext(true);
  const { disabled: disabledProp, ...otherButtonProps } = props;
  const disabled = ctx?.disabled || disabledProp || false;

  return useRender({
    defaultTagName: "button",
    props: [
      otherButtonProps,
      {
        disabled,
        type: "button",
        onClick() {
          ctx?.open();
        },
        className: "sui_file_upload_trigger",
      },
    ],
  });
};

export { FileUploadTrigger as Trigger };

/**
 * {@link FileUploadTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link FileUploadTriggerState}
   */
  export type State = FileUploadTriggerState;

  /**
   * {@link FileUploadTriggerProps}
   */
  export type Props = FileUploadTriggerProps;
}

// Dropzone
// --------

/**
 * {@link FileUploadDropzone} が持つ状態です。
 */
export type FileUploadDropzoneState = {
  /**
   * ファイルがドラッグされているかどうかです。
   */
  readonly dragging?: boolean;
};

/**
 * {@link FileUploadDropzone} に渡す props です。
 *
 * クリックと Enter・Space キーでファイル選択ダイアログを開きます。
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadDropzoneProps = Omit<
  React.ComponentProps<"button">,
  keyof RenderProps | "onClick" | "type"
> &
  RenderProps<FileUploadDropzoneState>;

/**
 * ドラッグ&ドロップを受け付ける領域です。
 */
export const FileUploadDropzone: IComponent<FileUploadDropzoneProps> =
  function SuiFileUploadDropzone(props) {
    const ctx = useFileUploadContext(true);
    const { disabled: disabledProp, ...otherButtonProps } = props;
    const disabled = ctx?.disabled || disabledProp || false;
    const [dragging, setDragging] = React.useState(false);

    return useRender({
      defaultTagName: "button",
      state: { dragging },
      props: [
        otherButtonProps,
        {
          disabled,
          type: "button",
          onClick() {
            ctx?.open();
          },
          onDragEnter(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
            if (!disabled) {
              setDragging(true);
            }
          },
          onDragOver(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
          },
          onDragLeave() {
            setDragging(false);
          },
          onDrop(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
            setDragging(false);
            if (!disabled) {
              const droppedFiles = Array.from(event.dataTransfer?.files ?? []);
              ctx?.selectFiles(droppedFiles);
            }
          },
          className: cn<FileUploadDropzoneState>(
            "sui_file_upload_dropzone",
            (state) => state.dragging && "sui_file_upload_dropzone-dragover",
          ),
        },
      ],
    });
  };

export { FileUploadDropzone as Dropzone };

/**
 * {@link FileUploadDropzone} の状態や props をまとめた型名前空間です。
 */
export namespace Dropzone {
  /**
   * {@link FileUploadDropzoneState}
   */
  export type State = FileUploadDropzoneState;

  /**
   * {@link FileUploadDropzoneProps}
   */
  export type Props = FileUploadDropzoneProps;
}

// ClearTrigger
// ------------

/**
 * {@link FileUploadClearTrigger} が持つ状態です。
 */
export type FileUploadClearTriggerState = {};

/**
 * {@link FileUploadClearTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、ファイルが選択されていないときと {@link FileUploadRootProps.disabled|Root の disabled} のときに無効化されます。
 */
export type FileUploadClearTriggerProps = Omit<
  React.ComponentProps<"button">,
  keyof RenderProps | "onClick" | "type"
> &
  RenderProps<FileUploadClearTriggerState>;

/**
 * 選択済みのファイルをすべて削除するボタンです。
 */
export const FileUploadClearTrigger: IComponent<FileUploadClearTriggerProps> =
  function SuiFileUploadClearTrigger(props) {
    const ctx = useFileUploadContext(true);
    const { disabled: disabledProp, ...otherButtonProps } = props;
    const disabled =
      ctx === null
        ? (disabledProp ?? false)
        : ctx.disabled || disabledProp || ctx.files.length === 0;

    return useRender({
      defaultTagName: "button",
      props: [
        otherButtonProps,
        {
          disabled,
          type: "button",
          onClick() {
            ctx?.clear();
          },
          className: "sui_file_upload_clear_trigger",
        },
      ],
    });
  };

export { FileUploadClearTrigger as ClearTrigger };

/**
 * {@link FileUploadClearTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace ClearTrigger {
  /**
   * {@link FileUploadClearTriggerState}
   */
  export type State = FileUploadClearTriggerState;

  /**
   * {@link FileUploadClearTriggerProps}
   */
  export type Props = FileUploadClearTriggerProps;
}

// ItemGroup
// ---------

/**
 * {@link FileUploadItemGroup} が持つ状態です。
 */
export type FileUploadItemGroupState = {};

/**
 * {@link FileUploadItemGroup} に渡す props です。
 */
export type FileUploadItemGroupProps = Omit<React.ComponentProps<"ul">, keyof RenderProps> &
  RenderProps<FileUploadItemGroupState>;

/**
 * 選択済みファイルの一覧を包むコンテナーです。
 */
export const FileUploadItemGroup: IComponent<FileUploadItemGroupProps> =
  function SuiFileUploadItemGroup(props) {
    return useRender({
      defaultTagName: "ul",
      props: [
        props,
        {
          className: "sui_file_upload_item_group",
        },
      ],
    });
  };

export { FileUploadItemGroup as ItemGroup };

/**
 * {@link FileUploadItemGroup} の状態や props をまとめた型名前空間です。
 */
export namespace ItemGroup {
  /**
   * {@link FileUploadItemGroupState}
   */
  export type State = FileUploadItemGroupState;

  /**
   * {@link FileUploadItemGroupProps}
   */
  export type Props = FileUploadItemGroupProps;
}

// ItemContext
// -----------

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

// Item
// ----

/**
 * {@link FileUploadItem} が持つ状態です。
 */
export type FileUploadItemState = {};

/**
 * {@link FileUploadItem} に渡す props です。
 */
export type FileUploadItemProps = Omit<React.ComponentProps<"li">, keyof RenderProps> &
  RenderProps<FileUploadItemState> & {
    /**
     * 表示するファイルを指定します。
     */
    readonly file: File;
  };

/**
 * 選択済みファイル 1 件を表示する項目です。
 *
 * 子パーツへファイルを伝播します。
 */
export const FileUploadItem: IComponent<FileUploadItemProps> = function SuiFileUploadItem(props) {
  const { file, ...otherLiProps } = props;
  const ctx = React.useMemo<FileUploadItemContext>(() => ({ file }), [file]);
  const element = useRender({
    defaultTagName: "li",
    props: [
      otherLiProps,
      {
        className: "sui_file_upload_item",
      },
    ],
  });

  return <FileUploadItemContext value={ctx}>{element}</FileUploadItemContext>;
};

export { FileUploadItem as Item };

/**
 * {@link FileUploadItem} の状態や props をまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link FileUploadItemState}
   */
  export type State = FileUploadItemState;

  /**
   * {@link FileUploadItemProps}
   */
  export type Props = FileUploadItemProps;
}

// ItemName
// --------

/**
 * {@link FileUploadItemName} が持つ状態です。
 */
export type FileUploadItemNameState = {};

/**
 * {@link FileUploadItemName} に渡す props です。
 */
export type FileUploadItemNameProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<FileUploadItemNameState>;

/**
 * ファイル名を表示するコンポーネントです。
 */
export const FileUploadItemName: IComponent<FileUploadItemNameProps> =
  function SuiFileUploadItemName(props) {
    const { file } = useFileUploadItemContext();

    return useRender({
      defaultTagName: "span",
      props: [
        props,
        {
          children: file.name,
          className: "sui_file_upload_item_name",
        },
      ],
    });
  };

export { FileUploadItemName as ItemName };

/**
 * {@link FileUploadItemName} の状態や props をまとめた型名前空間です。
 */
export namespace ItemName {
  /**
   * {@link FileUploadItemNameState}
   */
  export type State = FileUploadItemNameState;

  /**
   * {@link FileUploadItemNameProps}
   */
  export type Props = FileUploadItemNameProps;
}

// ItemSizeText
// ------------

/**
 * {@link FileUploadItemSizeText} が持つ状態です。
 */
export type FileUploadItemSizeTextState = {};

/**
 * {@link FileUploadItemSizeText} に渡す props です。
 */
export type FileUploadItemSizeTextProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<FileUploadItemSizeTextState>;

/**
 * ファイルサイズを人間が読める形式で表示するコンポーネントです。
 */
export const FileUploadItemSizeText: IComponent<FileUploadItemSizeTextProps> =
  function SuiFileUploadItemSizeText(props) {
    const { file } = useFileUploadItemContext();

    return useRender({
      defaultTagName: "span",
      props: [
        props,
        {
          children: formatFileSize(file.size),
          className: "sui_file_upload_item_size_text",
        },
      ],
    });
  };

export { FileUploadItemSizeText as ItemSizeText };

/**
 * {@link FileUploadItemSizeText} の状態や props をまとめた型名前空間です。
 */
export namespace ItemSizeText {
  /**
   * {@link FileUploadItemSizeTextState}
   */
  export type State = FileUploadItemSizeTextState;

  /**
   * {@link FileUploadItemSizeTextProps}
   */
  export type Props = FileUploadItemSizeTextProps;
}

// ItemDeleteTrigger
// -----------------

/**
 * {@link FileUploadItemDeleteTrigger} が持つ状態です。
 */
export type FileUploadItemDeleteTriggerState = {};

/**
 * {@link FileUploadItemDeleteTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadItemDeleteTriggerProps = Omit<
  React.ComponentProps<"button">,
  keyof RenderProps | "onClick" | "type"
> &
  RenderProps<FileUploadItemDeleteTriggerState>;

/**
 * 対象のファイルを選択済みリストから削除するボタンです。
 */
export const FileUploadItemDeleteTrigger: IComponent<FileUploadItemDeleteTriggerProps> =
  function SuiFileUploadItemDeleteTrigger(props) {
    const ctx = useFileUploadContext(true);
    const { file } = useFileUploadItemContext();
    const { disabled: disabledProp, ...otherButtonProps } = props;
    const disabled =
      ctx === null ? (disabledProp ?? false) : ctx.disabled || (disabledProp ?? false);

    return useRender({
      defaultTagName: "button",
      props: [
        otherButtonProps,
        {
          disabled,
          type: "button",
          onClick() {
            ctx?.remove(file);
          },
          className: "sui_file_upload_item_delete_trigger",
        },
      ],
    });
  };

export { FileUploadItemDeleteTrigger as ItemDeleteTrigger };

/**
 * {@link FileUploadItemDeleteTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace ItemDeleteTrigger {
  /**
   * {@link FileUploadItemDeleteTriggerState}
   */
  export type State = FileUploadItemDeleteTriggerState;

  /**
   * {@link FileUploadItemDeleteTriggerProps}
   */
  export type Props = FileUploadItemDeleteTriggerProps;
}

// Helpers
// -------

const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

// ファイルサイズを 1024 進法の人間が読める形式へ整形します。
function formatFileSize(bytes: number): string {
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
function validateFiles(
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
