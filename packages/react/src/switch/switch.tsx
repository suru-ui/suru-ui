import type { IComponent } from "../types.js";
import {
  type SwitchRootSize,
  type SwitchRootColor,
  type SwitchRootProps,
  type SwitchRootState,
  type SwitchRootRadius,
  type SwitchThumbProps,
  type SwitchRootVariant,
  type SwitchRootChangeEventReason,
  type SwitchRootChangeEventDetails,
  SwitchRoot,
  SwitchThumb,
} from "./switch.parts.js";

// Types
// -----

export type SwitchChangeEventDetails = SwitchRootChangeEventDetails;

export type SwitchChangeEventReason = SwitchRootChangeEventReason;

export type SwitchColor = SwitchRootColor;

export type SwitchRadius = SwitchRootRadius;

export type SwitchSize = SwitchRootSize;

export type SwitchVariant = SwitchRootVariant;

/**
 * {@link Switch} の各パーツに渡す props です。
 */
export type SwitchSlotProps = {
  /**
   * {@link SwitchThumb} に渡す props です。
   */
  readonly thumb?: Omit<SwitchThumbProps, "children"> | undefined;
};

/**
 * {@link Switch} が持つ状態です。
 */
export type SwitchState = SwitchRootState;

namespace SwitchProps {
  export type Root = Omit<SwitchRootProps, keyof Switch | keyof Thumb>;

  export type Switch = {
    /**
     * 各パーツに個別の props を渡すためのオブジェクトです。
     */
    slotProps?: SwitchSlotProps | undefined;
  };

  export type Thumb = Pick<SwitchThumbProps, "children">;
}

/**
 * {@link Switch} に渡す props です。
 */
export type SwitchProps = SwitchProps.Switch & SwitchProps.Root & SwitchProps.Thumb;

export type ISwitch = IComponent<SwitchProps>;

// API
// ---

/**
 * {@link Switch} を構成する各パーツの props などを作成するための API です。
 */
export class SwitchAPI {
  private readonly slotProps: SwitchSlotProps;

  private readonly rootProps: SwitchProps.Root;

  private readonly thumbProps: Required<SwitchProps.Thumb>;

  /**
   * @param props {@link Switch} の props です。
   * @internal
   */
  public constructor(props: SwitchProps) {
    const { children, slotProps = {}, ...rootProps } = props;
    this.slotProps = slotProps;
    this.rootProps = rootProps;
    this.thumbProps = { children };
  }

  /**
   * {@link SwitchRoot} に渡す props を取得します。
   */
  public getRootProps(): Omit<SwitchRootProps, "children"> {
    return this.rootProps;
  }

  /**
   * {@link SwitchThumb} に渡す props を取得します。
   */
  public getThumbProps(): SwitchThumbProps {
    const { thumb: props = {} } = this.slotProps;

    return {
      ...props,
      ...this.thumbProps,
    };
  }
}

interface IUseSwitchAPI {
  /**
   * {@link SwitchAPI} を作成します。
   *
   * @param props {@link Switch} の props です。
   * @returns スイッチの API です。
   */
  (props: SwitchProps): SwitchAPI;
}

/**
 * {@link SwitchAPI} を作成するフックです。
 */
export const useSwitchAPI: IUseSwitchAPI = function useSuiSwitchAPI(props) {
  return new SwitchAPI(props);
};

export { SwitchAPI as API, useSwitchAPI as useAPI };

// Component
// ---------

/**
 * スイッチを表示するコンポーネントです。
 *
 * ラベルのテキストは `label` 要素で囲んで指定します。
 */
export const Switch: ISwitch = function SuiSwitch(props) {
  const api = useSwitchAPI(props);

  return (
    <SwitchRoot {...api.getRootProps()}>
      <SwitchThumb {...api.getThumbProps()} />
    </SwitchRoot>
  );
};

export namespace Switch {
  export type State = SwitchState;

  export type Props = SwitchProps;

  export type SlotProps = SwitchSlotProps;

  export type ChangeEventDetails = SwitchChangeEventDetails;

  export type ChangeEventReason = SwitchChangeEventReason;

  export type Color = SwitchColor;

  export type Radius = SwitchRadius;

  export type Size = SwitchSize;

  export type Variant = SwitchVariant;
}
