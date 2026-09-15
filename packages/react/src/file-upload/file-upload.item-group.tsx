import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";

/**
 * {@link FileUploadItemGroup} が持つ状態です。
 */
export type FileUploadItemGroupState = {};

export namespace FileUploadItemGroupProps {
  export type Render = RenderProps<FileUploadItemGroupState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"ul", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadItemGroup} に渡す props です。
 */
export type FileUploadItemGroupProps = FileUploadItemGroupProps.Render &
  FileUploadItemGroupProps.SuruUI &
  FileUploadItemGroupProps.BaseUI &
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

export namespace ItemGroup {
  export type State = FileUploadItemGroupState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemGroupProps.Render;

    export type SuruUI = FileUploadItemGroupProps.SuruUI;

    export type BaseUI = FileUploadItemGroupProps.BaseUI;

    export type HTML = FileUploadItemGroupProps.HTML;
  }
}
