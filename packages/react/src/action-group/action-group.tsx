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

// API
// ---

/**
 * {@link ActionGroup} を構成する各パーツの props などを作成するための API です。
 */
export class ActionGroupAPI {
  private readonly rootProps: ActionGroupRootProps;

  /**
   * @param props {@link ActionGroup} の props です。
   * @internal
   */
  public constructor(props: ActionGroupProps) {
    this.rootProps = props;
  }

  /**
   * {@link ActionGroupRoot} に渡す props を取得します。
   */
  public getRootProps(): ActionGroupRootProps {
    return this.rootProps;
  }
}

interface IUseActionGroupAPI {
  /**
   * {@link ActionGroupAPI} を作成します。
   *
   * @param props {@link ActionGroup} の props です。
   * @returns アクショングループの API です
   */
  (props: ActionGroupProps): ActionGroupAPI;
}

/**
 * {@link ActionGroupAPI} を作成するフックです。
 */
export const useActionGroupAPI: IUseActionGroupAPI = function useSuiActionGroupAPI(props) {
  return new ActionGroupAPI(props);
};

export { ActionGroupAPI as API, useActionGroupAPI as useAPI };

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
    const api = useActionGroupAPI(props);

    return <ActionGroupRoot {...api.getRootProps()} />;
  },
  {
    useContext: useActionGroupContext,
  },
);

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
