import type { BaseUIComponentProps } from "@base-ui/react/internals/types";

import useRender, { type RenderProps } from "../../_use-render.js";
import cn from "../../cn.js";
import type { IComponent } from "../../types.js";
import { useStatContext } from "../root/stat.root.context.js";
import type { StatRootState } from "../root/stat.root.jsx";

/**
 * {@link StatDescription} が持つ状態です。
 */
export type StatDescriptionState = StatRootState;

export namespace StatDescriptionProps {
  export type Render = RenderProps<StatDescriptionState>;

  export type SuruUI = {};

  export type BaseUI = {};

  export type HTML = Omit<BaseUIComponentProps<"dd", never, never>, keyof Render | keyof SuruUI>;
}

/**
 * {@link StatDescription} に渡す props です。
 */
export type StatDescriptionProps = StatDescriptionProps.Render &
  StatDescriptionProps.SuruUI &
  StatDescriptionProps.BaseUI &
  StatDescriptionProps.HTML;

export type IStatDescription = IComponent<StatDescriptionProps>;

/**
 * 統計の補足説明を表すコンポーネントです。
 *
 * `dd` 要素を描画します。
 */
export const StatDescription: IStatDescription = (props) => {
  const ctx = useStatContext();

  return useRender({
    props: [
      props,
      {
        className: cn<StatDescriptionState>(
          "sui_stat_description",
          (state) => `sui_stat_description-size_${state.size}`,
        ),
      },
    ],
    state: ctx,
    defaultTagName: "dd",
  });
};

export { StatDescription as Description };
export namespace Description {
  export type State = StatDescriptionState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = StatDescriptionProps.Render;

    export type SuruUI = StatDescriptionProps.SuruUI;

    export type BaseUI = StatDescriptionProps.BaseUI;

    export type HTML = StatDescriptionProps.HTML;
  }
}
