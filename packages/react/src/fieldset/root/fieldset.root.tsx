import { Fieldset } from "@base-ui/react/fieldset";
import * as React from "react";

import type { RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";

/**
 * {@link FieldsetRoot} が持つ状態です。
 */
export type FieldsetRootState = Fieldset.Root.State;

export namespace FieldsetRootProps {
  export type Render = RenderProps<FieldsetRootState>;

  export type SuruUI = {};

  export type BaseUI = Omit<
    Pick<
      React.ComponentProps<typeof Fieldset.Root>,
      // [注意] 必ず Base UI の型を確認してから取り出すプロパティーを決めます。
      // FieldsetRootProps より:
      never
    >,
    keyof Render | keyof SuruUI
  >;

  export type HTML = Omit<
    React.ComponentProps<typeof Fieldset.Root>,
    keyof Render | keyof SuruUI | keyof BaseUI
  >;
}

/**
 * {@link FieldsetRoot} に渡す props です。
 */
export type FieldsetRootProps = FieldsetRootProps.Render &
  FieldsetRootProps.SuruUI &
  FieldsetRootProps.BaseUI &
  FieldsetRootProps.HTML;

export type IFieldsetRoot = IComponent<FieldsetRootProps>;

/**
 * フィールドセットのルートコンポーネントです。
 *
 * 関連するコントロールを凡例とともにグループ化します。
 */
export const FieldsetRoot: IFieldsetRoot = function SuiFieldsetRoot(props) {
  const {
    className,
    // @ts-expect-error
    "data-scope": dataScope = "",
    ...otherProps
  } = props;

  return (
    <Fieldset.Root
      {...otherProps}
      className={cn(
        className,
        "sui_fieldset",
        (state) => state.disabled && "sui_fieldset-disabled",
      )}
      data-scope={dataScope}
    />
  );
};

export { FieldsetRoot as Root };

export namespace Root {
  export type State = FieldsetRootState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = FieldsetRootProps.Render;

    export type SuruUI = FieldsetRootProps.SuruUI;

    export type BaseUI = FieldsetRootProps.BaseUI;

    export type HTML = FieldsetRootProps.HTML;
  }
}
