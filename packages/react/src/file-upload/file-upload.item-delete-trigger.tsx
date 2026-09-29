import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useFileUploadContext } from "./file-upload.context.js";
import { useFileUploadItemContext } from "./file-upload.item.context.js";

/**
 * {@link FileUploadItemDeleteTrigger} が持つ状態です。
 */
export type FileUploadItemDeleteTriggerState = {};

export namespace FileUploadItemDeleteTriggerProps {
  export type Render = RenderProps<FileUploadItemDeleteTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadItemDeleteTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、{@link FileUploadRootProps.disabled|Root の disabled} に従います。
 */
export type FileUploadItemDeleteTriggerProps = FileUploadItemDeleteTriggerProps.Render &
  FileUploadItemDeleteTriggerProps.SuruUI &
  FileUploadItemDeleteTriggerProps.BaseUI &
  FileUploadItemDeleteTriggerProps.HTML;

export type IFileUploadItemDeleteTrigger = IComponent<FileUploadItemDeleteTriggerProps>;

/**
 * 対象のファイルを選択済みリストから削除するボタンです。
 */
export const FileUploadItemDeleteTrigger: IFileUploadItemDeleteTrigger =
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
            if (!disabled) {
              ctx?.remove(file);
            }
          },
          disabled,
          className: "sui_file_upload_item_delete_trigger",
        },
      ],
      defaultTagName: "button",
    });
  };

export { FileUploadItemDeleteTrigger as ItemDeleteTrigger };

export namespace ItemDeleteTrigger {
  export type State = FileUploadItemDeleteTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadItemDeleteTriggerProps.Render;

    export type SuruUI = FileUploadItemDeleteTriggerProps.SuruUI;

    export type BaseUI = FileUploadItemDeleteTriggerProps.BaseUI;

    export type HTML = FileUploadItemDeleteTriggerProps.HTML;
  }
}
