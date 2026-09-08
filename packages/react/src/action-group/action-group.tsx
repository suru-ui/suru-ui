import type { IComponent, IUseContext } from "../types.js";
import {
  type ActionGroupContext,
  type ActionGroupRootSize,
  type ActionGroupRootColor,
  type ActionGroupRootProps,
  type ActionGroupRootState,
  type ActionGroupRootRadius,
  type ActionGroupRootVariant,
  type ActionGroupRootOrientation,
  ActionGroupRoot,
  useActionGroupContext,
} from "./action-group.parts.jsx";

// Types
// -----

/**
 * {@link ActionGroupRootColor}
 */
export type ActionGroupColor = ActionGroupRootColor;

/**
 * {@link ActionGroupRootRadius}
 */
export type ActionGroupRadius = ActionGroupRootRadius;

/**
 * {@link ActionGroupRootSize}
 */
export type ActionGroupSize = ActionGroupRootSize;

/**
 * {@link ActionGroupRootVariant}
 */
export type ActionGroupVariant = ActionGroupRootVariant;

/**
 * {@link ActionGroupRootOrientation}
 */
export type ActionGroupOrientation = ActionGroupRootOrientation;

/**
 * {@link ActionGroupRoot} の状態です。
 */
export type ActionGroupState = ActionGroupRootState;

/**
 * {@link ActionGroup} コンポーネントのプロパティーです。
 */
export type ActionGroupProps = ActionGroupRootProps;

// Component
// ---------

interface IActionGroup extends IComponent<ActionGroupProps> {
  /**
   * {@link ActionGroupContext} を読み取るフックです。
   */
  readonly useContext: IUseContext<ActionGroupContext>;
}

/**
 * アクションをグループ化するコンポーネントです。
 */
export const ActionGroup: IActionGroup = /*#__PURE__*/ Object.assign(
  function SuiActionGroup(props: ActionGroupProps) {
    return <ActionGroupRoot {...props} />;
  },
  {
    useContext: useActionGroupContext,
  },
);

/**
 * {@link ActionGroup} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace ActionGroup {
  /**
   * {@link ActionGroupState}
   */
  export type State = ActionGroupState;

  /**
   * {@link ActionGroupProps}
   */
  export type Props = ActionGroupProps;

  /**
   * {@link ActionGroupContext}
   */
  export type Context = ActionGroupContext;

  /**
   * {@link ActionGroupColor}
   */
  export type Color = ActionGroupColor;

  /**
   * {@link ActionGroupOrientation}
   */
  export type Orientation = ActionGroupOrientation;

  /**
   * {@link ActionGroupRadius}
   */
  export type Radius = ActionGroupRadius;

  /**
   * {@link ActionGroupSize}
   */
  export type Size = ActionGroupSize;

  /**
   * {@link ActionGroupVariant}
   */
  export type Variant = ActionGroupVariant;
}
