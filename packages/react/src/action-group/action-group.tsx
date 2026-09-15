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
} from "./action-group.parts.js";

// Types
// -----

export type ActionGroupColor = ActionGroupRootColor;

export type ActionGroupOrientation = ActionGroupRootOrientation;

export type ActionGroupRadius = ActionGroupRootRadius;

export type ActionGroupSize = ActionGroupRootSize;

export type ActionGroupVariant = ActionGroupRootVariant;

/**
 * {@link ActionGroup} が持つ状態です。
 */
export type ActionGroupState = ActionGroupRootState;

/**
 * {@link ActionGroup} に渡す props です。
 */
export type ActionGroupProps = ActionGroupRootProps;

// Component
// ---------

interface IActionGroup extends IComponent<ActionGroupProps> {
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
  export type State = ActionGroupState;

  export type Props = ActionGroupProps;

  export type Context = ActionGroupContext;

  export type Color = ActionGroupColor;

  export type Orientation = ActionGroupOrientation;

  export type Radius = ActionGroupRadius;

  export type Size = ActionGroupSize;

  export type Variant = ActionGroupVariant;
}
