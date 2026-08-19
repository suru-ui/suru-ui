import type { IComponent, IUseContext } from "../../types.js";
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

/**
 * {@link ActionGroupRootColor} です。
 */
export type ActionGroupColor = ActionGroupRootColor;

/**
 * {@link ActionGroupRootRadius} です。
 */
export type ActionGroupRadius = ActionGroupRootRadius;

/**
 * {@link ActionGroupRootSize} です。
 */
export type ActionGroupSize = ActionGroupRootSize;

/**
 * {@link ActionGroupRootVariant} です。
 */
export type ActionGroupVariant = ActionGroupRootVariant;

/**
 * {@link ActionGroupRootOrientation} です。
 */
export type ActionGroupOrientation = ActionGroupRootOrientation;

/**
 * {@link ActionGroupRoot} の状態です。
 */
export type ActionGroupState = ActionGroupRootState;

/**
 * {@link ActionGroupRoot} に渡すプロパティーです。
 */
export type ActionGroupProps = ActionGroupRootProps;

interface ActionGroupType extends IComponent<ActionGroupProps> {
  /**
   * {@link useActionGroupContext} です。
   */
  readonly useContext: IUseContext<ActionGroupContext>;
}

/**
 * アクションをグループ化するコンポーネントです。
 */
export const ActionGroup: ActionGroupType = /*#__PURE__*/ Object.assign(
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
   * {@link ActionGroupState} です。
   */
  export type State = ActionGroupState;

  /**
   * {@link ActionGroupProps} です。
   */
  export type Props = ActionGroupProps;

  /**
   * {@link ActionGroupContext} です。
   */
  export type Context = ActionGroupContext;

  /**
   * {@link ActionGroupColor} です。
   */
  export type Color = ActionGroupColor;

  /**
   * {@link ActionGroupRadius} です。
   */
  export type Radius = ActionGroupRadius;

  /**
   * {@link ActionGroupSize} です。
   */
  export type Size = ActionGroupSize;

  /**
   * {@link ActionGroupVariant} です。
   */
  export type Variant = ActionGroupVariant;

  /**
   * {@link ActionGroupOrientation} です。
   */
  export type Orientation = ActionGroupOrientation;
}
