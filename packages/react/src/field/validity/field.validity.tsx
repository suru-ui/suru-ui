import { Field } from "@base-ui/react/field";
import * as React from "react";

import type { IComponent } from "../../types.js";

/**
 * {@link FieldValidity} が持つ状態です。
 */
export type FieldValidityState = Field.Validity.State;

export namespace FieldValidityProps {
  export type Render = {};

  export type SuruUI = {};

  export type BaseUI = Pick<
    React.ComponentProps<typeof Field.Validity>,
    Exclude<
      // Base UI の型を確認して取り出すプロパティーを決めます。
      // FieldValidityProps:
      "children",
      keyof Render | keyof SuruUI
    >
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Field.Validity>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldValidity} に渡す props です。
 */
export type FieldValidityProps = FieldValidityProps.Render &
  FieldValidityProps.SuruUI &
  FieldValidityProps.BaseUI &
  FieldValidityProps.HTML;

export type IFieldValidity = IComponent<FieldValidityProps>;

/**
 * フィールドの検証状態に応じてカスタムメッセージを表示するコンポーネントです。
 *
 * `children` には検証状態を受け取る関数を指定します。それ自身は HTML 要素をレンダリングしません。
 */
export const FieldValidity: IFieldValidity = function SuiFieldValidity(props) {
  return <Field.Validity {...props} />;
};

export { FieldValidity as Validity };

export namespace Validity {
  export type State = FieldValidityState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldValidityProps.Render;

    export type SuruUI = FieldValidityProps.SuruUI;

    export type BaseUI = FieldValidityProps.BaseUI;

    export type HTML = FieldValidityProps.HTML;
  }
}
