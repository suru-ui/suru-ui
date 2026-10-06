import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link FieldDescription} が持つ状態です。
 */
export type FieldDescriptionState = Field.Description.State;

export namespace FieldDescriptionProps {
  export type Render = RenderProps<FieldDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Field.Description>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // FieldDescriptionProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Description>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldDescription} に渡す props です。
 */
export type FieldDescriptionProps = FieldDescriptionProps.Render &
  FieldDescriptionProps.SuruUI &
  FieldDescriptionProps.BaseUI &
  FieldDescriptionProps.HTML;

export type IFieldDescription = IComponent<FieldDescriptionProps>;

/**
 * フィールドの補足説明コンポーネントです。
 *
 * 入力欄の補助情報を表示します。
 */
export const FieldDescription: IFieldDescription = function SuiFieldDescription(props) {
  const { className, ...otherProps } = props;

  return (
    <Field.Description
      {...otherProps}
      className={cn<FieldDescriptionState>(
        className,
        "sui_field_description",
        (state) => state.disabled && "sui_field_description-disabled",
        (state) => state.touched && "sui_field_description-touched",
        (state) => state.dirty && "sui_field_description-dirty",
        (state) => state.filled && "sui_field_description-filled",
        (state) => state.focused && "sui_field_description-focused",
        (state) => state.valid === false && "sui_field_description-invalid",
        (state) => state.valid === true && "sui_field_description-valid",
        (state) => state.valid === null && "sui_field_description-unverified",
      )}
    />
  );
};

export { FieldDescription as Description };

export namespace Description {
  export type State = FieldDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldDescriptionProps.Render;

    export type SuruUI = FieldDescriptionProps.SuruUI;

    export type BaseUI = FieldDescriptionProps.BaseUI;

    export type HTML = FieldDescriptionProps.HTML;
  }
}
