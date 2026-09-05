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
  const context = React.use(FileUploadContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "FileUploadContext",
      providerName: "FileUploadRoot",
    });
  }

  return context;
}

/**
 * {@link FileUploadContext} を読み取るフックです。
 */
export const useFileUploadContext: IUseContext<FileUploadContext> = useSuiFileUploadContext;

/**
 * {@link FileUploadContext} です。
 */
export type Context = FileUploadContext;

/**
 * {@link FileUploadContext} です。
 */
export const Context: React.Context<Context | null> = FileUploadContext;

/**
 * {@link useFileUploadContext} です。
 */
export const useContext: IUseContext<Context> = useFileUploadContext;

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
 * {@link FileUploadRoot} の状態です。
 */
export type FileUploadRootState = {};

/**
 * {@link FileUploadRoot} に渡すプロパティーです。
 */
export type FileUploadRootProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
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
   * 子パーツのプロパティーより優先されます。
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
   * @default Infinity
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
    size = "md",
    color = "grey",
    radius = size,
    variant = "liquid",
    accept,
    defaultValue,
    disabled = false,
    maxFiles = Number.POSITIVE_INFINITY,
    maxFileSize = Number.POSITIVE_INFINITY,
    minFileSize = 0,
    multiple = false,
    name,
    required = false,
    value,
    onValueChange,
    onFileAccept,
    onFileReject,
    className,
    children,
    ...otherProps
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [filesState, setFilesState] = React.useState<readonly File[]>(defaultValue ?? []);
  const files = value ?? filesState;

  const commit = React.useCallback(
    (nextFiles: readonly File[]) => {
      if (value === undefined) {
        setFilesState(nextFiles);
      }
      onValueChange?.(nextFiles.slice());
    },
    [onValueChange, value],
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

  const context = React.useMemo<FileUploadContext>(
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

  return (
    <Context value={context}>
      <div
        {...otherProps}
        className={cn(
          className,
          "sui_file_upload",
          `sui_file_upload-size_${size}`,
          `sui_file_upload-color_${color}`,
          `sui_file_upload-radius_${radius}`,
          `sui_file_upload-variant_${variant}`,
          disabled && "sui_file_upload-disabled",
        )}
      >
        {children}
      </div>
    </Context>
  );
};

/**
 * {@link FileUploadRoot} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Root {
  /**
   * {@link FileUploadRootState} です。
   */
  export type State = FileUploadRootState;

  /**
   * {@link FileUploadRootProps} です。
   */
  export type Props = FileUploadRootProps;

  /**
   * {@link FileUploadAcceptEventDetails} です。
   */
  export type AcceptEventDetails = FileUploadAcceptEventDetails;

  /**
   * {@link FileUploadRootColor} です。
   */
  export type Color = FileUploadRootColor;

  /**
   * {@link FileUploadFileError} です。
   */
  export type FileError = FileUploadFileError;

  /**
   * {@link FileUploadFileErrorReason} です。
   */
  export type FileErrorReason = FileUploadFileErrorReason;

  /**
   * {@link FileUploadRootRadius} です。
   */
  export type Radius = FileUploadRootRadius;

  /**
   * {@link FileUploadRejectEventDetails} です。
   */
  export type RejectEventDetails = FileUploadRejectEventDetails;

  /**
   * {@link FileUploadRootSize} です。
   */
  export type Size = FileUploadRootSize;

  /**
   * {@link FileUploadRootVariant} です。
   */
  export type Variant = FileUploadRootVariant;
}

/**
 * {@link FileUploadRoot} です。
 */
export const Root: IComponent<Root.Props> = FileUploadRoot;

// HiddenInput
// -----------

/**
 * {@link FileUploadHiddenInput} の状態です。
 */
export type FileUploadHiddenInputState = {};

/**
 * {@link FileUploadHiddenInput} に渡すプロパティーです。
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
    const { accept, disabled, multiple, name, required, selectFiles, setInputElement } =
      useSuiFileUploadContext();

    return useRender({
      defaultTagName: "input",
      props: [
        props,
        {
          ref: setInputElement,
          accept,
          disabled,
          multiple,
          name,
          required,
          type: "file",
          onChange(event: React.ChangeEvent<HTMLInputElement>) {
            const selectedFiles = Array.from(event.target.files ?? []);
            // 同じファイルを再度選んでも change イベントが発火するように、値を必ずリセットします。
            event.target.value = "";
            selectFiles(selectedFiles);
          },
          className: "sui_file_upload_hidden_input",
        },
      ],
    });
  };

/**
 * {@link FileUploadHiddenInput} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace HiddenInput {
  /**
   * {@link FileUploadHiddenInputState} です。
   */
  export type State = FileUploadHiddenInputState;

  /**
   * {@link FileUploadHiddenInputProps} です。
   */
  export type Props = FileUploadHiddenInputProps;
}

/**
 * {@link FileUploadHiddenInput} です。
 */
export const HiddenInput: IComponent<HiddenInput.Props> = FileUploadHiddenInput;

// Trigger
// -------

/**
 * {@link FileUploadTrigger} の状態です。
 */
export type FileUploadTriggerState = {};

/**
 * {@link FileUploadTrigger} に渡すプロパティーです。
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
  const context = useSuiFileUploadContext(true);
  const { disabled: disabledProp, ...otherProps } = props;
  const disabled = context?.disabled ?? disabledProp ?? false;

  return useRender({
    defaultTagName: "button",
    props: [
      otherProps,
      {
        disabled,
        type: "button",
        onClick() {
          context?.open();
        },
        className: "sui_file_upload_trigger",
      },
    ],
  });
};

/**
 * {@link FileUploadTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Trigger {
  /**
   * {@link FileUploadTriggerState} です。
   */
  export type State = FileUploadTriggerState;

  /**
   * {@link FileUploadTriggerProps} です。
   */
  export type Props = FileUploadTriggerProps;
}

/**
 * {@link FileUploadTrigger} です。
 */
export const Trigger: IComponent<Trigger.Props> = FileUploadTrigger;

// Dropzone
// --------

/**
 * {@link FileUploadDropzone} の状態です。
 */
export type FileUploadDropzoneState = {
  /**
   * ファイルがドラッグされているかどうかです。
   */
  dragging?: boolean;
};

/**
 * {@link FileUploadDropzone} に渡すプロパティーです。
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
    const context = useSuiFileUploadContext(true);
    const { disabled: disabledProp, ...otherProps } = props;
    const disabled = context?.disabled ?? disabledProp ?? false;
    const [dragging, setDragging] = React.useState(false);

    return useRender({
      defaultTagName: "button",
      state: { dragging },
      props: [
        otherProps,
        {
          disabled,
          type: "button",
          onClick() {
            context?.open();
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
              context?.selectFiles(droppedFiles);
            }
          },
          className: cn(
            "sui_file_upload_dropzone",
            dragging && "sui_file_upload_dropzone-dragover",
          ),
        },
      ],
    });
  };

/**
 * {@link FileUploadDropzone} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Dropzone {
  /**
   * {@link FileUploadDropzoneState} です。
   */
  export type State = FileUploadDropzoneState;

  /**
   * {@link FileUploadDropzoneProps} です。
   */
  export type Props = FileUploadDropzoneProps;
}

/**
 * {@link FileUploadDropzone} です。
 */
export const Dropzone: IComponent<Dropzone.Props> = FileUploadDropzone;

// ClearTrigger
// ------------

/**
 * {@link FileUploadClearTrigger} の状態です。
 */
export type FileUploadClearTriggerState = {};

/**
 * {@link FileUploadClearTrigger} に渡すプロパティーです。
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
    const context = useSuiFileUploadContext(true);
    const { disabled: disabledProp, ...otherProps } = props;
    const disabled =
      context === null
        ? (disabledProp ?? false)
        : context.disabled || disabledProp || context.files.length === 0;

    return useRender({
      defaultTagName: "button",
      props: [
        otherProps,
        {
          disabled,
          type: "button",
          onClick() {
            context?.clear();
          },
          className: "sui_file_upload_clear_trigger",
        },
      ],
    });
  };

/**
 * {@link FileUploadClearTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ClearTrigger {
  /**
   * {@link FileUploadClearTriggerState} です。
   */
  export type State = FileUploadClearTriggerState;

  /**
   * {@link FileUploadClearTriggerProps} です。
   */
  export type Props = FileUploadClearTriggerProps;
}

/**
 * {@link FileUploadClearTrigger} です。
 */
export const ClearTrigger: IComponent<ClearTrigger.Props> = FileUploadClearTrigger;

// ItemGroup
// ---------

/**
 * {@link FileUploadItemGroup} の状態です。
 */
export type FileUploadItemGroupState = {};

/**
 * {@link FileUploadItemGroup} に渡すプロパティーです。
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

/**
 * {@link FileUploadItemGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemGroup {
  /**
   * {@link FileUploadItemGroupState} です。
   */
  export type State = FileUploadItemGroupState;

  /**
   * {@link FileUploadItemGroupProps} です。
   */
  export type Props = FileUploadItemGroupProps;
}

/**
 * {@link FileUploadItemGroup} です。
 */
export const ItemGroup: IComponent<ItemGroup.Props> = FileUploadItemGroup;

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
  const context = React.use(FileUploadItemContext);
  if (context === null && !optional) {
    throw new ContextMissingError({
      contextName: "FileUploadItemContext",
      providerName: "FileUploadItem",
    });
  }

  return context;
}

/**
 * {@link FileUploadItemContext} を読み取るフックです。
 */
export const useFileUploadItemContext: IUseContext<FileUploadItemContext> =
  useSuiFileUploadItemContext;

/**
 * {@link FileUploadItemContext} です。
 */
export type ItemContext = FileUploadItemContext;

/**
 * {@link FileUploadItemContext} です。
 */
export const ItemContext: React.Context<ItemContext | null> = FileUploadItemContext;

/**
 * {@link useFileUploadItemContext} です。
 */
export const useItemContext: IUseContext<ItemContext> = useFileUploadItemContext;

// Item
// ----

/**
 * {@link FileUploadItem} の状態です。
 */
export type FileUploadItemState = {};

/**
 * {@link FileUploadItem} に渡すプロパティーです。
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
  const { file, ...otherProps } = props;
  const context = React.useMemo<FileUploadItemContext>(() => ({ file }), [file]);
  const element = useRender({
    defaultTagName: "li",
    props: [
      otherProps,
      {
        className: "sui_file_upload_item",
      },
    ],
  });

  return <ItemContext value={context}>{element}</ItemContext>;
};

/**
 * {@link FileUploadItem} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace Item {
  /**
   * {@link FileUploadItemState} です。
   */
  export type State = FileUploadItemState;

  /**
   * {@link FileUploadItemProps} です。
   */
  export type Props = FileUploadItemProps;
}

/**
 * {@link FileUploadItem} です。
 */
export const Item: IComponent<Item.Props> = FileUploadItem;

// ItemName
// --------

/**
 * {@link FileUploadItemName} の状態です。
 */
export type FileUploadItemNameState = {};

/**
 * {@link FileUploadItemName} に渡すプロパティーです。
 */
export type FileUploadItemNameProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<FileUploadItemNameState>;

/**
 * ファイル名を表示するコンポーネントです。
 */
export const FileUploadItemName: IComponent<FileUploadItemNameProps> =
  function SuiFileUploadItemName(props) {
    const { file } = useSuiFileUploadItemContext();

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

/**
 * {@link FileUploadItemName} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemName {
  /**
   * {@link FileUploadItemNameState} です。
   */
  export type State = FileUploadItemNameState;

  /**
   * {@link FileUploadItemNameProps} です。
   */
  export type Props = FileUploadItemNameProps;
}

/**
 * {@link FileUploadItemName} です。
 */
export const ItemName: IComponent<ItemName.Props> = FileUploadItemName;

// ItemSizeText
// ------------

/**
 * {@link FileUploadItemSizeText} の状態です。
 */
export type FileUploadItemSizeTextState = {};

/**
 * {@link FileUploadItemSizeText} に渡すプロパティーです。
 */
export type FileUploadItemSizeTextProps = Omit<React.ComponentProps<"span">, keyof RenderProps> &
  RenderProps<FileUploadItemSizeTextState>;

/**
 * ファイルサイズを人間が読める形式で表示するコンポーネントです。
 */
export const FileUploadItemSizeText: IComponent<FileUploadItemSizeTextProps> =
  function SuiFileUploadItemSizeText(props) {
    const { file } = useSuiFileUploadItemContext();

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

/**
 * {@link FileUploadItemSizeText} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemSizeText {
  /**
   * {@link FileUploadItemSizeTextState} です。
   */
  export type State = FileUploadItemSizeTextState;

  /**
   * {@link FileUploadItemSizeTextProps} です。
   */
  export type Props = FileUploadItemSizeTextProps;
}

/**
 * {@link FileUploadItemSizeText} です。
 */
export const ItemSizeText: IComponent<ItemSizeText.Props> = FileUploadItemSizeText;

// ItemDeleteTrigger
// -----------------

/**
 * {@link FileUploadItemDeleteTrigger} の状態です。
 */
export type FileUploadItemDeleteTriggerState = {};

/**
 * {@link FileUploadItemDeleteTrigger} に渡すプロパティーです。
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
    const context = useSuiFileUploadContext(true);
    const { file } = useSuiFileUploadItemContext();
    const { disabled: disabledProp, ...otherProps } = props;
    const disabled =
      context === null ? (disabledProp ?? false) : context.disabled || (disabledProp ?? false);

    return useRender({
      defaultTagName: "button",
      props: [
        otherProps,
        {
          disabled,
          type: "button",
          onClick() {
            context?.remove(file);
          },
          className: "sui_file_upload_item_delete_trigger",
        },
      ],
    });
  };

/**
 * {@link FileUploadItemDeleteTrigger} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ItemDeleteTrigger {
  /**
   * {@link FileUploadItemDeleteTriggerState} です。
   */
  export type State = FileUploadItemDeleteTriggerState;

  /**
   * {@link FileUploadItemDeleteTriggerProps} です。
   */
  export type Props = FileUploadItemDeleteTriggerProps;
}

/**
 * {@link FileUploadItemDeleteTrigger} です。
 */
export const ItemDeleteTrigger: IComponent<ItemDeleteTrigger.Props> = FileUploadItemDeleteTrigger;

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
