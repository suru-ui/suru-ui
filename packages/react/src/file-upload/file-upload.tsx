import * as React from "react";

import type { IComponent } from "../types.js";
import {
  type FileUploadRootSize,
  type FileUploadItemProps,
  type FileUploadRootColor,
  type FileUploadRootProps,
  type FileUploadRootState,
  type FileUploadRootRadius,
  type FileUploadRootVariant,
  type FileUploadDropzoneProps,
  type FileUploadItemNameProps,
  type FileUploadItemGroupProps,
  type FileUploadHiddenInputProps,
  type FileUploadItemSizeTextProps,
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

/**
 * {@link FileUploadRootColor} です。
 */
export type FileUploadColor = FileUploadRootColor;

/**
 * {@link FileUploadRootRadius} です。
 */
export type FileUploadRadius = FileUploadRootRadius;

/**
 * {@link FileUploadRootSize} です。
 */
export type FileUploadSize = FileUploadRootSize;

/**
 * {@link FileUploadRootVariant} です。
 */
export type FileUploadVariant = FileUploadRootVariant;

/**
 * {@link FileUpload} の各パーツに渡すプロパティーです。
 */
export type FileUploadSlotProps = {
  /**
   * {@link FileUploadDropzone} に渡すプロパティーです。
   */
  readonly dropzone?: FileUploadDropzoneProps | undefined;

  /**
   * {@link FileUploadHiddenInput} に渡すプロパティーです。
   */
  readonly hiddenInput?: FileUploadHiddenInputProps | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItem} に渡すプロパティーです。
   */
  readonly item?: FileUploadItemProps | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItemDeleteTrigger} に渡すプロパティーです。
   */
  readonly itemDeleteTrigger?: FileUploadItemDeleteTriggerProps | undefined;

  /**
   * {@link FileUploadItemGroup} に渡すプロパティーです。
   */
  readonly itemGroup?: FileUploadItemGroupProps | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItemName} に渡すプロパティーです。
   */
  readonly itemName?: FileUploadItemNameProps | undefined;

  /**
   * 選択済みファイルごとの {@link FileUploadItemSizeText} に渡すプロパティーです。
   */
  readonly itemSizeText?: FileUploadItemSizeTextProps | undefined;

  /**
   * {@link FileUploadRoot} に渡すプロパティーです。
   */
  readonly root?: FileUploadRootProps | undefined;
};

/**
 * {@link FileUpload} の各パーツに渡すプロパティーです。
 *
 * `item`、`itemName`、`itemSizeText`、`itemDeleteTrigger` は選択済みファイルごとに適用されます。
 */
export type FileUploadPartsProps = {
  /**
   * {@link FileUploadDropzone} に渡すプロパティーです。
   */
  readonly dropzone: FileUploadDropzoneProps;

  /**
   * {@link FileUploadHiddenInput} に渡すプロパティーです。
   */
  readonly hiddenInput: FileUploadHiddenInputProps;

  /**
   * 選択済みファイルごとの {@link FileUploadItem} に渡すプロパティーです。
   */
  readonly item: Omit<FileUploadItemProps, "file">;

  /**
   * 選択済みファイルごとの {@link FileUploadItemDeleteTrigger} に渡すプロパティーです。
   */
  readonly itemDeleteTrigger: FileUploadItemDeleteTriggerProps;

  /**
   * {@link FileUploadItemGroup} に渡すプロパティーです。
   */
  readonly itemGroup: FileUploadItemGroupProps;

  /**
   * 選択済みファイルごとの {@link FileUploadItemName} に渡すプロパティーです。
   */
  readonly itemName: FileUploadItemNameProps;

  /**
   * 選択済みファイルごとの {@link FileUploadItemSizeText} に渡すプロパティーです。
   */
  readonly itemSizeText: FileUploadItemSizeTextProps;

  /**
   * {@link FileUploadRoot} に渡すプロパティーです。
   */
  readonly root: FileUploadRootProps;
};

/**
 * {@link FileUpload} の状態です。
 */
export type FileUploadState = FileUploadRootState;

/**
 * {@link FileUpload} に渡すプロパティーです。
 *
 * `children` はドロップゾーンの中身として描画されます。省略時は案内テキストが表示されます。
 */
export type FileUploadProps = Omit<FileUploadRootProps, "children"> & {
  /**
   * ドロップゾーンの中身を指定します。
   */
  readonly children?: React.ReactNode | undefined;

  /**
   * 各パーツに渡すプロパティーを指定します。
   */
  readonly slotProps?: FileUploadSlotProps | undefined;
};

/**
 * {@link FileUpload} の各パーツに渡すプロパティーを作るフックです。
 */
export function useFileUpload(props: FileUploadProps): FileUploadPartsProps {
  const { children, slotProps, ...rootProps } = props;

  return {
    root: { ...rootProps, ...slotProps?.root },
    hiddenInput: { ...slotProps?.hiddenInput },
    dropzone: { children, ...slotProps?.dropzone },
    itemGroup: { ...slotProps?.itemGroup },
    item: { ...slotProps?.item },
    itemName: { ...slotProps?.itemName },
    itemSizeText: { ...slotProps?.itemSizeText },
    itemDeleteTrigger: { ...slotProps?.itemDeleteTrigger },
  };
}

/**
 * ファイルアップロードを表示するコンポーネントです。
 *
 * ドロップゾーンでのクリック・ドラッグ&ドロップと、隠し input によるファイル選択を受け付けます。
 */
export const FileUpload: IComponent<FileUploadProps> = function SuiFileUpload(props) {
  const partsProps = useFileUpload(props);

  return (
    <FileUploadRoot {...partsProps.root}>
      <FileUploadHiddenInput {...partsProps.hiddenInput} />
      <FileUploadDropzone {...partsProps.dropzone}>
        {partsProps.dropzone.children ??
          "ここにファイルをドラッグ&ドロップ、またはクリックして選択"}
      </FileUploadDropzone>
      <FileUploadItems partsProps={partsProps} />
    </FileUploadRoot>
  );
};

/**
 * {@link FileUpload} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace FileUpload {
  /**
   * {@link FileUploadState} です。
   */
  export type State = FileUploadState;

  /**
   * {@link FileUploadProps} です。
   */
  export type Props = FileUploadProps;

  /**
   * {@link FileUploadSlotProps} です。
   */
  export type SlotProps = FileUploadSlotProps;

  /**
   * {@link FileUploadColor} です。
   */
  export type Color = FileUploadColor;

  /**
   * {@link FileUploadRadius} です。
   */
  export type Radius = FileUploadRadius;

  /**
   * {@link FileUploadSize} です。
   */
  export type Size = FileUploadSize;

  /**
   * {@link FileUploadVariant} です。
   */
  export type Variant = FileUploadVariant;
}

// 選択済みファイルの一覧をコンテキストから読んで描画する非公開ヘルパーです。
function FileUploadItems(props: {
  readonly partsProps: FileUploadPartsProps;
}): React.ReactElement | null {
  const { partsProps } = props;
  const context = useFileUploadContext(true);

  if (context === null || context.files.length === 0) {
    return null;
  }

  return (
    <FileUploadItemGroup {...partsProps.itemGroup}>
      {context.files.map((file) => (
        <FileUploadItem
          key={`${file.name}:${file.lastModified}:${file.size}`}
          {...partsProps.item}
          file={file}
        >
          <FileUploadItemName {...partsProps.itemName} />
          <FileUploadItemSizeText {...partsProps.itemSizeText} />
          <FileUploadItemDeleteTrigger
            {...partsProps.itemDeleteTrigger}
            aria-label={`${file.name} を削除`}
          >
            ×
          </FileUploadItemDeleteTrigger>
        </FileUploadItem>
      ))}
    </FileUploadItemGroup>
  );
}
