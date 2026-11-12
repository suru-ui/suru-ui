import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useFileUploadItemContext } from "../item/file-upload.item.context.js";
import { type FileUploadItemState } from "../item/file-upload.item.jsx";

/**
 * {@link FileUploadItemName} が持つ状態です。
 */
export type FileUploadItemNameState = FileUploadItemState;

export namespace FileUploadItemNameProps {
  export type Render = RenderProps<FileUploadItemNameState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"span", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link FileUploadItemName} に渡す props です。
 */
export type FileUploadItemNameProps = FileUploadItemNameProps.Render &
  FileUploadItemNameProps.SuruUI &
  FileUploadItemNameProps.BaseUI &
  FileUploadItemNameProps.HTML;

export type IFileUploadItemName = IComponent<FileUploadItemNameProps>;

/** ファイル名を表示するコンポーネントです。 */
export const FileUploadItemName: IFileUploadItemName = (props) => {
  const ctx = useFileUploadItemContext();
  const { children = ctx.file.name, ...otherSpanProps } = props;

  return useRender({
    props: [
      otherSpanProps,
      {
        children,
        className: cn<FileUploadItemNameState>(
          "sui_file_upload_item_name",
          (state) => `sui_file_upload_item_name-size_${state.size}`,
          (state) => `sui_file_upload_item_name-color_${state.color}`,
          (state) => `sui_file_upload_item_name-radius_${state.radius}`,
          (state) => `sui_file_upload_item_name-variant_${state.variant}`,
          (state) => state.disabled && "sui_file_upload_item_name-disabled",
          (state) => state.multiple && "sui_file_upload_item_name-multiple",
          (state) => state.required && "sui_file_upload_item_name-required",
        ),
      },
    ],
    state: ctx,
    defaultTagName: "span",
  });
};

export { FileUploadItemName as ItemName };
export namespace ItemName {
  export type State = FileUploadItemNameState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemNameProps.Render;

    export type SuruUI = FileUploadItemNameProps.SuruUI;

    export type BaseUI = FileUploadItemNameProps.BaseUI;

    export type HTML = FileUploadItemNameProps.HTML;
  }
}
