import * as React from "react";

import type { LikelyVisibleNode } from "../_is-likely-visible-node.js";
import isLikelyVisibleNode from "../_is-likely-visible-node.js";
import toReactNode from "../_to-react-node.js";
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
} from "./file-upload.parts.jsx";

// Types
// -----

/**
 * {@link FileUploadRootColor}
 */
export type FileUploadColor = FileUploadRootColor;

/**
 * {@link FileUploadRootRadius}
 */
export type FileUploadRadius = FileUploadRootRadius;

/**
 * {@link FileUploadRootSize}
 */
export type FileUploadSize = FileUploadRootSize;

/**
 * {@link FileUploadRootVariant}
 */
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

  /**
   * 選択済みファイルごとの {@link FileUploadItemDeleteTrigger} に渡す props です。
   */
  readonly itemDeleteTrigger?: Omit<FileUploadItemDeleteTriggerProps, "children"> | undefined;

  /**
   * {@link FileUploadItemGroup} に渡す props です。
   */
  readonly itemGroup?: Omit<FileUploadItemGroupProps, "children"> | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItemName} に渡す props です。
   */
  readonly itemName?: Omit<FileUploadItemNameProps, "children"> | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItemSizeText} に渡す props です。
   */
  readonly itemSizeText?: Omit<FileUploadItemSizeTextProps, "children"> | undefined;
};

/**
 * {@link FileUpload} が持つ状態です。
 */
export type FileUploadState = FileUploadRootState;

/**
 * {@link FileUpload} に渡す props です。
 */
export type FileUploadProps = Omit<FileUploadRootProps, "children"> & {
  /**
   * ドロップゾーンの中身です。
   */
  children?: FileUploadDropzoneProps["children"] | undefined;

  /**
   * 各パーツに個別の props を渡すためのオブジェクトです。
   *
   * 各パーツの props が優先されます。
   */
  slotProps?: FileUploadSlotProps | undefined;
};

// API
// ---

/**
 * {@link FileUpload} を構成する各パーツの props などを作成するための API です。
 */
export interface FileUploadAPI {
  /**
   * {@link FileUploadDropzone} に渡す props を取得します。
   */
  getDropzoneProps(): Omit<FileUploadDropzoneProps, "children"> & {
    children: LikelyVisibleNode | null;
  };

  /**
   * {@link FileUploadHiddenInput} に渡す props を取得します。
   */
  getHiddenInputProps(): FileUploadHiddenInputProps;

  /**
   * {@link FileUploadItem} に渡す props を取得します。
   *
   * @param file 表示するファイルです。
   */
  getItemProps(file: File): Omit<FileUploadItemProps, "children">;

  /**
   * {@link FileUploadItemDeleteTrigger} に渡す props を取得します。
   */
  getItemDeleteTriggerProps(): FileUploadItemDeleteTriggerProps;

  /**
   * {@link FileUploadItemGroup} に渡す props を取得します。
   */
  getItemGroupProps(): Omit<FileUploadItemGroupProps, "children">;

  /**
   * {@link FileUploadItemName} に渡す props を取得します。
   */
  getItemNameProps(): Omit<FileUploadItemNameProps, "children">;

  /**
   * {@link FileUploadItemSizeText} に渡す props を取得します。
   */
  getItemSizeTextProps(): Omit<FileUploadItemSizeTextProps, "children">;

  /**
   * {@link FileUploadRoot} に渡す props を取得します。
   */
  getRootProps(): Omit<FileUploadRootProps, "children">;
}

interface IUseFileUploadAPI {
  /**
   * {@link FileUploadAPI} を作成します。
   *
   * @param props {@link FileUpload} の props です。
   * @returns ファイルアップロードの API です
   */
  (props: FileUploadProps): FileUploadAPI;
}

/**
 * {@link FileUploadAPI} を作成するフックです。
 */
export const useFileUploadAPI: IUseFileUploadAPI = function useSuiFileUploadAPI(props) {
  const {
    children,
    slotProps: {
      item: itemProps = {},
      dropzone: dropzoneProps = {},
      itemName: itemNameProps = {},
      itemGroup: itemGroupProps = {},
      hiddenInput: hiddenInputProps = {},
      itemSizeText: itemSizeTextProps = {},
      itemDeleteTrigger: itemDeleteTriggerProps = {},
    } = {},
    ...otherRootProps
  } = props;

  return {
    getItemProps(file) {
      return {
        ...itemProps,
        file,
      };
    },
    getRootProps() {
      return otherRootProps;
    },
    getDropzoneProps() {
      return {
        ...dropzoneProps,
        children: isLikelyVisibleNode(children)
          ? children
          : toReactNode("ここにファイルをドラッグアンドドロップ、またはクリックして選択"),
      };
    },
    getItemNameProps() {
      return itemNameProps;
    },
    getItemGroupProps() {
      return itemGroupProps;
    },
    getHiddenInputProps() {
      return hiddenInputProps;
    },
    getItemSizeTextProps() {
      return itemSizeTextProps;
    },
    getItemDeleteTriggerProps() {
      return {
        ...itemDeleteTriggerProps,
        children: toReactNode("×"),
      };
    },
  };
};

export { type FileUploadAPI as API, useFileUploadAPI as useAPI };

// Component
// ---------

/**
 * ファイルアップロードを表示するコンポーネントです。
 *
 * ドロップゾーンでのクリックとドラッグアンドドロップ、隠し input によるファイル選択を受け付けます。
 */
export const FileUpload: IComponent<FileUploadProps> = function SuiFileUpload(props) {
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
  /**
   * {@link FileUploadState}
   */
  export type State = FileUploadState;

  /**
   * {@link FileUploadProps}
   */
  export type Props = FileUploadProps;

  /**
   * {@link FileUploadSlotProps}
   */
  export type SlotProps = FileUploadSlotProps;

  /**
   * {@link FileUploadAcceptEventDetails}
   */
  export type AcceptEventDetails = FileUploadAcceptEventDetails;

  /**
   * {@link FileUploadColor}
   */
  export type Color = FileUploadColor;

  /**
   * {@link FileUploadFileError}
   */
  export type FileError = FileUploadFileError;

  /**
   * {@link FileUploadFileErrorReason}
   */
  export type FileErrorReason = FileUploadFileErrorReason;

  /**
   * {@link FileUploadRadius}
   */
  export type Radius = FileUploadRadius;

  /**
   * {@link FileUploadRejectEventDetails}
   */
  export type RejectEventDetails = FileUploadRejectEventDetails;

  /**
   * {@link FileUploadSize}
   */
  export type Size = FileUploadSize;

  /**
   * {@link FileUploadVariant}
   */
  export type Variant = FileUploadVariant;
}

function FileUploadItems(props: {
  readonly api: FileUploadAPI;
  readonly itemGroupProps: Omit<FileUploadItemGroupProps, "children">;
}): React.ReactElement | null {
  const { api, itemGroupProps } = props;
  const ctx = useFileUploadContext(true);

  if (ctx === null || ctx.files.length === 0) {
    return null;
  }

  return (
    <FileUploadItemGroup {...itemGroupProps}>
      {ctx.files.map((file) => (
        <FileUploadItem
          key={`${file.name}:${file.lastModified}:${file.size}`}
          {...api.getItemProps(file)}
        >
          <FileUploadItemName {...api.getItemNameProps()} />
          <FileUploadItemSizeText {...api.getItemSizeTextProps()} />
          <FileUploadItemDeleteTrigger
            {...api.getItemDeleteTriggerProps()}
            aria-label={`${file.name} を削除`}
          />
        </FileUploadItem>
      ))}
    </FileUploadItemGroup>
  );
}
