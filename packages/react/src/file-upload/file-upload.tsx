import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type FileUploadRootSize,
  type FileUploadFileError,
  type FileUploadItemProps,
  type FileUploadRootColor,
  type FileUploadRootProps,
  type FileUploadRootState,
  type FileUploadRootRadius,
  type FileUploadRootVariant,
  type FileUploadDropzoneProps,
  type FileUploadItemNameProps,
  type FileUploadItemGroupProps,
  type FileUploadFileErrorReason,
  type FileUploadHiddenInputProps,
  type FileUploadItemSizeTextProps,
  type FileUploadAcceptEventDetails,
  type FileUploadRejectEventDetails,
  type FileUploadItemDeleteTriggerProps,
  FileUploadItem,
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadItemName,
  FileUploadItemGroup,
  useFileUploadContext,
  FileUploadHiddenInput,
  FileUploadItemSizeText,
  FileUploadItemDeleteTrigger,
} from "./file-upload.parts.js";

// Types.

export type FileUploadColor = FileUploadRootColor;

export type FileUploadRadius = FileUploadRootRadius;

export type FileUploadSize = FileUploadRootSize;

export type FileUploadVariant = FileUploadRootVariant;

/**
 * {@link FileUpload} の各パーツに渡す props です。
 */
export type FileUploadSlotProps = {
  /**
   * {@link FileUploadDropzone} に渡す props です。
   */
  readonly dropzone?: Omit<FileUploadDropzoneProps, "children"> | undefined;

  /**
   * {@link FileUploadHiddenInput} に渡す props です。
   */
  readonly hiddenInput?: FileUploadHiddenInputProps | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItem} に渡す props です。
   *
   * `children` と `file` は上書きされません。
   */
  readonly item?: Omit<FileUploadItemProps, "children" | "file"> | undefined;

  /** 選択済みファイルごとの {@link FileUploadItemDeleteTrigger} に渡す props です。 */
  readonly itemDeleteTrigger?: FileUploadItemDeleteTriggerProps | undefined;

  /**
   * {@link FileUploadItemGroup} に渡す props です。
   */
  readonly itemGroup?: Omit<FileUploadItemGroupProps, "children"> | undefined;

  /** 選択済みファイルごとの {@link FileUploadItemName} に渡す props です。 */
  readonly itemName?: Omit<FileUploadItemNameProps, "children"> | undefined;

  /** 選択済みファイルごとの {@link FileUploadItemSizeText} に渡す props です。 */
  readonly itemSizeText?: Omit<FileUploadItemSizeTextProps, "children"> | undefined;
};

/**
 * {@link FileUpload} が持つ状態です。
 */
export type FileUploadState = FileUploadRootState;

namespace FileUploadProps {
  export type Dropzone = Pick<FileUploadDropzoneProps, "children">;

  export type FileUpload = {
    /** 各パーツに個別の props を渡すためのオブジェクトです。 */
    slotProps?: FileUploadSlotProps | undefined;
  };

  export type Root = Omit<FileUploadRootProps, keyof FileUpload | keyof Dropzone>;
}

/**
 * {@link FileUpload} に渡す props です。
 */
export type FileUploadProps = FileUploadProps.FileUpload &
  FileUploadProps.Root &
  FileUploadProps.Dropzone;

export type IFileUpload = IComponent<FileUploadProps>;

export interface IUseFileUploadAPI {
  /**
   * {@link FileUploadAPI} を作成します。
   *
   * @param props {@link FileUpload} の props です。
   *
   * @returns ファイルアップロードの API です
   */
  (props: FileUploadProps): FileUploadAPI;
}

// API.

/**
 * {@link FileUpload} を構成する各パーツの props などを作成するための API です。
 */
export class FileUploadAPI {
  private readonly dropzoneProps: Required<FileUploadProps.Dropzone>;

  private readonly slotProps: FileUploadSlotProps;

  private readonly rootProps: Omit<FileUploadRootProps, "children">;

  /**
   * @param props {@link FileUpload} の props です。
   *
   * @internal
   */
  public constructor(props: FileUploadProps) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.dropzoneProps = {
      children,
    };
    this.slotProps = slotProps;
    this.rootProps = rootProps;
  }

  /**
   * {@link FileUploadDropzone} に渡す props を取得します。
   */
  public getDropzoneProps(): FileUploadDropzoneProps {
    const { children = "ここにファイルをドラッグアンドドロップ、またはクリックして選択" } =
      this.dropzoneProps;
    const { dropzone: props = {} } = this.slotProps;

    return {
      ...props,
      children,
    };
  }

  /**
   * {@link FileUploadHiddenInput} に渡す props を取得します。
   */
  public getHiddenInputProps(): FileUploadHiddenInputProps {
    const { hiddenInput: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link FileUploadItemDeleteTrigger} に渡す props を取得します。
   */
  public getItemDeleteTriggerProps(): FileUploadItemDeleteTriggerProps {
    const { itemDeleteTrigger: props = {} } = this.slotProps;
    const { children = "×", ...otherProps } = props;

    return {
      ...otherProps,
      children,
    };
  }

  /**
   * {@link FileUploadItemGroup} に渡す props を取得します。
   */
  public getItemGroupProps(): Omit<FileUploadItemGroupProps, "children"> {
    const { itemGroup: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link FileUploadItemName} に渡す props を取得します。
   */
  public getItemNameProps(): Omit<FileUploadItemNameProps, "children"> {
    const { itemName: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link FileUploadItem} に渡す props を取得します。
   *
   * @param file 表示するファイルです。
   */
  public getItemProps(file: File): Omit<FileUploadItemProps, "children"> {
    const { item: props = {} } = this.slotProps;

    return {
      ...props,
      file,
    };
  }

  /**
   * {@link FileUploadItemSizeText} に渡す props を取得します。
   */
  public getItemSizeTextProps(): Omit<FileUploadItemSizeTextProps, "children"> {
    const { itemSizeText: props = {} } = this.slotProps;

    return props;
  }

  /**
   * {@link FileUploadRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<FileUploadRootProps, "children"> {
    return this.rootProps;
  }
}

/**
 * {@link FileUploadAPI} を作成するフックです。
 */
export const useFileUploadAPI: IUseFileUploadAPI = (props) => new FileUploadAPI(props);

export { FileUploadAPI as API, useFileUploadAPI as useAPI };

// Component.

/**
 * ファイルアップロードを表示するコンポーネントです。
 *
 * ドロップゾーンでのクリックとドラッグアンドドロップ、隠し input によるファイル選択を受け付けます。
 */
export const FileUpload: IFileUpload = (props) => {
  const api = useFileUploadAPI(props);
  const itemGroupProps = api.getItemGroupProps();

  return (
    <FileUploadRoot {...api.getRootProps()}>
      <FileUploadHiddenInput {...api.getHiddenInputProps()} />
      <FileUploadDropzone {...api.getDropzoneProps()} />
      <FileUploadItems api={api} itemGroupProps={itemGroupProps} />
    </FileUploadRoot>
  );
};

export namespace FileUpload {
  export type State = FileUploadState;

  export type Props = FileUploadProps;

  export type SlotProps = FileUploadSlotProps;

  export type AcceptEventDetails = FileUploadAcceptEventDetails;

  export type Color = FileUploadColor;

  export type FileError = FileUploadFileError;

  export type FileErrorReason = FileUploadFileErrorReason;

  export type Radius = FileUploadRadius;

  export type RejectEventDetails = FileUploadRejectEventDetails;

  export type Size = FileUploadSize;

  export type Variant = FileUploadVariant;
}

function FileUploadItems(props: {
  readonly api: FileUploadAPI;
  readonly itemGroupProps: Omit<FileUploadItemGroupProps, "children">;
}): React.ReactElement | null {
  const { api, itemGroupProps } = props;
  const ctx = useFileUploadContext();

  if (ctx.files.length === 0) {
    return null;
  }

  return (
    <FileUploadItemGroup {...itemGroupProps}>
      {ctx.files.map((file) => {
        const itemDeleteTriggerProps = api.getItemDeleteTriggerProps();

        return (
          <FileUploadItem
            key={`${file.name}:${file.lastModified}:${file.size}`}
            {...api.getItemProps(file)}
          >
            <FileUploadItemName {...api.getItemNameProps()} />
            <FileUploadItemSizeText {...api.getItemSizeTextProps()} />
            <FileUploadItemDeleteTrigger
              {...itemDeleteTriggerProps}
              aria-label={itemDeleteTriggerProps["aria-label"] ?? `${file.name} を削除`}
            />
          </FileUploadItem>
        );
      })}
    </FileUploadItemGroup>
  );
}
