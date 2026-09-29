import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { RenderProps } from "../_use-render.js";
import cn from "../cn.js";
import type { IComponent } from "../types.js";

/**
 * {@link FieldItem} が持つ状態です。
 */
export type FieldItemState = Field.Item.State;

export namespace FieldItemProps {
  export type Render = RenderProps<FieldItemState>;

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Item>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldItemProps:
      "disabled",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Item>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldItem} に渡す props です。
 */
export type FieldItemProps = FieldItemProps.Render &
  FieldItemProps.SuruUI &
  FieldItemProps.BaseUI &
  FieldItemProps.HTML;

export type IFieldItem = IComponent<FieldItemProps>;

/**
 * チェックボックスグループやラジオグループの個別項目をグループ化するコンポーネントです。
 *
 * ラベルと説明文をラップして 1 つの項目としてまとめます。
 */
export const FieldItem: IFieldItem = function SuiFieldItem(props) {
  const { className, ...otherProps } = props;

  return <Field.Item {...otherProps} className={cn(className, "sui_field_item")} />;
};

export { FieldItem as Item };

export namespace Item {
  export type State = FieldItemState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldItemProps.Render;

    export type SuruUI = FieldItemProps.SuruUI;

    export type BaseUI = FieldItemProps.BaseUI;

    export type HTML = FieldItemProps.HTML;
  }
}
