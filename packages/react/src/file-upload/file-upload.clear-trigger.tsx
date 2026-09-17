import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../_use-render.js";
import type { IComponent } from "../types.js";
import { useFileUploadContext } from "./file-upload.context.js";

/**
 * {@link FileUploadClearTrigger} が持つ状態です。
 */
export type FileUploadClearTriggerState = {};

export namespace FileUploadClearTriggerProps {
  export type Render = RenderProps<FileUploadClearTriggerState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<
    BaseUIComponentProps<"button", never, never>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FileUploadClearTrigger} に渡す props です。
 *
 * `disabled` を指定しない場合、ファイルが選択されていないときと {@link FileUploadRootProps.disabled|Root の disabled} のときに無効化されます。
 */
export type FileUploadClearTriggerProps = FileUploadClearTriggerProps.Render &
  FileUploadClearTriggerProps.SuruUI &
  FileUploadClearTriggerProps.BaseUI &
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
            if (!disabled) {
              ctx?.clear();
            }
          },
          disabled,
          className: "sui_file_upload_clear_trigger",
        },
      ],
      defaultTagName: "button",
    });
  };

export { FileUploadClearTrigger as ClearTrigger };

export namespace ClearTrigger {
  export type State = FileUploadClearTriggerState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FileUploadClearTriggerProps.Render;

    export type SuruUI = FileUploadClearTriggerProps.SuruUI;

    export type BaseUI = FileUploadClearTriggerProps.BaseUI;

    export type HTML = FileUploadClearTriggerProps.HTML;
  }
}
