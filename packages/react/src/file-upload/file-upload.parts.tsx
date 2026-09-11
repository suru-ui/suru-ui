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

  export type HTML = Omit<React.ComponentProps<"div">, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadRoot} に渡す props です。
 */
export type FileUploadRootProps = FileUploadRootProps.Render &
  FileUploadRootProps.SuruUI &
  FileUploadRootProps.HTML;

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
    [commit, files, maxFileSize, maxFiles, minFileSize, multiple, onFileAccept, onFileReject],
  );

  const ctx = React.useMemo<FileUploadContext>(
    () => ({
      name,
      open,
      clear,
      files,
      accept:
        typeof accept === "string" ? accept : accept === undefined ? undefined : accept.join(","),
      remove,
      disabled,
      multiple,
      required,
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
    props: [
      otherDivProps,
      {
        children,
        className: cn<FileUploadRootState>(
          "sui_file_upload",
          `sui_file_upload-size_${size}`,
          `sui_file_upload-color_${color}`,
          `sui_file_upload-radius_${radius}`,
          `sui_file_upload-variant_${variant}`,
          disabled && "sui_file_upload-disabled",
        ),
        "data-scope": dataScope,
      },
    ],
    defaultTagName: "div",
  });

  return <FileUploadContext value={ctx}>{element}</FileUploadContext>;
};

export { FileUploadRoot as Root };

/**
 * {@link FileUploadRoot} の状態や props をまとめた型名前空間です。
 */
export namespace Root {
  export type State = FileUploadRootState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadRootProps.Render;

    export type SuruUI = FileUploadRootProps.SuruUI;

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

// HiddenInput
// -----------

/**
 * {@link FileUploadHiddenInput} が持つ状態です。
 */
export type FileUploadHiddenInputState = {};

export namespace FileUploadHiddenInputProps {
  export type Render = RenderProps<FileUploadHiddenInputState>;

  export type SuruUI = {};

  export type HTML = Omit<
    React.ComponentProps<"input">,
    | keyof Render
    | keyof SuruUI
    | "accept"
    | "children"
    | "multiple"
    | "name"
    | "onChange"
    | "required"
    | "type"
  >;
}

/**
 * {@link FileUploadHiddenInput} に渡す props です。
 *
 * `type`、`accept`、`multiple`、`required`、`name`、`onChange` はルートの設定から自動的に与えられます。
 */
export type FileUploadHiddenInputProps = FileUploadHiddenInputProps.Render &
  FileUploadHiddenInputProps.SuruUI &
  FileUploadHiddenInputProps.HTML;

/**
 * ファイル選択ダイアログの実体になる隠し input 要素です。
 *
 * {@link FileUploadRoot} の子として配置し、スクリーンリーダーとフォーム送信のために DOM に残ります。
 */
export const FileUploadHiddenInput: IComponent<FileUploadHiddenInputProps> =
  function SuiFileUploadHiddenInput(props) {
    const ctx = useFileUploadContext();

    return useRender({
      props: [
        props,
        {
          ref: ctx.setInputElement,
          name: ctx.name,
          type: "file",
          accept: ctx.accept,
          disabled: ctx.disabled,
          multiple: ctx.multiple,
          onChange(event: React.ChangeEvent<HTMLInputElement>) {
            const selectedFiles = Array.from(event.target.files ?? []);
            // 同じファイルを再度選んでも change イベントが発火するように、値を必ずリセットします。
            event.target.value = "";
            ctx.selectFiles(selectedFiles);
          },
          required: ctx.required,
          className: "sui_file_upload_hidden_input",
        },
      ],
      defaultTagName: "input",
    });
  };

export { FileUploadHiddenInput as HiddenInput };

/**
 * {@link FileUploadHiddenInput} の状態や props をまとめた型名前空間です。
 */
export namespace HiddenInput {
  export type State = FileUploadHiddenInputState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadHiddenInputProps.Render;

    export type SuruUI = FileUploadHiddenInputProps.SuruUI;

    export type HTML = FileUploadHiddenInputProps.HTML;
  }
}

// Trigger
// -------

/**
 * {@link FileUploadTrigger} が持つ状態です。
 */
export type FileUploadTriggerState = {};

export namespace FileUploadTriggerProps {
  export type Render = RenderProps<FileUploadTriggerState>;

  export type SuruUI = {};

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | "onClick" | "type"
  >;
}

/**
 * {@link FileUploadTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadTriggerProps = FileUploadTriggerProps.Render &
  FileUploadTriggerProps.SuruUI &
  FileUploadTriggerProps.HTML;

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
    props: [
      otherButtonProps,
      {
        type: "button",
        onClick() {
          ctx?.open();
        },
        disabled,
        className: "sui_file_upload_trigger",
      },
    ],
    defaultTagName: "button",
  });
};

export { FileUploadTrigger as Trigger };

/**
 * {@link FileUploadTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace Trigger {
  export type State = FileUploadTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadTriggerProps.Render;

    export type SuruUI = FileUploadTriggerProps.SuruUI;

    export type HTML = FileUploadTriggerProps.HTML;
  }
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

export namespace FileUploadDropzoneProps {
  export type Render = RenderProps<FileUploadDropzoneState>;

  export type SuruUI = {};

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | "onClick" | "type"
  >;
}

/**
 * {@link FileUploadDropzone} に渡す props です。
 *
 * クリックと Enter・Space キーでファイル選択ダイアログを開きます。
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadDropzoneProps = FileUploadDropzoneProps.Render &
  FileUploadDropzoneProps.SuruUI &
  FileUploadDropzoneProps.HTML;

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
      props: [
        otherButtonProps,
        {
          type: "button",
          onDrop(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
            setDragging(false);
            if (!disabled) {
              const droppedFiles = Array.from(event.dataTransfer?.files ?? []);
              ctx?.selectFiles(droppedFiles);
            }
          },
          onClick() {
            ctx?.open();
          },
          disabled,
          className: cn<FileUploadDropzoneState>(
            "sui_file_upload_dropzone",
            (state) => state.dragging && "sui_file_upload_dropzone-dragover",
          ),
          onDragOver(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
          },
          onDragEnter(event: React.DragEvent<HTMLButtonElement>) {
            event.preventDefault();
            if (!disabled) {
              setDragging(true);
            }
          },
          onDragLeave() {
            setDragging(false);
          },
        },
      ],
      state: { dragging },
      defaultTagName: "button",
    });
  };

export { FileUploadDropzone as Dropzone };

/**
 * {@link FileUploadDropzone} の状態や props をまとめた型名前空間です。
 */
export namespace Dropzone {
  export type State = FileUploadDropzoneState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadDropzoneProps.Render;

    export type SuruUI = FileUploadDropzoneProps.SuruUI;

    export type HTML = FileUploadDropzoneProps.HTML;
  }
}

// ClearTrigger
// ------------

/**
 * {@link FileUploadClearTrigger} が持つ状態です。
 */
export type FileUploadClearTriggerState = {};

export namespace FileUploadClearTriggerProps {
  export type Render = RenderProps<FileUploadClearTriggerState>;

  export type SuruUI = {};

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | "onClick" | "type"
  >;
}

/**
 * {@link FileUploadClearTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、ファイルが選択されていないときと {@link FileUploadRootProps.disabled|Root の disabled} のときに無効化されます。
 */
export type FileUploadClearTriggerProps = FileUploadClearTriggerProps.Render &
  FileUploadClearTriggerProps.SuruUI &
  FileUploadClearTriggerProps.HTML;

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
        : ctx.disabled || (disabledProp ?? false) || ctx.files.length === 0;

    return useRender({
      props: [
        otherButtonProps,
        {
          type: "button",
          onClick() {
            ctx?.clear();
          },
          disabled,
          className: "sui_file_upload_clear_trigger",
        },
      ],
      defaultTagName: "button",
    });
  };

export { FileUploadClearTrigger as ClearTrigger };

/**
 * {@link FileUploadClearTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace ClearTrigger {
  export type State = FileUploadClearTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadClearTriggerProps.Render;

    export type SuruUI = FileUploadClearTriggerProps.SuruUI;

    export type HTML = FileUploadClearTriggerProps.HTML;
  }
}

// ItemGroup
// ---------

/**
 * {@link FileUploadItemGroup} が持つ状態です。
 */
export type FileUploadItemGroupState = {};

export namespace FileUploadItemGroupProps {
  export type Render = RenderProps<FileUploadItemGroupState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"ul">, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadItemGroup} に渡す props です。
 */
export type FileUploadItemGroupProps = FileUploadItemGroupProps.Render &
  FileUploadItemGroupProps.SuruUI &
  FileUploadItemGroupProps.HTML;

/**
 * 選択済みファイルの一覧を包むコンテナーです。
 */
export const FileUploadItemGroup: IComponent<FileUploadItemGroupProps> =
  function SuiFileUploadItemGroup(props) {
    return useRender({
      props: [
        props,
        {
          className: "sui_file_upload_item_group",
        },
      ],
      defaultTagName: "ul",
    });
  };

export { FileUploadItemGroup as ItemGroup };

/**
 * {@link FileUploadItemGroup} の状態や props をまとめた型名前空間です。
 */
export namespace ItemGroup {
  export type State = FileUploadItemGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemGroupProps.Render;

    export type SuruUI = FileUploadItemGroupProps.SuruUI;

    export type HTML = FileUploadItemGroupProps.HTML;
  }
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

export namespace FileUploadItemProps {
  export type Render = RenderProps<FileUploadItemState>;

  export type SuruUI = {
    /**
     * 表示するファイルを指定します。
     */
    readonly file: File;
  };

  export type HTML = Omit<React.ComponentProps<"li">, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadItem} に渡す props です。
 */
export type FileUploadItemProps = FileUploadItemProps.Render &
  FileUploadItemProps.SuruUI &
  FileUploadItemProps.HTML;

/**
 * 選択済みファイル 1 件を表示する項目です。
 *
 * 子パーツへファイルを伝播します。
 */
export const FileUploadItem: IComponent<FileUploadItemProps> = function SuiFileUploadItem(props) {
  const { file, ...otherLiProps } = props;
  const ctx = React.useMemo<FileUploadItemContext>(() => ({ file }), [file]);
  const element = useRender({
    props: [
      otherLiProps,
      {
        className: "sui_file_upload_item",
      },
    ],
    defaultTagName: "li",
  });

  return <FileUploadItemContext value={ctx}>{element}</FileUploadItemContext>;
};

export { FileUploadItem as Item };

/**
 * {@link FileUploadItem} の状態や props をまとめた型名前空間です。
 */
export namespace Item {
  export type State = FileUploadItemState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemProps.Render;

    export type SuruUI = FileUploadItemProps.SuruUI;

    export type HTML = FileUploadItemProps.HTML;
  }
}

// ItemName
// --------

/**
 * {@link FileUploadItemName} が持つ状態です。
 */
export type FileUploadItemNameState = {};

export namespace FileUploadItemNameProps {
  export type Render = RenderProps<FileUploadItemNameState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadItemName} に渡す props です。
 */
export type FileUploadItemNameProps = FileUploadItemNameProps.Render &
  FileUploadItemNameProps.SuruUI &
  FileUploadItemNameProps.HTML;

/**
 * ファイル名を表示するコンポーネントです。
 */
export const FileUploadItemName: IComponent<FileUploadItemNameProps> =
  function SuiFileUploadItemName(props) {
    const { file } = useFileUploadItemContext();

    return useRender({
      props: [
        props,
        {
          children: file.name,
          className: "sui_file_upload_item_name",
        },
      ],
      defaultTagName: "span",
    });
  };

export { FileUploadItemName as ItemName };

/**
 * {@link FileUploadItemName} の状態や props をまとめた型名前空間です。
 */
export namespace ItemName {
  export type State = FileUploadItemNameState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemNameProps.Render;

    export type SuruUI = FileUploadItemNameProps.SuruUI;

    export type HTML = FileUploadItemNameProps.HTML;
  }
}

// ItemSizeText
// ------------

/**
 * {@link FileUploadItemSizeText} が持つ状態です。
 */
export type FileUploadItemSizeTextState = {};

export namespace FileUploadItemSizeTextProps {
  export type Render = RenderProps<FileUploadItemSizeTextState>;

  export type SuruUI = {};

  export type HTML = Omit<React.ComponentProps<"span">, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadItemSizeText} に渡す props です。
 */
export type FileUploadItemSizeTextProps = FileUploadItemSizeTextProps.Render &
  FileUploadItemSizeTextProps.SuruUI &
  FileUploadItemSizeTextProps.HTML;

/**
 * ファイルサイズを人間が読める形式で表示するコンポーネントです。
 */
export const FileUploadItemSizeText: IComponent<FileUploadItemSizeTextProps> =
  function SuiFileUploadItemSizeText(props) {
    const { file } = useFileUploadItemContext();

    return useRender({
      props: [
        props,
        {
          children: formatFileSize(file.size),
          className: "sui_file_upload_item_size_text",
        },
      ],
      defaultTagName: "span",
    });
  };

export { FileUploadItemSizeText as ItemSizeText };

/**
 * {@link FileUploadItemSizeText} の状態や props をまとめた型名前空間です。
 */
export namespace ItemSizeText {
  export type State = FileUploadItemSizeTextState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemSizeTextProps.Render;

    export type SuruUI = FileUploadItemSizeTextProps.SuruUI;

    export type HTML = FileUploadItemSizeTextProps.HTML;
  }
}

// ItemDeleteTrigger
// -----------------

/**
 * {@link FileUploadItemDeleteTrigger} が持つ状態です。
 */
export type FileUploadItemDeleteTriggerState = {};

export namespace FileUploadItemDeleteTriggerProps {
  export type Render = RenderProps<FileUploadItemDeleteTriggerState>;

  export type SuruUI = {};

  export type HTML = Omit<
    React.ComponentProps<"button">,
    keyof Render | keyof SuruUI | "onClick" | "type"
  >;
}

/**
 * {@link FileUploadItemDeleteTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadItemDeleteTriggerProps = FileUploadItemDeleteTriggerProps.Render &
  FileUploadItemDeleteTriggerProps.SuruUI &
  FileUploadItemDeleteTriggerProps.HTML;

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
      props: [
        otherButtonProps,
        {
          type: "button",
          onClick() {
            ctx?.remove(file);
          },
          disabled,
          className: "sui_file_upload_item_delete_trigger",
        },
      ],
      defaultTagName: "button",
    });
  };

export { FileUploadItemDeleteTrigger as ItemDeleteTrigger };

/**
 * {@link FileUploadItemDeleteTrigger} の状態や props をまとめた型名前空間です。
 */
export namespace ItemDeleteTrigger {
  export type State = FileUploadItemDeleteTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemDeleteTriggerProps.Render;

    export type SuruUI = FileUploadItemDeleteTriggerProps.SuruUI;

    export type HTML = FileUploadItemDeleteTriggerProps.HTML;
  }
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
