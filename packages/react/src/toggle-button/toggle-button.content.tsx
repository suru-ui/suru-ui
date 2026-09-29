import type { RenderProps } from "../_use-render.js";
import * as Button from "../button/button.parts.js";
import type { IComponent } from "../types.js";

/**
 * {@link ToggleButtonContent} が持つ状態です。
 */
export type ToggleButtonContentState = Button.Content.State;

export namespace ToggleButtonContentProps {
  export type Render = RenderProps<ToggleButtonContentState>;

  export type SuruUI = Button.Content.Props.SuruUI;

  export type BaseUI = Button.Content.Props.BaseUI;

  export type HTML = Button.Content.Props.HTML;
}

/**
 * {@link ToggleButtonContent} に渡す props です。
 */
export type ToggleButtonContentProps = ToggleButtonContentProps.Render &
  ToggleButtonContentProps.SuruUI &
  ToggleButtonContentProps.BaseUI &
  ToggleButtonContentProps.HTML;

export type IToggleButtonContent = IComponent<ToggleButtonContentProps>;

/**
 * トグルボタンのコンテンツを表示するコンポーネントです。
 */
export const ToggleButtonContent: IToggleButtonContent = function SuiToggleButtonContent(props) {
  return <Button.Content {...props} />;
};

export { ToggleButtonContent as Content };

export namespace Content {
  export type State = ToggleButtonContentState;

  export type Props = Props.Render & Props.SuruUI & Props.BaseUI & Props.HTML;

  export namespace Props {
    export type Render = ToggleButtonContentProps.Render;

    export type SuruUI = ToggleButtonContentProps.SuruUI;

    export type BaseUI = ToggleButtonContentProps.BaseUI;

    export type HTML = ToggleButtonContentProps.HTML;
  }
}
